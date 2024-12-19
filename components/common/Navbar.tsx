import React from "react";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <div className="w-full border border-b sticky top-0 bg-background py-4">
      <div className="container max-w-[960px] px-3 mx-auto flex items-center justify-between">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <Button variant="outline" size="icon">
            1
          </Button>
          <div className="h-9 w-9 bg-foreground rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex text-2xl font-mono font-medium items-center gap-1">
      <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
        <span className="font-bold text-white text-xl font-mono">Y</span>
      </div>
      <h1 className="text-3xl font-bold leading-4 ">
        Hacker
        <br />
        News
      </h1>
    </div>
  );
};
