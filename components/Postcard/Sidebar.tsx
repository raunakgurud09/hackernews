"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sidebar_options } from "@/utils/common";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex xl:w-[200px] border-r flex-col items-center gap-4 min-h-[calc(100vh-70px)] p-3">
      <div
        className={cn("flex flex-col items-center justify-center w-full gap-3")}
      >
        {Sidebar_options.map((link) => (
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
