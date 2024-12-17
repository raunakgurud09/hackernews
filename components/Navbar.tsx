"use client"; // Only if using client-side navigation (optional)

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname(); // Get the current path for active link styling

  const links = ["top", "new", "best", "job"];

  return (
    <nav style={{ marginBottom: "20px" }}>
      {links.map((link) => (
        <Link
          key={link}
          href={`/${link}?page=1`} // Always start with page 1 for each type
          style={{
            marginRight: "15px",
            textDecoration: pathname.includes(link) ? "underline" : "none",
            color: pathname.includes(link)
              ? "#ff6600"
              : "var(--primary-foreground)",
          }}
        >
          {link && link?.charAt(0)?.toLocaleUpperCase() + link.slice(1)}
        </Link>
      ))}
    </nav>
  );
}
