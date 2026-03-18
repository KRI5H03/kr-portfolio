"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  category: string;
  technologies: string;
  isRealProject: boolean;
  liveUrl: string | null;
  order: number;
  createdAt: string;
};

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/projects");
      if (res.status === 401) {
        router.push("/admins/login");
        return;
      }
      setProjects(await res.json());
      setLoading(false);
    }
    load();
  }, [router]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-neutral-400 text-sm">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Admin Nav */}
      <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-semibold">
              Krish<span className="text-accent">.</span>
            </Link>
            <nav className="flex gap-4 text-sm text-neutral-400">
              <Link href="/admins/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/admins/projects" className="text-white font-medium">
                Projects
              </Link>
            </nav>
          </div>
          <Link href="/admins/projects/new" className="button text-sm">
            + New Project
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-neutral-400 text-sm mt-1">{projects.length} total</p>
          </div>

          <div className="bg-neutral-800/60 border border-neutral-700 rounded-2xl overflow-hidden">
            {projects.length === 0 ? (
              <div className="text-center py-20 text-neutral-500">
                <p className="mb-4">No projects yet.</p>
                <Link href="/admins/projects/new" className="btn-outline text-sm">
                  Add your first project
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-neutral-500 text-xs uppercase tracking-wider border-b border-neutral-700">
                      <th className="text-left px-6 py-3">Title</th>
                      <th className="text-left px-6 py-3">Category</th>
                      <th className="text-left px-6 py-3">Technologies</th>
                      <th className="text-left px-6 py-3">Type</th>
                      <th className="text-left px-6 py-3">Order</th>
                      <th className="text-left px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr
                        key={project.id}
                        className="border-b border-neutral-800 last:border-0 hover:bg-neutral-800/40 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium">{project.title}</td>
                        <td className="px-6 py-4 text-neutral-400">{project.category}</td>
                        <td className="px-6 py-4 text-neutral-400 max-w-[200px]">
                          <span className="line-clamp-1">{project.technologies}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border ${
                              project.isRealProject
                                ? "bg-accent/20 text-accent border-accent/30"
                                : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            }`}
                          >
                            {project.isRealProject ? "Real" : "Practice"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-neutral-400">{project.order}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <Link
                              href={`/admins/projects/${project.id}/edit`}
                              className="text-accent hover:text-accent-hover text-xs font-medium transition-colors"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(project.id, project.title)}
                              disabled={deleting === project.id}
                              className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors disabled:opacity-40"
                            >
                              {deleting === project.id ? "Deleting…" : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
