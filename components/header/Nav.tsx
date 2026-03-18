"use client";

import { useState } from "react";
import Link from "next/link";
import NavLink from "./NavLinks";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/projects">Projects</NavLink>
        <NavLink href="/services">Services</NavLink>
        <NavLink href="/about">About</NavLink>

        <Link href="/contact">
          <button className="button">Hire Me</button>
        </Link>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className="w-full h-0.5 bg-white origin-center transition-transform"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="w-full h-0.5 bg-white transition-opacity"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          className="w-full h-0.5 bg-white origin-center transition-transform"
        />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 w-full bg-neutral-900 border-b border-neutral-800 shadow-xl z-40 md:hidden flex flex-col px-6 py-8 gap-6"
          >
            <div onClick={() => setIsOpen(false)} className="flex flex-col gap-6 w-full">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/projects">Projects</NavLink>
              <NavLink href="/services">Services</NavLink>
              <NavLink href="/about">About</NavLink>

              <Link href="/contact" className="mt-4 w-full">
                <button className="button w-full text-center">Hire Me</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
