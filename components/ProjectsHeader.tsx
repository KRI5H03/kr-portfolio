

export default function ProjectsHeader() {
  return (
    <div className="mb-8 md:mb-10">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 tracking-tight">
        My{" "}
        <span className="text-accent">
          Projects
        </span>
      </h1>
      <p className="text-neutral-400 text-sm md:text-base max-w-2xl leading-relaxed">
        A collection of websites and applications I&apos;ve built for clients and
        personal learning, showcasing my passion for clean code and modern design.
      </p>
    </div>
  );
}
