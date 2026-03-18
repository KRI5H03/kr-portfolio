"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const services = [
  "Frontend Development",
  "UI/UX Design",
  "Performance Optimization",
  "Responsive Web Design",
  "Deployment & Hosting",
  "Component Development",
  "Other",
];

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "krishramani@example.com",
    href: "mailto:krishramani@example.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/KRI5H03",
    href: "https://github.com/KRI5H03",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/krish-ramani",
    href: "https://www.linkedin.com/in/krish-ramani-152043331/",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container mx-auto min-h-screen py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="mb-16">
          <p className="text-accent font-semibold mb-2 tracking-wider uppercase text-sm">
            Let's Talk
          </p>
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            Get In <span className="text-accent">Touch</span>
          </h1>
          <div className="w-16 h-1 bg-accent rounded-full mb-6" />
          <p className="text-xl text-neutral-400 max-w-xl">
            Have a project in mind or want to collaborate? Drop me a message and
            I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Info</h2>
              <div className="flex flex-col gap-5">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="text-accent p-2.5 bg-neutral-800 rounded-xl border border-neutral-700 group-hover:border-accent/50 transition-colors flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-0.5">{info.label}</p>
                      <p className="text-neutral-200 group-hover:text-accent transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-6">
              <h3 className="font-semibold mb-2 text-accent">Response Time</h3>
              <p className="text-neutral-400 text-sm">
                I typically respond within <strong className="text-white">24-48 hours</strong>.
                For urgent matters, reach me directly via LinkedIn.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-8 flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-neutral-300">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Krish Ramani"
                    className="bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-neutral-300">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-neutral-300">
                  Service <span className="text-accent">*</span>
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-neutral-300">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              {status === "success" && (
                <div className="bg-accent/10 border border-accent/30 text-accent rounded-xl px-4 py-3 text-sm">
                  ✓ Message sent! I'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
