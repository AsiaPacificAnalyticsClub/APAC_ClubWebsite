"use client";
import React, { useEffect, useState } from "react";

//Countdown date set
const NEXT_EVENT_DATE = new Date("2026-09-22T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EventCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diff = NEXT_EVENT_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const units = [
    { label: "Days", value: pad(timeLeft.days) },
    { label: "Hours", value: pad(timeLeft.hours) },
    { label: "Minutes", value: pad(timeLeft.minutes) },
    { label: "Seconds", value: pad(timeLeft.seconds) },
  ];

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#020817",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "3rem 1.5rem 5rem",
        boxSizing: "border-box",
      }}
    >
      {/* Stars background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(1px 1px at 8% 15%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 20% 60%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 35% 25%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 70%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 65% 10%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 50%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 85% 80%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 92% 35%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 12% 88%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 45% 45%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 58% 90%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 5%, rgba(255,255,255,0.5) 0%, transparent 100%)
          `,
        }}
      />

      {/* Earth glow at bottom */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -60,
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "240px",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(30,80,180,0.4) 0%, rgba(10,30,80,0.15) 50%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -90,
          left: "50%",
          transform: "translateX(-50%)",
          width: "1000px",
          height: "180px",
          borderRadius: "50%",
          border: "1px solid rgba(60,130,220,0.15)",
        }}
      />

      {/* Badge */}
      <span
        style={{
          fontFamily: "monospace",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "rgba(120,180,255,0.8)",
          border: "0.5px solid rgba(120,180,255,0.25)",
          padding: "4px 18px",
          borderRadius: "100px",
          marginBottom: "1.2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        Next Event Countdown
      </span>

      {/* Heading */}
      <h2
        style={{
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
          fontWeight: 800,
          color: "#ffffff",
          textAlign: "center",
          margin: "0 0 0.4rem",
          letterSpacing: "-0.5px",
          position: "relative",
          zIndex: 2,
        }}
      >
        Data Science Week 2026
        <br />
        <span
          style={{
            background: "linear-gradient(90deg, #4fa3ff, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Coming Back Soon
        </span>
      </h2>
      <p
        style={{
          fontSize: "14px",
          color: "rgba(160,200,255,0.6)",
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "2.5rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        We&apos;re working on our next event. We will be ready in:
      </p>

      {/* Countdown blocks */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 2,
        }}
      >
        {units.map((unit, i) => (
          <React.Fragment key={unit.label}>
            {i > 0 && (
              <span
                aria-hidden="true"
                style={{
                  fontFamily: "monospace",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "rgba(120,180,255,0.3)",
                  alignSelf: "center",
                  marginTop: "-14px",
                  lineHeight: 1,
                }}
              >
                :
              </span>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(120,180,255,0.2)",
                  borderRadius: "10px",
                  width: "clamp(72px, 12vw, 90px)",
                  height: "clamp(68px, 11vw, 84px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1,
                  }}
                >
                  {unit.value}
                </span>
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(120,180,255,0.55)",
                }}
              >
                {unit.label}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* DSW Button */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: "2rem",
        }}
      >
        <a
          href="/DSW"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.08)",
            border: "0.5px solid rgba(120,180,255,0.35)",
            borderRadius: "100px",
            padding: "10px 24px",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "1px",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(120,180,255,0.15)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(120,180,255,0.6)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(120,180,255,0.35)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="rgba(120,180,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          View Data Science Week
        </a>
      </div>

      {/* Scroll hint */}
      <div
        onClick={() => {
          const section = document.getElementById("club-events");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          } else {
          // Fallback: scroll by window height if id not found
          window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
          }
        }}
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "rgba(120,180,255,0.45)",
          fontSize: "10px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          cursor: "pointer",
          userSelect: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(120,180,255,0.85)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(120,180,255,0.45)")}
>
        <span>View Events</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          style={{ animation: "apac-bounce 1.6s ease-in-out infinite" }}
        >
          <path
            d="M5 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <style>{`
        @keyframes apac-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(4px); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default EventCountdown;