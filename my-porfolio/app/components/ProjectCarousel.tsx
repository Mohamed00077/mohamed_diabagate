"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Project {
  img: string;
  title: string;
  desc: string;
  tags: string[];
  link: string;
}

// ─── Carrousel 3D ────────────────────────────────────────────────────────────
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = projects.length;

  const getClass = (index: number) => {
    if (index === current) return "carousel-proj active";
    if (index === (current + 1) % total) return "carousel-proj next";
    if (index === (current - 1 + total) % total) return "carousel-proj prev";
    return "carousel-proj hidden-slide";
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % total), 4000);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [total]);

  const next = () => { setCurrent((c) => (c + 1) % total); resetTimer(); };
  const prev = () => { setCurrent((c) => (c - 1 + total) % total); resetTimer(); };

  return (
    <>
      <style>{`
        .carousel-proj-wrap { perspective: 1000px; touch-action: pan-y pinch-zoom; }
        .carousel-proj-track { position: relative; height: 430px; overflow: hidden; }
        @media (max-width: 640px) { .carousel-proj-track { height: 220px; } }
        .carousel-proj { position: absolute; inset: 0; transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); backface-visibility: hidden; }
        .carousel-proj.active       { opacity: 1;   transform: scale(1) translateX(0) translateZ(0); }
        .carousel-proj.next         { opacity: 0.5; transform: scale(0.88) translateX(80%) translateZ(-120px); }
        .carousel-proj.prev         { opacity: 0.5; transform: scale(0.88) translateX(-80%) translateZ(-120px); }
        .carousel-proj.hidden-slide { opacity: 0;   transform: scale(0.7) translateZ(-300px); pointer-events: none; }
        @media (max-width: 640px) {
          .carousel-proj.next { transform: scale(0.8) translateX(50%) translateZ(-100px); opacity: 0; }
          .carousel-proj.prev { transform: scale(0.8) translateX(-50%) translateZ(-100px); opacity: 0; }
        }
        .proj-nav-btn { background: rgba(0,255,255,0.08); border: 1px solid rgba(0,255,255,0.3); backdrop-filter: blur(8px); transition: all 0.3s; }
        .proj-nav-btn:hover  { background: rgba(0,255,255,0.2); transform: scale(1.1); }
        .proj-nav-btn:active { transform: scale(0.95); }
        .proj-indicator { transition: all 0.4s; height: 6px; border-radius: 9999px; }
        .proj-indicator.on  { background: #22d3ee; width: 2.5rem; }
        .proj-indicator.off { background: rgba(34,211,238,0.25); width: 0.75rem; }
        .proj-progress-bar { transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1); }
      `}</style>

      <div
        className="carousel-proj-wrap relative"
        onTouchStart={(e) => setTouchStart(e.changedTouches[0].screenX)}
        onTouchEnd={(e) => {
          const diff = touchStart - e.changedTouches[0].screenX;
          if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        }}
      >
        {/* Barre de progression */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-900/40 rounded-full overflow-hidden z-20">
          <div
            className="proj-progress-bar absolute top-0 left-0 h-full bg-linear-to-r from-cyan-400 to-blue-500"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>

        {/* Bouton Précédent */}
        <button onClick={prev} aria-label="Projet précédent"
          className="proj-nav-btn absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-20 text-cyan-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Bouton Suivant */}
        <button onClick={next} aria-label="Projet suivant"
          className="proj-nav-btn absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-20 text-cyan-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slides */}
        <div className="carousel-proj-track">
          {projects.map((proj, i) => (
            <div key={i} className={getClass(i)}>
             <div className="w-full h-full px-4 sm:px-52 py-4">
                <div className="w-full h-full hologram rounded-2xl overflow-hidden relative group">
                  {/* Image */}
                  <div className="absolute inset-0">
                    {proj.img ? (
                      <Image src={proj.img} alt={proj.title || `Projet ${i + 1}`} fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-900/80">
                        <span className="text-cyan-900 text-6xl">⬡</span>
                      </div>
                    )}
                  </div>
                  {/* Overlay cyan */}
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 to-blue-600/20 mix-blend-overlay" />
                  {/* Contenu */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-linear-to-t from-black/90 via-black/50 to-transparent">
                    <span className="text-cyan-400/60 text-xs orbitron mb-2 block">
                      {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <h3 className="orbitron text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base mb-4 max-w-2xl">
                      {proj.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.tags.filter(Boolean).map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-cyan-900/60 border border-cyan-700/50 text-cyan-300 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    className="hologram px-6 py-2 text-sm font-bold text-cyan-400 hover:text-white transition-colors">
                      VIEW PROJECT →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicateurs */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20 items-center">
          {projects.map((_, i) => (
            <button key={i} aria-label={`Aller au projet ${i + 1}`}
              onClick={() => { setCurrent(i); resetTimer(); }}
              className={`proj-indicator ${i === current ? "on" : "off"}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

