"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import VisionCard from "@/app/about-us/sections/VIsionCard";
import MissionCard from "@/app/about-us/sections/MissionCard";

const AboutUsIntro = () => {
  return (
    <section
      className="
        min-h-[calc(100dvh-41px)] w-screen
        flex items-center justify-center
        bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)]
        overflow-x-clip
      "
    >
      <div
        className="
          relative h-full w-full fixed-container
          flex flex-col gap-5 justify-start md:justify-center items-center
        ">
        {/* Title */}
        <div className="mt-5 relative min-w-[600px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-robert-medium !font-extrabold section-title text-3xl sm:text-4xl md:text-5xl text-center md:mb-10"
          >
            Discover More About Us
          </motion.h1>
        </div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
            <div className="order-2 md:order-1 flex flex-col gap-6 md:gap-10 w-full max-w-[600px]">
              <VisionCard />
              <MissionCard />
            </div>

            <div className="order-1 md:order-2 w-full max-w-[400px] md:max-w-[520px]">
              <Image
                src="/aboutUsIntro.png"
                alt="aboutUsIntro"
                width={520}
                height={520}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsIntro;
