"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const slides = [
  {
    url: "/boss.png",
    alt: "Scenic mountain landscape",
  },
  {
    url: "/tech.png",
    alt: "Underwater scene with fish",
  },
  {
    url: "/media.png",
    alt: "Person standing on a cliff",
  },
  {
    url: "/marketing.png",
    alt: "Aerial view of a coastline",
  },
  {
    url: "/event.png",
    alt: "Desert landscape with rock formations",
  },
];

const ImageSlide: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <div className="md:max-w-[780px] w-full m-auto py-16 relative md:mb-16 flex items-center">
      {/* Left Arrow - Now outside the image */}
      <div className="flex-none mr-4">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full text-gray hover:text-white hover:bg-gray-700"
          aria-label="Previous slide"
        >
          <BsChevronCompactLeft size={30} />
        </button>
      </div>

      <div className="flex-grow px-4">
        {/* Main image container */}
        <div className="w-full rounded-2xl overflow-hidden">
          <Image
            src={slides[currentIndex].url}
            alt={slides[currentIndex].alt}
            width={1200}
            height={1200}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled
                className={
                  currentIndex === slideIndex ? "text-black" : "text-gray-500"
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow - Now outside the image */}
      <div className="flex-none ml-4">
        <button
          onClick={nextSlide}
          className="p-2 rounded-full text-gray hover:text-white hover:bg-gray-700"
          aria-label="Next slide"
        >
          <BsChevronCompactRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default ImageSlide;