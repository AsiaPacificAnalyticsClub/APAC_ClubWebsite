"use client";
import React, { useRef, useEffect, useState } from "react";

function useCountUp(target: number, duration = 1800, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(update);
      else setCount(target);
    };
    requestAnimationFrame(update);
  }, [inView, target, duration]);

  return count;
}

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

interface StatCardProps {
  icon: string;
  target: number;
  label: string;
  inView: boolean;
  accentClass: string;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, target, label, inView, accentClass, iconBg }) => {
  const count = useCountUp(target, 1800, inView);
  return (
    <div className="relative bg-[#f8faff] rounded-2xl p-8 flex flex-col items-center gap-2 border border-blue-100 shadow-sm hover:-translate-y-1.5 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 cursor-default overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl ${accentClass}`} />
      <div className={`w-13 h-13 w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-2xl mb-1 ${iconBg}`}>
        {icon}
      </div>
      <div className="font-['Sora',sans-serif] text-4xl font-extrabold text-gray-900 tracking-tight leading-none">
        {count}<span className="text-blue-600">+</span>
      </div>
      <div className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">{label}</div>
    </div>
  );
};

const ClubShowcase: React.FC = () => {
  const { ref, inView } = useInView();

  const stats = [
    { icon: "🫂", target: 300, label: "Members",    accentClass: "bg-gradient-to-r from-blue-500 to-indigo-400", iconBg: "bg-indigo-50" },
    { icon: "🤝", target: 5,   label: "Partners",   accentClass: "bg-gradient-to-r from-blue-600 to-blue-400",   iconBg: "bg-blue-50"   },
    { icon: "🎉", target: 20,  label: "Events",     accentClass: "bg-gradient-to-r from-indigo-400 to-violet-400", iconBg: "bg-violet-50" },
    { icon: "⚡", target: 15,  label: "Committees", accentClass: "bg-gradient-to-r from-blue-500 to-cyan-400",   iconBg: "bg-cyan-50"   },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-['Sora',sans-serif] text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
          Our Club is{" "}
          <span className="text-blue-600">
            Freaking Awesome
          </span>{" "}
          😎
        </h2>
        <p className="text-gray-400 text-sm mb-12">
          Join a thriving community of driven individuals making an impact every day.
        </p>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubShowcase;