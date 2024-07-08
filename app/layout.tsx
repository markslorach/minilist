import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Components
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "minilist",
  description: "Minimalistic task manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container max-w-3xl">
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}
