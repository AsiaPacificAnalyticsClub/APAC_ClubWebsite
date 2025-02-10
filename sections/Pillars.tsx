"use client";
import React from "react";
import { Share2, Lightbulb, Users, Scale } from "lucide-react";
import PillarCard from "@/components/PillarCard";

const pillars = [
  {
    title: "Knowledge Sharing",
    description:
      "Fostering a culture of continuous learning and exchange of ideas within our community.",
    icon: Share2,
  },
  {
    title: "Innovation and Application",
    description:
      "Encouraging creative problem-solving and practical implementation of data science concepts.",
    icon: Lightbulb,
  },
  {
    title: "Collaboration and Networking",
    description:
      "Building strong connections among members and industry professionals to create opportunities.",
    icon: Users,
  },
  {
    title: "Ethics and Impact",
    description:
      "Promoting responsible use of data science to create positive change in society.",
    icon: Scale,
  },
];

const Pillars = () => {
  return (
    <section className="fixed-container bg-gradient-to-b from-white to-[#D2DCFF]  overflow-x-clip min-h-[600px]">
      <div className="flex flex-col">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="tag max-w-[400px]">
            <p className="text-center">Our Guiding Principles </p>
          </div>
          <div className="max-w-[640px]">
            <h2 className="mt-5 section-title">Meet the Pillars</h2>
            <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5 ">
              Explore the four core principles that drive our club forward:
            </p>
          </div>
        </div>
      </div>

      {/*The four Principles */}
      <div className="flex justify-center items-center mt-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl">
          {pillars.map((pillar, index) => (
            <PillarCard key={index} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
