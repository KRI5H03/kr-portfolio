import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/header/Header";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Krish Ramani",
  description: "Frontend developer building clean, high-performance websites",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={` antialiased w-screen xl:px-12 lg:px-8 md:px-4 sm:px-0`}
      >
        <Header />

        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
