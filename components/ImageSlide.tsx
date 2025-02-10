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
    <div className="max-w-[780px] h-[780px] w-full m-auto py-16 px-4 relative group">
      <div className="w-full h-full rounded-2xl overflow-hidden">
        <Image
          src={slides[currentIndex].url}
          alt={slides[currentIndex].alt}
          width={1200}
          height={1200}
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled
              className={
                currentIndex === slideIndex ? "text-white" : "text-gray-500"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlide;
