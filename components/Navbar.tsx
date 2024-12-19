"use client"; // Only if using client-side navigation (optional)

import { redirect, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  BadgePlus,
  BriefcaseBusiness,
  Mountain,
  TrendingUp,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname(); // Get the current path for active link styling

  const links = [
    { name: "top", icon: <Mountain /> },
    { name: "new", icon: <BadgePlus /> },
    { name: "best", icon: <TrendingUp /> },
    { name: "job", icon: <BriefcaseBusiness /> },
  ];

  return (
    <nav className="hidden md:flex xl:w-[200px] border-r flex-col items-center gap-4 max-h-[calc(100vh-70px)] p-3">
      <div className="flex flex-col items-center justify-center w-full gap-3">
        {links.map((link) => (
          <Button
            key={link.name}
            className="py-1 w-full flex items-center justify-start gap-2"
            variant={pathname.includes(link.name) ? "default" : "ghost"}
            onClick={() => redirect(`/${link.name}?page=1`)}
          >
            <span>{link.icon}</span>
            <p className="hidden xl:inline-block">
              {link.name &&
                link?.name.charAt(0)?.toLocaleUpperCase() + link.name.slice(1)}
            </p>
          </Button>
        ))}
      </div>
    </nav>
  );
}
