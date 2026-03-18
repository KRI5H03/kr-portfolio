const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Frontend Development",
    description:
      "Building fast, responsive, and accessible web interfaces using React, Next.js, and TypeScript. From simple landing pages to complex web apps.",
    highlights: ["React / Next.js", "TypeScript", "Performance Optimization", "SEO-Ready"],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "UI / UX Design",
    description:
      "Crafting pixel-perfect user interfaces with a strong focus on usability, aesthetics, and user flow. Turning wireframes into beautiful, interactive designs.",
    highlights: ["Figma Prototyping", "Design Systems", "Component Libraries", "Micro-animations"],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Performance Optimization",
    description:
      "Analyzing and improving web performance metrics — Core Web Vitals, bundle sizes, lazy loading, and caching — to ensure blazing-fast experiences.",
    highlights: ["Core Web Vitals", "Bundle Analysis", "Image Optimization", "Caching Strategies"],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Responsive Web Design",
    description:
      "Every site I build works flawlessly across all screen sizes. Mobile-first design philosophy ensuring a consistent experience from phone to ultrawide.",
    highlights: ["Mobile-First", "Cross-Browser", "Fluid Layouts", "Adaptive Components"],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: "Deployment & Hosting",
    description:
      "End-to-end deployment on Vercel, Netlify, or custom servers. CI/CD pipelines, domain setup, and ongoing maintenance to keep your site live and updated.",
    highlights: ["Vercel / Netlify", "CI/CD Pipelines", "Domain Setup", "SSL & Security"],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Component Development",
    description:
      "Building reusable, well-documented component libraries and design systems that scale with your product and keep your codebase maintainable.",
    highlights: ["Storybook", "Reusable Components", "Design Tokens", "Documentation"],
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-accent font-semibold mb-2 tracking-wider uppercase text-sm">
            What I Offer
          </p>
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            My <span className="text-accent">Services</span>
          </h1>
          <div className="w-16 h-1 bg-accent rounded-full mb-6" />
          <p className="text-xl text-neutral-400 max-w-2xl">
            From design to deployment — I handle the full frontend lifecycle with
            care and quality craftsmanship.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-neutral-800/50 border border-neutral-700 rounded-2xl p-7 hover:border-accent/60 hover:bg-neutral-800/80 transition-all duration-300 flex flex-col gap-5"
            >
              <div className="text-accent">{service.icon}</div>

              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <ul className="flex flex-col gap-1.5 mt-auto">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center border border-neutral-700 rounded-3xl p-12 bg-neutral-800/40">
          <h2 className="text-3xl font-bold mb-3">
            Have a project in <span className="text-accent">mind?</span>
          </h2>
          <p className="text-neutral-400 mb-6 max-w-md mx-auto">
            Let&apos;s talk about it. I&apos;m always happy to discuss ideas and find the
            best solution for your needs.
          </p>
          <a href="/contact" className="btn-outline">
            Start a Conversation
          </a>
        </div>
      </div>
    </div>
  );
}
