"use client"; // Only if using client-side navigation (optional)

import { redirect, usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function Navbar() {
  const pathname = usePathname(); // Get the current path for active link styling

  const links = ["top", "new", "best", "job"];

  return (
    <nav
      className="mt-8 flex items-center gap-4"
      style={{ marginBottom: "20px" }}
    >
      {links.map((link) => (
        <Button
          key={link}
          className="py-1"
          variant={pathname.includes(link) ? "default" : "outline"}
          onClick={() => redirect(`/${link}?page=1`)}
        >
          {link && link?.charAt(0)?.toLocaleUpperCase() + link.slice(1)}
        </Button>
      ))}
    </nav>
  );
}
