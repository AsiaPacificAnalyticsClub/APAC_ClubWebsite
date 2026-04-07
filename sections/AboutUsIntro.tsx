"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutUsIntro = () => {
  return (
    <section
      className="
        h-screen min-h-[700px] w-screen
        bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip
      ">
      <div 
        className="
          relative h-full w-full fixed-container
          flex flex-col gap-5 justify-center items-center
        ">
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
