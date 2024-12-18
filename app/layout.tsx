import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hacker News",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full border border-b sticky top-0 bg-background py-4">
            <div className="container max-w-[960px] mx-auto h-full flex items-center justify-between">
              <div className="flex text-2xl font-mono font-medium items-center gap-1">
                <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                  <span className="font-bold text-white text-xl font-mono">
                    Y
                  </span>
                </div>
                <div>Hacker News</div>
              </div>
              <div className="flex gap-4 items-center">
                <ThemeToggle />
                <Button variant="outline" size="icon">
                  1
                </Button>
                <div className="h-9 w-9 bg-foreground rounded-full"></div>
              </div>
            </div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
