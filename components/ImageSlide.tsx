"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled, RxCross2 } from "react-icons/rx";

const slides = [
  {
    url: "/committee_club_structure_tile.png",
    alt: "Scenic mountain landscape",
  },
  {
    url: "/committee_club_structure_BOD.png",
    alt: "Underwater scene with fish",
  },
  {
    url: "/committee_club_structure_media_team.png",
    alt: "Person standing on a cliff",
  },
  {
    url: "/committee_club_structure_marketing_team.png",
    alt: "Aerial view of a coastline",
  },
  {
    url: "/committee_club_structure_event_team.png",
    alt: "Desert landscape with rock formations",
  },
  {
    url: "/committee_club_structure_tech_team.png",
    alt: "Desert landscape with rock formations",
  },
  {
    url: "/fullGroup.png",
    alt: "Desert landscape with rock formations",
  },
];

const ImageSlide: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (isModalOpen) return;

    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide, isModalOpen]);

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
        <div
          className="w-full rounded-2xl overflow-hidden cursor-zoom-in shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={slides[currentIndex].url}
            alt={slides[currentIndex].alt}
            width={1200}
            height={1200}
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
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

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="absolute top-5 right-5 text-white bg-white/10 rounded-full p-2 hover:bg-white/20 z-50"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            <RxCross2 size={30} />
          </button>

          <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
            <Image
              src={slides[currentIndex].url}
              alt={slides[currentIndex].alt}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlide;

