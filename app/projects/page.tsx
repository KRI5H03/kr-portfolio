import { prisma } from "@/lib/prisma";
import ProjectGrid from "@/components/ProjectGrid";

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
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            My <span className="text-emerald-400">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            A collection of websites and applications I've built for clients and
            personal learning.
          </p>
        </div>

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
