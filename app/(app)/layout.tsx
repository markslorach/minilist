"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import NavBar from "../NavBar";
import Footer from "../Footer";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col min-h-dvh md:min-h-screen mx-auto max-w-3xl px-4 sm:px-10">
      <NavBar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-grow"
      >
        {children}
      </motion.div>
      <Footer />
    </main>
  );
};

export default AppLayout;
