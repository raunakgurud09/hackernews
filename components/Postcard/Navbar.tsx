"use client"; // Only if using client-side navigation (optional)

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  BadgePlus,
  BriefcaseBusiness,
  CircleHelp,
  Mountain,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname(); // Get the current path for active link styling

  const links = [
    { name: "top", icon: <Mountain /> },
    { name: "new", icon: <BadgePlus /> },
    { name: "best", icon: <TrendingUp /> },
    { name: "job", icon: <BriefcaseBusiness /> },
    { name: "ask", icon: <CircleHelp /> },
    { name: "show", icon: <Sparkles /> },
    // { name: "submit", icon: <Send />, beta: true },
    // { name: "bookmark", icon: <Bookmark />, beta: true },
  ];

  return (
    <nav className="hidden md:flex xl:w-[200px] border-r flex-col items-center gap-4 min-h-[calc(100vh-70px)] p-3">
      <div
        className={cn("flex flex-col items-center justify-center w-full gap-3")}
      >
        {links.map((link) => (
          <Link
            className={cn("py-1 w-full flex items-center justify-start gap-2", {
              "cursor-none": false,
            })}
            key={link.name}
            href={`/${link.name}?page=1`}
          >
            <Button
              className="py-1 w-full flex items-center justify-start gap-2 relative"
              variant={pathname.includes(link.name) ? "default" : "ghost"}
            >
              <span>{link.icon}</span>
              <p className="hidden xl:inline-block">
                {link.name &&
                  link?.name.charAt(0)?.toLocaleUpperCase() +
                    link.name.slice(1)}
              </p>
              {false && (
                <span className="text-xxs absolute left-10 bottom-0">beta</span>
              )}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
