import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <div className="container mx-auto px-10">{children}</div>;
}
