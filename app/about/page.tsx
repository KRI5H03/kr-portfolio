"use client";

import { motion } from "framer-motion";

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Styling",
    items: ["CSS3", "SCSS", "Shadcn/UI", "Radix UI", "Figma"],
  },
  {
    category: "Backend & DB",
    items: ["Node.js", "Prisma", "SQLite", "REST APIs", "PostgreSQL"],
  },
  {
    category: "Tools & Workflow",
    items: ["Git", "GitHub", "VS Code", "Vercel", "npm"],
  },
];

const stats = [
  { label: "Projects Built", value: "10+" },
  { label: "Technologies", value: "15+" },
  { label: "GitHub Repos", value: "20+" },
  { label: "Cups of Coffee", value: "∞" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto min-h-screen py-12 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <p className="text-accent font-semibold mb-2 tracking-wider uppercase text-sm">
            About Me
          </p>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Who I <span className="text-accent">Am</span>
          </h1>
          <div className="w-16 h-1 bg-accent rounded-full" />
        </motion.div>

        {/* Bio + Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          {/* Bio */}
          <div className="flex flex-col gap-5">
            <p className="text-lg text-neutral-300 leading-relaxed">
              Hey! I'm <span className="text-accent font-semibold">Krish Ramani</span>, a
              passionate frontend developer who loves building clean, high-performance
              user interfaces. I'm dedicated to turning ideas into polished digital
              experiences that are both functional and beautiful.
            </p>
            <p className="text-lg text-neutral-300 leading-relaxed">
              My journey in web development started with a fascination for how pixels
              become products. Since then, I've been on a mission to{" "}
              <span className="text-accent font-semibold">Learn · Build · Refine</span> —
              continuously growing with every project I tackle.
            </p>
            <p className="text-lg text-neutral-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new design trends, contributing
              to open-source, or studying the craft of great user experience.
            </p>

            <div className="flex gap-4 mt-4">
              <a
                href="/contact"
                className="btn-outline text-sm"
              >
                Hire Me
              </a>
              <a
                href="https://github.com/KRI5H03"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full border-2 border-neutral-700 text-neutral-300 hover:border-accent hover:text-accent transition-all text-sm"
              >
                GitHub →
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="bg-neutral-800/60 border border-neutral-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-accent/50 transition-colors"
              >
                <span className="text-4xl font-bold text-accent mb-2">
                  {stat.value}
                </span>
                <span className="text-neutral-400 text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div variants={itemVariants}>
          <p className="text-accent font-semibold mb-2 tracking-wider uppercase text-sm">
            Tech Stack
          </p>
          <h2 className="text-4xl font-bold mb-10">
            My <span className="text-accent">Skills</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-neutral-800/60 border border-neutral-700 rounded-2xl p-6 hover:border-accent/50 transition-colors"
              >
                <h3 className="text-accent font-semibold mb-4 text-sm uppercase tracking-wider">
                  {group.category}
                </h3>
                <ul className="flex flex-col gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-neutral-300 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-20 text-center border border-neutral-700 rounded-3xl p-12 bg-neutral-800/40"
        >
          <h2 className="text-3xl font-bold mb-3">
            Ready to work <span className="text-accent">together?</span>
          </h2>
          <p className="text-neutral-400 mb-6 max-w-md mx-auto">
            I'm currently open to freelance projects and full-time opportunities.
          </p>
          <a href="/contact" className="btn-outline">
            Get In Touch
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
