"use client"; // Only if using client-side navigation (optional)

import { redirect, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { BriefcaseBusiness } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname(); // Get the current path for active link styling

  const links = ["top", "new", "best", "job"];

  return (
    <nav
      className="hidden md:flex   xl:w-[200px]  border-r flex-col items-center gap-4 max-h-[calc(100vh-70px)]"
      style={{ marginBottom: "20px" }}
    >
      {links.map((link) => (
        <Button
          key={link}
          className="py-1 w-full flex items-center justify-start gap-2"
          variant={pathname.includes(link) ? "default" : "ghost"}
          onClick={() => redirect(`/${link}?page=1`)}
        >
          <BriefcaseBusiness />
          {/* {link && link?.charAt(0)?.toLocaleUpperCase() + link.slice(1)} */}
        </Button>
      ))}
    </nav>
  );
}
