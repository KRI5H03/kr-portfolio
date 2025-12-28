import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className=" container mx-auto pt-2">
      <div className=" w-full">
        <div className="flex items-center justify-between py-6">
          {/* Brand */}
          <Link href={"/"} className="text-2xl font-semibold">
            Krish<span className="text-accent">.</span>
          </Link>

          {/* Navigation */}
          <Nav />
        </div>
      </div>
    </header>
  );
}
