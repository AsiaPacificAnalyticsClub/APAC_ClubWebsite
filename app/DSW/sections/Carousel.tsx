"use client";

import { Children, ReactNode, useEffect, useRef, useState, } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: ReactNode;
}

export default function Carousel({ children }: CarouselProps) {

  const carouselRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateButtons = () => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    setCanScrollLeft(carousel.scrollLeft > 0);
    setCanScrollRight(carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1);
  };

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    updateButtons();

    carousel.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    return () => {
      carousel.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [children]);

  const scroll = (direction: "left" | "right") => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const card = carousel.firstElementChild as HTMLElement;

    if (!card) return;

    const gap = 16;
    const scrollAmount = card.offsetWidth + gap;

    carousel.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl px-8">

      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Previous"
          className="
            absolute left-0 top-1/2 z-10
            -translate-y-1/2
            rounded-full
            bg-white
            p-3
            text-[var(--text)]
            shadow-custom
            transition
            hover:bg-[var(--primary-color)]
            hover:text-white
          "
        >
          <ChevronLeft size={24} />
        </button>
      )}

      <div
        ref={carouselRef}
        className="
          flex
          gap-4
          overflow-x-auto
          scroll-smooth
          snap-x
          snap-mandatory
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {Children.map(children, (child) => (
          <div
            className="
              w-full
              shrink-0
              snap-start
              sm:w-[calc(50%-8px)]
              lg:w-[calc(33.333%-11px)]
            "
          >
            {child}
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Next"
          className="
            absolute right-0 top-1/2 z-10
            -translate-y-1/2
            rounded-full
            bg-white
            p-3
            text-[var(--text)]
            shadow-custom
            transition
            hover:bg-[var(--primary-color)]
            hover:text-white
          "
        >
          <ChevronRight size={24} />
        </button>
      )}

    </div>
  );
}