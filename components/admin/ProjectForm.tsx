"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ProjectFormData = {
  title: string;
  description: string;
  longDesc: string;
  category: string;
  technologies: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  isRealProject: boolean;
  order: number;
};

const EMPTY_FORM: ProjectFormData = {
  title: "",
  description: "",
  longDesc: "",
  category: "",
  technologies: "",
  image: "",
  liveUrl: "",
  githubUrl: "",
  isRealProject: false,
  order: 0,
};

type Props = {
  initialData?: ProjectFormData;
  projectId?: string;
  mode: "new" | "edit";
};

export default function ProjectForm({ initialData, projectId, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectFormData>(initialData ?? EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = mode === "new" ? "/api/admin/projects" : `/api/admin/projects/${projectId}`;
    const method = mode === "new" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, order: Number(form.order) }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save project.");
      } else {
        router.push("/admins/projects");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors w-full";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-neutral-300">
            Title <span className="text-accent">*</span>
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="My Awesome Project"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-neutral-300">
            Category <span className="text-accent">*</span>
          </label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="e.g. Landing Page, Web App, Portfolio"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-neutral-300">
          Short Description <span className="text-accent">*</span>
        </label>
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          placeholder="One-line project summary"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-neutral-300">
          Long Description
        </label>
        <textarea
          name="longDesc"
          value={form.longDesc}
          onChange={handleChange}
          rows={4}
          placeholder="Detailed description of the project..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-neutral-300">
          Technologies <span className="text-accent">*</span>
        </label>
        <input
          name="technologies"
          value={form.technologies}
          onChange={handleChange}
          required
          placeholder="Next.js, React, Tailwind CSS, TypeScript"
          className={inputClass}
        />
        <p className="text-xs text-neutral-500">Comma-separated list</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-neutral-300">Image URL</label>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="/portfolio.png or https://..."
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-neutral-300">Live URL</label>
          <input
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
            type="url"
            placeholder="https://myproject.vercel.app"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-neutral-300">GitHub URL</label>
          <input
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
            type="url"
            placeholder="https://github.com/KRI5H03/..."
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-neutral-300">Display Order</label>
          <input
            name="order"
            value={form.order}
            onChange={handleChange}
            type="number"
            min={0}
            className={inputClass}
          />
        </div>
        <div className="flex items-center gap-3 mt-6">
          <input
            name="isRealProject"
            type="checkbox"
            checked={form.isRealProject}
            onChange={handleChange}
            id="isRealProject"
            className="w-4 h-4 accent-[#00ff99] cursor-pointer"
          />
          <label htmlFor="isRealProject" className="text-sm text-neutral-300 cursor-pointer">
            Real Life Project <span className="text-neutral-500">(vs Practice)</span>
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving…" : mode === "new" ? "Create Project" : "Save Changes"}
        </button>
        <Link
          href="/admins/projects"
          className="px-5 py-2 rounded-full border-2 border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white transition-all text-sm"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
