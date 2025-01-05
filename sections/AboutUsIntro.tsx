"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutUsIntro = () => {
  return (
    <section className="min-h-[700px] w-screen bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip">
      <div className="relative fixed-container flex flex-col items-center gap-5">
        {/* Pyramid */}
        <motion.img
          initial={{ opacity: 0, rotate: -15 }}
          animate={{ opacity: 1, rotate: -15 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          src={"/pyramid.png"}
          width={262}
          height={262}
          className="hidden md:block absolute right-40 top-4 rotate-[-15deg]"
        />

        {/* Title */}
        <div className="mt-5 relative min-w-[600px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-robert-medium !font-extrabold section-title text-3xl sm:text-4xl md:text-5xl text-center"
          >
            Discover More About Us
          </motion.h1>

          {/* Tube */}
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            src={"/tube.png"}
            width={262}
            height={262}
            className="hidden md:block absolute -bottom-[600px] -left-[350px]"
          />
        </div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <Image
            src={"/aboutUsIntro.png"}
            alt="aboutUsIntro"
            width={520}
            height={520}
            className="relative object-cover "
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsIntro;

