"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  category: string;
  isRealProject: boolean;
  createdAt: string;
};

type Inquiry = {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-accent/20 text-accent border-accent/30",
  read: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  replied: "bg-neutral-700 text-neutral-400 border-neutral-600",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [pRes, iRes] = await Promise.all([
        fetch("/api/admin/projects"),
        fetch("/api/admin/inquiries"),
      ]);
      if (pRes.status === 401 || iRes.status === 401) {
        router.push("/admins/login");
        return;
      }
      setProjects(await pRes.json());
      setInquiries(await iRes.json());
      setLoading(false);
    }
    load();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admins/login");
  };

  const handleStatusChange = async (id: string, status: string) => {
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-400 text-sm">Loading…</div>
      </div>
    );
  }

  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  const stats = [
    { label: "Total Projects", value: projects.length, icon: "📁" },
    { label: "Real Projects", value: projects.filter((p) => p.isRealProject).length, icon: "✅" },
    { label: "Total Inquiries", value: inquiries.length, icon: "💬" },
    { label: "New Inquiries", value: newInquiries, icon: "🔔" },
  ];

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
              <Link href="/admins/dashboard" className="text-white font-medium">
                Dashboard
              </Link>
              <Link href="/admins/projects" className="hover:text-white transition-colors">
                Projects
              </Link>
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-neutral-400 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-neutral-400 text-sm mt-1">Welcome back, Krish</p>
            </div>
            <Link
              href="/admins/projects/new"
              className="button text-sm"
            >
              + New Project
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-neutral-800/60 border border-neutral-700 rounded-2xl p-6 flex flex-col gap-2"
              >
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-3xl font-bold text-accent">{stat.value}</span>
                <span className="text-sm text-neutral-400">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Inquiries Table */}
          <div className="bg-neutral-800/60 border border-neutral-700 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-700 flex items-center justify-between">
              <h2 className="font-semibold">Recent Inquiries</h2>
              {newInquiries > 0 && (
                <span className="bg-accent/20 text-accent text-xs px-2.5 py-1 rounded-full border border-accent/30">
                  {newInquiries} new
                </span>
              )}
            </div>
            {inquiries.length === 0 ? (
              <div className="text-center py-16 text-neutral-500 text-sm">
                No inquiries yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-neutral-500 text-xs uppercase tracking-wider border-b border-neutral-700">
                      <th className="text-left px-6 py-3">Name</th>
                      <th className="text-left px-6 py-3">Email</th>
                      <th className="text-left px-6 py-3">Service</th>
                      <th className="text-left px-6 py-3">Message</th>
                      <th className="text-left px-6 py-3">Status</th>
                      <th className="text-left px-6 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inquiry) => (
                      <tr
                        key={inquiry.id}
                        className="border-b border-neutral-800 last:border-0 hover:bg-neutral-800/40 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium">{inquiry.name}</td>
                        <td className="px-6 py-4 text-neutral-300">{inquiry.email}</td>
                        <td className="px-6 py-4 text-neutral-400">{inquiry.service}</td>
                        <td className="px-6 py-4 text-neutral-400 max-w-xs">
                          <span className="line-clamp-1">{inquiry.message}</span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={inquiry.status}
                            onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                            className={`text-xs px-2.5 py-1 rounded-full border bg-transparent cursor-pointer ${STATUS_COLORS[inquiry.status] ?? "border-neutral-600 text-neutral-400"}`}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-neutral-500 whitespace-nowrap">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
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
