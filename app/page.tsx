export default function HomePage() {
  return (
    <main className="container mx-auto min-h-screen">
      {/* // Top-left typography */}
      <div className="w-full flex justify-center items-center text-3xl opacity-70 py-6 pr-32 font-semibold">
        <span className="text-accent">LEARN · </span> BUILD · REFINE
      </div>
      {/* // Main content (left-aligned) */}
      <div className="flex flex-row  justify-between">
        <div className="flex flex-col gap-4">
          {/* // Role */}
          <p className="text-lg font-semibold">Frontend Developer</p>
          {/* // Heading */}
          <h1 className="text-8xl ">
            Hello I'm <br />{" "}
            <span className="text-accent text-12xl">Krish Ramani</span>
          </h1>
          {/* // Description */}
          <p className="max-w-[600px] text-xl">
            Eager to grow as a frontend developer by learning, building, and
            refining real-world user interfaces with care and clarity.
          </p>
          {/* // Primary links */}
          <div className="flex flex-row gap-4">
            <a href="/projects" className="btn-outline">
              Projects
            </a>

            <a href="/contact" className="btn-outline">
              Hire Me
            </a>
          </div>
          {/* // Social links */}
          <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
            <a
              href="https://github.com/KRI5H03"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-hover transition-colors"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/krish-ramani-152043331/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-hover transition-colors"
            >
              LinkedIn
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-hover transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
        {/* Right decorative structure */}
        <div className="relative hidden md:flex items-center justify-center pr-30">
          <div className="absolute right-55 top-1/2 -translate-y-1/2 h-[90%] w-px bg-accent/35" />
          <div className="absolute right-45 top-1/2 -translate-y-1/2 h-[75%] w-px bg-accent/30" />
          <div className="absolute right-35 top-1/2 -translate-y-1/2 h-[60%] w-px bg-accent/25" />
          <div className="absolute right-25 top-1/2 -translate-y-1/2 h-[45%] w-px bg-accent/20" />
          <div className="absolute right-15 top-1/2 -translate-y-1/2 h-[30%] w-px bg-accent/15" />
        </div>
      </div>
    </main>
  );
}
