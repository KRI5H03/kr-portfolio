"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative font-semibold transition-colors hover:text-accent ${
        isActive ? "text-accent border-b-2 border-accent" : ""
      }`}
    >
      {children}
    </Link>
  );
}
