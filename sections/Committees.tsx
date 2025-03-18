"use client";
import ImageSlide from "@/components/ImageSlide";
import React from "react";

const Committees = () => {
  return (
    <section className="md:min-h-[700px] w-screen md:fixed-container bg-white">
      <div className="flex flex-col">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="tag max-w-[300px]">
            <p className="text-center">Our Club's Committees </p>
          </div>
          <div className="max-w-[640px]">
            <h2 className="mt-5 section-title">
              Meet the Amazing Team Supporting the Club
            </h2>
            <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5 ">
              Discover the passionate individuals who dedicate their time,
              skills, and energy to ensure the club's success.{" "}
            </p>
          </div>
        </div>

        {/*Image Slide*/}
        <div className="mt-5 w-full flex justify-center">
          <ImageSlide />
        </div>
      </div>
    </section>
  );
};

export default Committees;
