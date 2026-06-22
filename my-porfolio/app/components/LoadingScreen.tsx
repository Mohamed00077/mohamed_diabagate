"use client";

import { useEffect, useState, useRef } from "react";

interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initialisation du systeme...");
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const statusMessages = [
    "Initialisation du systeme...",
    "Chargement des modules...",
    "Configuration de l'interface...",
    "Connexion au reseau...",
    "Pret.",
  ];

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvasRef.current.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "0";

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*".split("");
    const fontSize = 10;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0ff";
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((drop, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drop * fontSize);
        if (drop * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }

    const interval = setInterval(draw, 35);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 4) + 1;
      current = Math.min(current + increment, 100);
      setProgress(current);

      const msgIndex = Math.floor((current / 100) * (statusMessages.length - 1));
      setStatusText(statusMessages[msgIndex]);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setFadeOut(true);
          // On attend la fin du fade (600ms) avant d'appeler onFinish
          setTimeout(() => {
            setHidden(true);
            onFinish();
          }, 700);
        }, 500);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#050a14",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Matrix canvas background */}
      <div ref={canvasRef} style={{ position: "absolute", inset: 0 }} />

      {/* Cyber grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Corner decorations */}
      {[
        { top: 16, left: 16, borderTop: "2px solid rgba(0,255,255,0.5)", borderLeft: "2px solid rgba(0,255,255,0.5)" },
        { top: 16, right: 16, borderTop: "2px solid rgba(0,255,255,0.5)", borderRight: "2px solid rgba(0,255,255,0.5)" },
        { bottom: 16, left: 16, borderBottom: "2px solid rgba(0,255,255,0.5)", borderLeft: "2px solid rgba(0,255,255,0.5)" },
        { bottom: 16, right: 16, borderBottom: "2px solid rgba(0,255,255,0.5)", borderRight: "2px solid rgba(0,255,255,0.5)" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 32, height: 32, ...s }} />
      ))}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          padding: "0 32px",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <div
          className="orbitron"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 900,
            color: "#00ffff",
            textShadow: "0 0 30px rgba(0,255,255,0.6), 0 0 60px rgba(0,255,255,0.3)",
            animation: "momo-pulse 1.5s ease-in-out infinite",
          }}
        >
          &lt;DIABAGATE MOHAMED/&gt;
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            color: "rgba(0,255,255,0.6)",
          }}
        >
          Portfolio System Loading
        </div>

        {/* Progress bar */}
        <div style={{ width: "min(384px, 80vw)", display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
          <div
            style={{
              width: "100%",
              height: 4,
              borderRadius: 2,
              overflow: "hidden",
              background: "rgba(0,255,255,0.15)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                borderRadius: 2,
                background: "linear-gradient(90deg, #00ffff, #0080ff)",
                boxShadow: "0 0 10px rgba(0,255,255,0.5)",
                transition: "width 0.1s linear",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "rgba(0,255,255,0.5)" }}>
              {statusText}
            </span>
            <span
              className="orbitron"
              style={{ fontSize: "0.875rem", fontFamily: "monospace", fontWeight: 700, color: "#00ffff" }}
            >
              {progress}%
            </span>
          </div>
        </div>

        {/* Animated dots */}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#00ffff",
                animation: `momo-blink 1.2s ${i * 0.4}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes momo-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes momo-blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}