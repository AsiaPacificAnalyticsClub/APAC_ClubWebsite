"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

// All 25 past DSW images across 3 columns
const COLUMN_1_IMAGES = [
  "/dsw-past-img/04.jpg",
  "/dsw-past-img/05.jpg",
  "/dsw-past-img/17.jpg",
  "/dsw-past-img/03.jpg",
  "/dsw-past-img/13.jpg",
  "/dsw-past-img/18.jpg",
  "/dsw-past-img/16.jpg",
  "/dsw-past-img/01.jpg",
  "/dsw-past-img/19.jpg",
];

const COLUMN_2_IMAGES = [
  "/dsw-past-img/08.jpg",
  "/dsw-past-img/20.jpg",
  "/dsw-past-img/11.jpg",
  "/dsw-past-img/02.jpg",
  "/dsw-past-img/21.jpg",
  "/dsw-past-img/14.jpg",
  "/dsw-past-img/09.jpg",
  "/dsw-past-img/22.jpg",
];

const COLUMN_3_IMAGES = [
  "/dsw-past-img/06.jpg",
  "/dsw-past-img/23.jpg",
  "/dsw-past-img/07.jpg",
  "/dsw-past-img/10.jpg",
  "/dsw-past-img/24.jpg",
  "/dsw-past-img/12.jpg",
  "/dsw-past-img/15.jpg",
  "/dsw-past-img/25.jpg",
];

const DswHeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState<string>(
    "calc(100dvh - 58px)",
  );
  const [isHovered, setIsHovered] = useState(false);

  // Guarantee navbar + carousel = exactly 100% of the visible viewport
  useEffect(() => {
    const updateDimensions = () => {
      const header = document.querySelector("header");
      const headerH = header ? header.getBoundingClientRect().height : 58;
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerH}px`,
      );

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
    setCurrentIndex((prev) => (prev === 0 ? 2 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 2 ? 0 : prev + 1));
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

  // Touch swipe handling for mobile & iPad
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;

    // Trigger only on horizontal swipes > 45px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-[#06151a] min-h-[500px] sm:min-h-[540px] md:min-h-[580px]"
      style={{ height: carouselHeight }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
          animation: dswScrollUp1 58s linear infinite;
        }
        .animate-scroll-down {
          animation: dswScrollDown 64s linear infinite;
        }
        .animate-scroll-up-2 {
          animation: dswScrollUp2 55s linear infinite;
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
            : currentIndex > 0
              ? "opacity-0 -translate-x-full pointer-events-none z-0 invisible"
              : "opacity-0 translate-x-full pointer-events-none z-0 invisible"
        }`}
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full h-full flex flex-col xl:flex-row items-center justify-between">
          {/* Left Content Area */}
          <div className="w-full xl:w-[55%] flex-1 xl:flex-initial xl:h-full flex flex-col justify-center px-7 sm:px-10 md:px-14 xl:pl-16 2xl:pl-20 z-20 pt-6 sm:pt-8 md:pt-10 pb-2 xl:py-0">
            {/* Badge */}
            <div className="mb-2.5 sm:mb-4 md:mb-6">
              <span className="inline-flex items-center px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider text-teal-400 border border-teal-500/40 bg-teal-950/40 backdrop-blur-md uppercase">
                DATA SCIENCE WEEK
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-tight text-white leading-[1.04] mb-2.5 sm:mb-4">
              DATA
              <br />
              SCIENCE WEEK
              <br />
              2026
              <br />
              <span className="text-teal-300">IS COMING.</span>
            </h1>

            {/* Accent Line */}
            <div className="w-12 sm:w-16 h-1 rounded-full bg-gradient-to-r from-amber-400 to-teal-400 mb-2.5 sm:mb-4" />

            {/* Date */}
            <p className="text-amber-400 font-bold text-base sm:text-lg md:text-xl tracking-tight mb-2 sm:mb-3">
              22 - 25 September 2026
            </p>

            {/* Description */}
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-[90%] sm:max-w-md md:max-w-xl xl:max-w-lg mb-4 sm:mb-6 md:mb-8 font-light line-clamp-3 sm:line-clamp-none">
              Get ready for four days of talks, workshops, industry sharing,
              student activities and opportunities to connect with the data
              community.
            </p>

            {/* CTA Button */}
            <div>
              {/* <button
                type="button"
                onClick={scrollToContent}
                className="inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] cursor-pointer"
              >
                Explore Event Week
              </button> */}

              <a
                href="https://apca.sites.apiit.edu.my/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] cursor-pointer"
              >
                Explore more about APCA
              </a>
            </div>
          </div>

          {/* Right Side - Uniform Aspect Ratio Collage (All 25 Images) */}
          <div className="w-full xl:w-[45%] h-[38%] sm:h-[40%] md:h-[42%] xl:h-full relative overflow-hidden flex items-center justify-center pointer-events-auto">
            {/* Gradient masks for seamless edge fading */}
            <div className="hidden xl:block absolute inset-y-0 left-0 w-24 xl:w-28 bg-gradient-to-r from-[#06151a] via-[#06151a]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-12 sm:h-16 md:h-20 bg-gradient-to-b from-[#06151a] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 md:h-24 bg-gradient-to-t from-[#06151a] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-4 sm:w-8 bg-gradient-to-l from-[#06151a] to-transparent z-20 pointer-events-none" />

            {/* 3-Column Vertical Scrolling Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full h-[130%] px-3 sm:px-6 md:px-8 xl:pr-8">
              {/* Column 1 - Scrolling Up */}
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 animate-scroll-up-1">
                {[...COLUMN_1_IMAGES, ...COLUMN_1_IMAGES].map((src, i) => (
                  <div
                    key={`c1-${i}`}
                    className="relative w-full aspect-[4/3] rounded-md sm:rounded-lg md:rounded-xl overflow-hidden shadow-md group cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt="DSW event moment"
                      fill
                      sizes="(max-width: 1280px) 33vw, 15vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              {/* Column 2 - Scrolling Down */}
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 animate-scroll-down">
                {[...COLUMN_2_IMAGES, ...COLUMN_2_IMAGES].map((src, i) => (
                  <div
                    key={`c2-${i}`}
                    className="relative w-full aspect-[4/3] rounded-md sm:rounded-lg md:rounded-xl overflow-hidden shadow-md group cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt="DSW event moment"
                      fill
                      sizes="(max-width: 1280px) 33vw, 15vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              {/* Column 3 - Scrolling Up */}
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 animate-scroll-up-2">
                {[...COLUMN_3_IMAGES, ...COLUMN_3_IMAGES].map((src, i) => (
                  <div
                    key={`c3-${i}`}
                    className="relative w-full aspect-[4/3] rounded-md sm:rounded-lg md:rounded-xl overflow-hidden shadow-md group cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt="DSW event moment"
                      fill
                      sizes="(max-width: 1280px) 33vw, 15vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== SLIDE 2 (Mini Career Fair) ===================== */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out bg-[#06151a] overflow-hidden ${
          currentIndex === 1
            ? "opacity-100 translate-x-0 pointer-events-auto z-10 visible"
            : "opacity-0 -translate-x-full pointer-events-none z-0 invisible"
        }`}
      >
        {/* Full Hero Poster */}
        <div className="relative w-full h-full">
          <Image
            src="/DSW_2026_Career_Fair.jpg"
            alt="Mini Career Fair"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Drop CV Button */}
          <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-20">
            <a
              href="https://forms.cloud.microsoft/r/XMKLC2SD83"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-[#97e1f6] hover:bg-teal-400 text-slate-950 font-bold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.03] cursor-pointer"
            >
              Drop your CV
            </a>
          </div>
        </div>
      </div>

      {/* ===================== SLIDE 3 (Official Main Poster) ===================== */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out bg-[#9cccdf] overflow-hidden flex items-center justify-center ${
          currentIndex === 2
            ? "opacity-100 translate-x-0 pointer-events-auto z-10 visible"
            : "opacity-0 translate-x-full pointer-events-none z-0 invisible"
        }`}
      >
        <div
          className="relative w-full h-full flex items-center justify-center cursor-pointer group"
          onClick={scrollToContent}
        >
          {/* Mobile & iPad View (< 1280px) */}
          <div className="relative w-full h-full block xl:hidden">
            <Image
              src="/dsw-2026-main-poster-mobile.png"
              alt="Data Science Week 2026 Official Main Poster"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 0vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>

          {/* Desktop View (>= 1280px) */}
          <div className="relative w-full h-full hidden xl:block">
            <Image
              src="/dsw-2026-main-poster.png"
              alt="Data Science Week 2026 Official Main Poster"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
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
        className="absolute left-1.5 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/80 active:bg-black/90 xl:bg-black/60 xl:hover:bg-black/90 opacity-60 hover:opacity-100 active:opacity-100 xl:opacity-100 text-white hover:text-white xl:text-white backdrop-blur-none xl:backdrop-blur-md border border-white/20 hover:border-white/40 xl:border-white/25 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-md xl:shadow-2xl"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="Next slide"
        className="absolute right-1.5 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/80 active:bg-black/90 xl:bg-black/60 xl:hover:bg-black/90 opacity-60 hover:opacity-100 active:opacity-100 xl:opacity-100 text-white hover:text-white xl:text-white backdrop-blur-none xl:backdrop-blur-md border border-white/20 hover:border-white/40 xl:border-white/25 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-md xl:shadow-2xl"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex(0);
          }}
          aria-label="Go to slide 1"
          className="p-2 sm:p-3 flex items-center justify-center cursor-pointer group"
        >
          <span
            className={`block transition-all duration-300 rounded-full ${
              currentIndex === 0
                ? "w-8 h-2 bg-teal-400 shadow-md ring-2 ring-teal-400/40"
                : "w-2.5 h-2 bg-white/40 group-hover:bg-white/80 shadow-sm"
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
          className="p-2 sm:p-3 flex items-center justify-center cursor-pointer group"
        >
          <span
            className={`block transition-all duration-300 rounded-full ${
              currentIndex === 1
                ? "w-8 h-2 bg-teal-400 shadow-md ring-2 ring-teal-400/40"
                : "w-2.5 h-2 bg-white/40 group-hover:bg-white/80 shadow-sm"
            }`}
          />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex(2);
          }}
          aria-label="Go to slide 3"
          className="p-2 sm:p-3 flex items-center justify-center cursor-pointer group"
        >
          <span
            className={`block transition-all duration-300 rounded-full ${
              currentIndex === 2
                ? "w-8 h-2 bg-teal-400 shadow-md ring-2 ring-teal-400/40"
                : "w-2.5 h-2 bg-white/40 group-hover:bg-white/80 shadow-sm"
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
        className="absolute bottom-1.5 sm:bottom-2.5 md:bottom-3 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center text-white/80 hover:text-white transition-colors cursor-pointer group"
      >
        <span className="text-[10px] sm:text-[11px] font-medium tracking-wide mb-0.5 opacity-80 group-hover:opacity-100 drop-shadow-sm">
          Scroll to explore
        </span>
        <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce drop-shadow-sm" />
      </button>
    </div>
  );
};

export default DswHeroCarousel;
