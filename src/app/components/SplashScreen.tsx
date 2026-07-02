"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LOADING_MESSAGES = [
  "Initializing joke ledger...",
  "Connecting to the fun network...",
  "Loading community laughs...",
  "Syncing punchlines...",
  "Bridging humor across all channels...",
  "Ready to make you smile!",
];

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const totalDuration = 3200;
    const steps = 100;
    const stepDuration = totalDuration / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setExiting(true);
            setTimeout(onComplete, 600);
          }, 300);
        }
        return next;
      });
    }, stepDuration);

    const msgInterval = setInterval(() => {
      setMessageIndex((prev) =>
        prev < LOADING_MESSAGES.length - 1 ? prev + 1 : prev
      );
    }, totalDuration / LOADING_MESSAGES.length);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#0a0a0f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        fontFamily: "'Titillium Web', sans-serif",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(101,0,216,0.15) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Spinning logo */}
      <div
        style={{
          position: "relative",
          width: "140px",
          height: "140px",
          marginBottom: "2rem",
          animation: "spin 4s linear infinite",
        }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/ilf-logo.svg`}
          alt="Interledger Foundation"
          fill
          priority
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          color: "#fff",
          margin: "0 0 0.25rem 0",
          letterSpacing: "0.04em",
          textAlign: "center",
        }}
      >
        ILF Community Jokes
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "#80d4be",
          margin: "0 0 2.5rem 0",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        Interledger Foundation
      </p>

      {/* Progress bar */}
      <div
        style={{
          width: "320px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "999px",
          height: "6px",
          overflow: "hidden",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background:
              "linear-gradient(to right, #6500d8, #56b7b5, #68c180)",
            borderRadius: "999px",
            transition: "width 0.05s linear",
          }}
        />
      </div>

      {/* Status message */}
      <p
        style={{
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.5)",
          margin: 0,
          height: "1.2em",
          transition: "opacity 0.3s ease",
        }}
      >
        {LOADING_MESSAGES[messageIndex]}
      </p>

      {/* Progress percent */}
      <p
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.3)",
          fontWeight: 600,
          letterSpacing: "0.1em",
          margin: 0,
        }}
      >
        {progress}%
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
