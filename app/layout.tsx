import type { Metadata } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import NavBar from "./components/shared/NavBar";
import Footer from "./components/shared/Footer";

// const inter = Inter({ subsets: ["latin"] });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

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
        <body className={sourceSans3.className}>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="light"
          >
            <main className="mx-auto flex max-w-2xl flex-col px-4 sm:px-10 min-h-dvh">
              <NavBar />
              <div className="flex-grow">{children}</div>
              <Footer />
            </main>
          </ThemeProvider>
          <Toaster position="top-right" theme="light" richColors closeButton />
        </body>
      </html>
    </ClerkProvider>
  );
}
