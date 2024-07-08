import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// Components
import NavBar from "./NavBar";
import Footer from "./Footer";
import { ThemeProvider } from "next-themes";

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
            <main className="flex flex-col min-h-screen container max-w-3xl">
              <NavBar />
              <div className="flex-grow">{children}</div>
              <Footer />
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
