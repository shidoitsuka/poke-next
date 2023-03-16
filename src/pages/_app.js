import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import "@/styles/globals.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("pokelist") === null)
      localStorage.setItem("pokelist", JSON.stringify([]));
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Navbar />
      <motion.div
        key={router.asPath}
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <Component {...pageProps} />
      </motion.div>
      <Footer />
    </AnimatePresence>
  );
}
