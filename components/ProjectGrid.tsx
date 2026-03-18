"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

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

// --------------- Tilt Card ---------------
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(nx);
      y.set(ny);
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [x, y, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

// --------------- Project Card ---------------
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  const techs = project.technologies.split(",").map((t) => t.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      layout
    >
      <TiltCard>
        <div
          className="group relative flex flex-col h-full bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors duration-300 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image */}
          <div className="relative h-52 overflow-hidden bg-neutral-950 flex-shrink-0">
            {project.image && project.image.trim() !== "" ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 border-b border-neutral-800/80">
                <svg className="w-12 h-12 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badge */}
            <div
              className={`absolute top-3 right-3 text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full font-medium backdrop-blur-md border ${
                project.isRealProject
                  ? "bg-accent/10 text-accent border-accent/20 shadow-[0_0_10px_rgba(0,255,153,0.1)]"
                  : "bg-blue-500/10 text-blue-400 border-blue-500/20"
              }`}
            >
              {project.isRealProject ? "Real Project" : "Practice"}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-5 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-accent text-xs font-semibold uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            <h3 className="text-xl font-bold group-hover:text-white transition-colors duration-200">
              {project.title}
            </h3>

            <p className="text-neutral-400 text-sm leading-relaxed flex-grow line-clamp-2">
              {project.description}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5">
              {techs.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] sm:text-xs px-2.5 py-1 bg-neutral-800/50 border border-neutral-700/50 rounded-full text-neutral-300 group-hover:border-accent/30 group-hover:text-neutral-200 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
              {techs.length > 4 && (
                <span className="text-xs px-2.5 py-1 bg-neutral-800 border border-neutral-700 rounded-full text-neutral-500">
                  +{techs.length - 4}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-auto pt-3">
              {project.liveUrl && project.liveUrl.trim() !== "" ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-black rounded-xl hover:bg-accent-hover transition-all duration-300 font-semibold text-sm transform hover:-translate-y-0.5"
                >
                  View Live
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <div className="flex-1 flex items-center justify-center py-2.5 border border-neutral-800 rounded-xl text-neutral-600 text-sm">
                  No live link
                </div>
              )}

              {/* GitHub */}
              {project.githubUrl && project.githubUrl.trim() !== "" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-shrink-0 items-center justify-center px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-neutral-300 rounded-xl hover:bg-neutral-700 hover:text-white transition-colors transform hover:-translate-y-0.5"
                  title="GitHub"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// --------------- Main Grid Component ---------------
export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-8 md:mb-12 overflow-x-auto pb-4 scrollbar-hide w-full max-w-full">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`relative px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
              filter === cat
                ? "text-black drop-shadow-sm"
                : "border border-neutral-700/50 text-neutral-400 hover:border-accent/40 hover:text-accent/90 hover:bg-neutral-800/30"
            }`}
          >
            {filter === cat && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-hover shadow-[0_0_10px_rgba(0,255,153,0.2)]"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {cat}
          </button>
        ))}

        {/* Count badge */}
        <motion.span
          key={filteredProjects.length}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="ml-auto text-xs text-neutral-500 bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-full"
        >
          {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
        </motion.span>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-neutral-600"
        >
          No projects in this category.
        </motion.div>
      )}
    </div>
  );
}
