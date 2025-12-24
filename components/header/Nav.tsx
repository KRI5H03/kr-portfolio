import Link from "next/link";
import NavLink from "./NavLinks";

export default function Nav() {
  return (
    <nav className="flex items-center gap-8 ">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/projects">Projects</NavLink>
      <NavLink href="/services">Services</NavLink>
      <NavLink href="/about">About</NavLink>

      <Link href="/contact" className="">
        <button className="button">Hire Me</button>
      </Link>
    </nav>
  );
}
