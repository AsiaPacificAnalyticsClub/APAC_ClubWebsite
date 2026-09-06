"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

// All 16 past DSW images across 3 columns
const COLUMN_1_IMAGES = [
  "/dsw-past-img/04.jpg",
  "/dsw-past-img/05.jpg",
  "/dsw-past-img/03.jpg",
  "/dsw-past-img/13.jpg",
  "/dsw-past-img/16.jpg",
  "/dsw-past-img/01.jpg",
];

const COLUMN_2_IMAGES = [
  "/dsw-past-img/08.jpg",
  "/dsw-past-img/11.jpg",
  "/dsw-past-img/02.jpg",
  "/dsw-past-img/14.jpg",
  "/dsw-past-img/09.jpg",
];

const COLUMN_3_IMAGES = [
  "/dsw-past-img/06.jpg",
  "/dsw-past-img/07.jpg",
  "/dsw-past-img/10.jpg",
  "/dsw-past-img/12.jpg",
  "/dsw-past-img/15.jpg",
];

const DswHeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState<string>("calc(100dvh - 58px)");
  const [isHovered, setIsHovered] = useState(false);

  // Guarantee navbar + carousel = exactly 100% of the visible viewport
  useEffect(() => {
    const updateDimensions = () => {
      const header = document.querySelector("header");
      const headerH = header ? header.getBoundingClientRect().height : 58;
      document.documentElement.style.setProperty("--header-height", `${headerH}px`);

      const exactHeight = window.innerHeight - headerH;
      if (exactHeight > 0) {
        setCarouselHeight(`${exactHeight}px`);
      }
    };

    updateDimensions();

    const header = document.querySelector("header");
    let observer: ResizeObserver | null = null;
    if (header && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => updateDimensions());
      observer.observe(header);
    }

    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer?.disconnect();
    };
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
  }, []);

  // Autoplay every 7s unless hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered]);

  const scrollToContent = () => {
    const content = document.getElementById("dsw-content");
    if (content) {
      content.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-[#06151a]"
      style={{ height: carouselHeight }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes dswScrollUp1 {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes dswScrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes dswScrollUp2 {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-up-1 {
          animation: dswScrollUp1 42s linear infinite;
        }
        .animate-scroll-down {
          animation: dswScrollDown 46s linear infinite;
        }
        .animate-scroll-up-2 {
          animation: dswScrollUp2 40s linear infinite;
        }
        .animate-scroll-up-1:hover,
        .animate-scroll-down:hover,
        .animate-scroll-up-2:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ===================== SLIDE 1 ===================== */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out bg-[#06151a] overflow-hidden flex items-center ${
          currentIndex === 0
            ? "opacity-100 translate-x-0 pointer-events-auto z-10 visible"
            : "opacity-0 -translate-x-full pointer-events-none z-0 invisible"
        }`}
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content Area */}
          <div className="w-full lg:w-[48%] h-full flex flex-col justify-center px-6 sm:px-12 lg:pl-16 xl:pl-20 z-20 py-8 lg:py-0">
            {/* Badge */}
            <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-teal-400 border border-teal-500/40 bg-teal-950/40 backdrop-blur-md uppercase">
                DATA SCIENCE WEEK
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.04] mb-4">
              DATA<br />
              SCIENCE WEEK<br />
              2026<br />
              <span className="text-teal-300">IS COMING.</span>
            </h1>

            {/* Accent Line */}
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-amber-400 to-teal-400 mb-4" />

            {/* Date */}
            <p className="text-amber-400 font-bold text-lg sm:text-xl tracking-tight mb-3">
              22 – 25 September 2026
            </p>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mb-6 sm:mb-8 font-light">
              Get ready for four days of talks, workshops, industry sharing, student activities and opportunities to connect with the data community.
            </p>

            {/* CTA Button */}
            <div>
              <button
                type="button"
                onClick={scrollToContent}
                className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] cursor-pointer"
              >
                Explore Event Week
              </button>
            </div>
          </div>

          {/* Right Side - Uniform Aspect Ratio Collage (All 16 Images) */}
          <div className="w-full lg:w-[52%] h-full relative overflow-hidden flex items-center justify-center pointer-events-auto">
            {/* Gradient masks for seamless edge fading */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#06151a] via-[#06151a]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#06151a] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06151a] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#06151a] to-transparent z-20 pointer-events-none" />

            {/* 3-Column Vertical Scrolling Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 w-full h-[125%] px-4 sm:px-6 lg:pr-8">
              {/* Column 1 - Scrolling Up */}
              <div className="flex flex-col gap-3 md:gap-4 animate-scroll-up-1">
                {[...COLUMN_1_IMAGES, ...COLUMN_1_IMAGES].map((src, i) => (
                  <div
                    key={`c1-${i}`}
                    className="relative w-full aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden shadow-md group cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt="DSW event moment"
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              {/* Column 2 - Scrolling Down */}
              <div className="flex flex-col gap-3 md:gap-4 animate-scroll-down">
                {[...COLUMN_2_IMAGES, ...COLUMN_2_IMAGES].map((src, i) => (
                  <div
                    key={`c2-${i}`}
                    className="relative w-full aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden shadow-md group cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt="DSW event moment"
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              {/* Column 3 - Scrolling Up */}
              <div className="hidden sm:flex flex-col gap-3 md:gap-4 animate-scroll-up-2">
                {[...COLUMN_3_IMAGES, ...COLUMN_3_IMAGES].map((src, i) => (
                  <div
                    key={`c3-${i}`}
                    className="relative w-full aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden shadow-md group cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt="DSW event moment"
                      fill
                      sizes="(max-width: 1200px) 25vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== SLIDE 2 ===================== */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-sky-950 to-blue-950 text-white px-6 ${
          currentIndex === 1
            ? "opacity-100 translate-x-0 pointer-events-auto z-10 visible"
            : "opacity-0 translate-x-full pointer-events-none z-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 mb-4 shadow-sm">
            Draft Slide 2
          </span>

          <h2 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-4 drop-shadow-md">
            Slide 2
          </h2>

          <p className="text-base md:text-xl text-slate-300 font-light max-w-lg">
            Placeholder for your second banner / slide content
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="Previous slide"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/25 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-2xl"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="Next slide"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/25 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-2xl"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex(0);
          }}
          aria-label="Go to slide 1"
          className="p-3 flex items-center justify-center cursor-pointer group"
        >
          <span
            className={`block transition-all duration-300 rounded-full ${
              currentIndex === 0
                ? "w-8 h-2 bg-teal-400 shadow-md ring-2 ring-teal-400/40"
                : "w-2.5 h-2 bg-white/40 group-hover:bg-white/80"
            }`}
          />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex(1);
          }}
          aria-label="Go to slide 2"
          className="p-3 flex items-center justify-center cursor-pointer group"
        >
          <span
            className={`block transition-all duration-300 rounded-full ${
              currentIndex === 1
                ? "w-8 h-2 bg-teal-400 shadow-md ring-2 ring-teal-400/40"
                : "w-2.5 h-2 bg-white/40 group-hover:bg-white/80"
            }`}
          />
        </button>
      </div>

      {/* Scroll Down Prompt */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          scrollToContent();
        }}
        aria-label="Scroll to DSW content"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center text-white/80 hover:text-white transition-colors cursor-pointer group"
      >
        <span className="text-[11px] font-medium tracking-wide mb-0.5 opacity-80 group-hover:opacity-100">
          Scroll to explore
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </div>
  );
};

export default DswHeroCarousel;
