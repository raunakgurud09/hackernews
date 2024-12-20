import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Sidebar_options } from "@/utils/common";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Logo } from "./Navbar";

export const SideDrawer = () => {
  // const pathname = usePathname(); // Get the current path for active link styling

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Logo />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription style={{ marginTop: "40px" }}>
            {Sidebar_options.map((link) => (
              <SheetClose key={link.name} asChild>
                <Link
                  className={cn(
                    "py-1 w-full flex items-center justify-start gap-2",
                    {
                      "cursor-none": false,
                    }
                  )}
                  href={`/${link.name}?page=1`}
                >
                  <Button
                    className="py-1 w-full flex items-center justify-start gap-2 relative"
                    variant={"outline"}
                  >
                    <span>{link.icon}</span>
                    <p className="">
                      {link.name &&
                        link?.name.charAt(0)?.toLocaleUpperCase() +
                          link.name.slice(1)}
                    </p>
                  </Button>
                </Link>
              </SheetClose>
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
