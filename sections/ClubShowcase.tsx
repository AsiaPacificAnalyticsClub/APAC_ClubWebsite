"use client";
import React, { useRef, useState, MouseEvent, ReactNode } from "react";

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

const BentoTilt: React.FC<BentoTiltProps> = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState<string>("");
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      className={`transition-transform duration-300 ${className}`}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  title: string;
  gradientStyle: 'light1' | 'light2' | 'dark1' | 'dark2';
}

const BentoCard: React.FC<BentoCardProps> = ({ title, gradientStyle }) => {
  const gradients = {
    light1: "bg-gradient-to-br from-blue-200 to-blue-400",
    light2: "bg-gradient-to-br from-blue-300 to-blue-500",
    dark1: "bg-gradient-to-br from-blue-600 to-blue-800",
    dark2: "bg-gradient-to-br from-blue-700 to-blue-900",
  };

  const textColors = {
    light1: "text-black",
    light2: "text-black",
    dark1: "text-white",
    dark2: "text-white",
  };

  return (
    <div className={`relative w-full h-full ${gradients[gradientStyle]} rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300 py-[80px]`}>
      <div className="flex flex-row gap-8 justify-center items-center">
        <h3 className={`text-4xl font-bold ${textColors[gradientStyle]}`}>{title}</h3>
      </div>
    </div>
  );
};

const ClubShowcase: React.FC = () => {
  return (
    <section className="fixed-container bg-gray-100">
      <div className=" mx-auto">
        <h2 className=" mt-7 font-circular-web text-3xl text-blue-800 text-center font-bold mb-8">
          Our Club is Freaking Awesome 😎
        </h2>
        <div className="md:grid flex flex-col  md:grid-cols-3 gap-4">
          <BentoTilt className="col-span-2">
            <BentoCard title="300+ Members" gradientStyle="light1" />
          </BentoTilt>
          <BentoTilt className="col-span-1">
            <BentoCard title="5+ Partners" gradientStyle="dark1" />
          </BentoTilt>
          <BentoTilt className="col-span-1">
            <BentoCard title="20+ Events" gradientStyle="light2" />
          </BentoTilt>
          <BentoTilt className="col-span-2">
            <BentoCard title="15+ Committees" gradientStyle="dark2" />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default ClubShowcase;