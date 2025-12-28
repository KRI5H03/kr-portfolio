"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string;
  image: string;
  liveUrl: string | null;
  githubUrl: string | null;
  isRealProject: boolean; // Changed from "featured"
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const handleProjectClick = (project: Project) => {
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank");
    }
  };

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full border transition-all ${
              filter === cat
                ? "bg-emerald-400 text-black border-emerald-400"
                : "border-gray-700 text-gray-400 hover:border-emerald-400 hover:text-emerald-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              {/* Project Image */}
              <div className="relative h-64 bg-gray-900 rounded-lg overflow-hidden mb-4">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-600">
                    No Image
                  </div>
                )}

                {/* Badge: Real Life Project or Practice Project */}
                <div
                  className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${
                    project.isRealProject
                      ? "bg-emerald-400 text-black"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {project.isRealProject
                    ? "Real Life Project"
                    : "Practice Project"}
                </div>

                {/* Hover Overlay */}
                {project.liveUrl && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      View Live →
                    </span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-400 text-sm">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies
                    .split(",")
                    .slice(0, 3)
                    .map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-gray-900 rounded text-gray-400"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                </div>

                {/* GitHub Link */}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 mt-4 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No projects found in this category.
        </div>
      )}
    </div>
  );
}
