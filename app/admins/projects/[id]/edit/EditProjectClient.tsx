"use client";

import ProjectForm from "@/components/admin/ProjectForm";

type Project = {
  id: string;
  title: string;
  description: string;
  longDesc: string | null;
  category: string;
  technologies: string;
  image: string;
  liveUrl: string | null;
  githubUrl: string | null;
  isRealProject: boolean;
  order: number;
};

export default function EditProjectClient({ project }: { project: Project }) {
  return (
    <ProjectForm
      mode="edit"
      projectId={project.id}
      initialData={{
        title: project.title,
        description: project.description,
        longDesc: project.longDesc ?? "",
        category: project.category,
        technologies: project.technologies,
        image: project.image ?? "",
        liveUrl: project.liveUrl ?? "",
        githubUrl: project.githubUrl ?? "",
        isRealProject: project.isRealProject,
        order: project.order,
      }}
    />
  );
}
