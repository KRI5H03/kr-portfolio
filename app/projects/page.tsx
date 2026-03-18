import { prisma } from "@/lib/prisma";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectsHeader from "@/components/ProjectsHeader";

export const metadata = {
  title: "Projects | Krish Ramani",
  description: "Browse my portfolio of web development projects",
};

async function getProjects() {
  const projects = await prisma.project.findMany({
    orderBy: [
      { isRealProject: "desc" }, // Real projects first
      { order: "asc" },
      { createdAt: "desc" },
    ],
  });
  return projects;
}
export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen text-white pt-6 md:pt-8 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectsHeader />


        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              No projects yet. Add some from the admin panel!
            </p>
          </div>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </div>
    </div>
  );
}
