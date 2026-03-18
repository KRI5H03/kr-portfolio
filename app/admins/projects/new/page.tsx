import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";

export const metadata = {
  title: "New Project | Admin",
};

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Admin Nav */}
      <header className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-6">
          <Link href="/" className="text-xl font-semibold">
            Krish<span className="text-[#00ff99]">.</span>
          </Link>
          <nav className="flex gap-4 text-sm text-neutral-400">
            <Link href="/admins/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/admins/projects" className="hover:text-white transition-colors">
              Projects
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <Link
            href="/admins/projects"
            className="text-neutral-500 hover:text-white text-sm mb-4 inline-flex items-center gap-1 transition-colors"
          >
            ← Back to Projects
          </Link>
          <h1 className="text-3xl font-bold mt-2">New Project</h1>
        </div>
        <div className="bg-neutral-800/60 border border-neutral-700 rounded-2xl p-8">
          <ProjectForm mode="new" />
        </div>
      </main>
    </div>
  );
}
