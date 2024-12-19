import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="container flex mx-auto justify-between max-w-[960px] max-h-[calc(100vh-70px)]">
      <Navbar />
      {children}
    </div>
  );
}
