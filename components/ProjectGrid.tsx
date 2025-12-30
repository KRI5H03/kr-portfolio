"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string;
  image: string;
  liveUrl: string | null;
  githubUrl: string | null;
  isRealProject: boolean;
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

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
            className="flex flex-col"
          >
            <div className="group flex flex-col h-full bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden hover:border-emerald-400/50 transition-colors">
              {/* Project Image */}
              <div className="relative h-48 bg-gray-900 overflow-hidden">
                {project.image && project.image.trim() !== "" ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-600">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 mx-auto mb-2 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm">No Image</p>
                    </div>
                  </div>
                )}

                {/* Badge */}
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
              </div>

              {/* Project Info */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-400 text-sm">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies
                    .split(",")
                    .slice(0, 3)
                    .map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-black rounded text-gray-400 border border-gray-800"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                </div>

                {/* View Live Button */}
                {project.liveUrl && project.liveUrl.trim() !== "" ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-400 text-black rounded-lg hover:bg-emerald-500 transition-colors font-semibold text-sm w-full"
                  >
                    View Live Website
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ) : (
                  <div className="text-center text-gray-500 text-sm py-2.5 border border-gray-800 rounded-lg">
                    No live link available
                  </div>
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
