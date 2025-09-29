"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WinnerBanner({
  title = "APAC Design Competition Winner Announced",
  desktopPoster = "/lanyard-winner-desktop.png",
  mobilePoster = "/lanyard-winner-mobile.png",
  bannerBackground = "/banner-bg.png", // <--- put your uploaded file in /public
  durationDays = 10,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // LocalStorage expiry logic
  useEffect(() => {
    const key = "winnerBannerExpiry";
    const now = Date.now();
    const expiry = localStorage.getItem(key);

    if (expiry && now > parseInt(expiry, 10)) {
      setVisible(false);
      return;
    }

    if (!expiry) {
      const newExpiry = now + durationDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(key, newExpiry.toString());
    }
  }, [durationDays]);

  return (
    <div className="w-full mb-8">
      {/* Banner strip with background image */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => setOpen(true)}
              onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
              className="cursor-pointer 
                        relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
                        text-center py-6"
              aria-label={title}
              style={{
                backgroundImage: `url(${bannerBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-violet-400/50 to-indigo-800/70" />
              <div className="relative text-white font-bold text-base md:text-lg drop-shadow-lg">
                🎉 {title}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal popup */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full md:w-[90%] max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={isMobile ? mobilePoster : desktopPoster}
              alt={title}
              width={1200}
              height={675}
              className="w-full h-auto object-contain"
              priority
            />
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 bg-black bg-opacity-60 text-white rounded-full p-2 hover:bg-opacity-80"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
