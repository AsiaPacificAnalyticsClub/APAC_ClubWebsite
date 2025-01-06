"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Marquee from "@/components/ui/marquee";
import { logos } from "@/constants/Logos";

const Collaborators = () => {
  const duplicatedLogos = useMemo(
    () => [...logos, ...logos, ...logos, ...logos, ...logos],
    [],
  );

  return (
    <>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col justify-center items-center py-8">
          <div className="flex justify-center items-center">
            <div className="tag">Collaborators</div>
          </div>
          <div className="max-w-[900px] mb-8">
            <h2 className="section-title mt-5">
              We are proud to have some great collaborators
            </h2>
            <p className="section-description mt-5">
              Our club is made possible by the collaboration of talented
              individuals who share our vision of data analytics. We are
              grateful for their dedication and expertise.
            </p>
          </div>
          <div className="w-full relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-background z-10"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-background z-10"></div>

            <div className="w-full flex justify-center items-center [perspective:300px]">
              <Marquee
                className="justify-center overflow-hidden [--duration:40s] [--gap:3rem]"
                style={{
                  transform:
                    "translateX(0px) translateY(0px) translateZ(-50px) scale(1.5)",
                }}
              >
                {duplicatedLogos.map((data, idx) => (
                  <div key={`${data.alt}-${idx}`}>
                    <Image
                      key={idx}
                      src={data.src}
                      alt={data.alt}
                      width={50}
                      height={50}
                      className="h-10 mx-auto w-auto rounded-xl transition-all duration-100"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collaborators;
