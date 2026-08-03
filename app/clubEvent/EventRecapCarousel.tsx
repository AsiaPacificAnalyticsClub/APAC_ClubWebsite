"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EventRecapCarouselProps {
  images: string[];
  alt: string;
  onImageClick?: (image: string) => void;
  sizes?: string;
  className?: string;
}

const EventRecapCarousel = ({
  images,
  alt,
  onImageClick,
  sizes = "100vw",
  className = "",
}: EventRecapCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = images.length > 1;
  const currentImage = images[currentIndex];

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden rounded-lg ${className}`}
      onClick={() => onImageClick?.(currentImage)}
    >
      <Image
        src={currentImage}
        alt={alt}
        fill
        className="object-cover cursor-pointer"
        sizes={sizes}
        priority
      />

      {hasMultiple && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md z-10"
            aria-label="Previous recap photo"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md z-10"
            aria-label="Next recap photo"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full z-10">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default EventRecapCarousel;
