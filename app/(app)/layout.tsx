"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Footer from "../components/shared/Footer";
import NavBar from "../components/shared/NavBar";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4 sm:px-10 md:min-h-screen">
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
