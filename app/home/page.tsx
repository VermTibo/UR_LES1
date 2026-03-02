"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Typewriter from 'typewriter-effect'

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  const floatingImages = [
    { id: 1, src: "/home/foto1.jpg", top: "10%", left: "8%", size: "w-56 h-72", speed: 0.015, delay: "0s" },
    { id: 2, src: "/home/foto2.jpg", top: "55%", left: "5%", size: "w-72 h-48", speed: -0.02, delay: "1.5s" },
    { id: 3, src: "/home/foto3.jpg", top: "15%", left: "72%", size: "w-64 h-80", speed: 0.01, delay: "0.5s" },
    { id: 4, src: "/home/foto4.jpg", top: "62%", left: "78%", size: "w-48 h-64", speed: -0.015, delay: "2s" },
  ];

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <main className="min-h-screen bg-white text-black overflow-hidden relative cursor-none">
      
      {/* Verbeterde CSS Animatie: Zweven + Lichtjes draaien */}
      <style jsx>{`
        @keyframes floatAndRotate {
          0% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float-custom {
          animation: floatAndRotate 8s ease-in-out infinite;
        }
      `}</style>

      {/* 1. AUTOMATISCH ZWEVENDE FOTO'S (25% Opacity) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {floatingImages.map((img) => (
          <div
            key={img.id}
            className={`absolute ${img.size} rounded-2xl overflow-hidden shadow-2xl opacity-25 animate-float-custom`}
            style={{
              top: img.top,
              left: img.left,
              animationDelay: img.delay,
              // Muis-parallax effect
              transform: `translate3d(${mousePos.x * img.speed}px, ${mousePos.y * img.speed}px, 0)`,
              transition: 'transform 0.2s ease-out'
            }}
          >
            <img 
              src={img.src} 
              alt="Portfolio preview" 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* 2. INVERTED CURSOR */}
      <div 
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-9999 transition-transform duration-100 ease-out mix-blend-difference bg-white"
        style={{
          transform: `translate3d(${mousePos.x - 24}px, ${mousePos.y - 24}px, 0) scale(${isHovering ? 2.5 : 1})`,
        }}
      />

      {/* 3. HERO CONTENT */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div 
          className="mb-8"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <h1 className="text-7xl md:text-[11rem] font-bold tracking-tighter leading-[0.85] uppercase select-none">
            <span className="text-[#36558F] block">Tibo</span>
            <span className="text-[#36558F] block min-h-[1em]"> 
              <Typewriter
                options={{
                  strings: ['Vermeersch', 'Vormgever', 'Fotograaf', 'Designer'],
                  autoStart: true,
                  loop: true,
                  cursor: '_',
                  delay: 80,
                  deleteSpeed: 40,
                }}
              />
            </span>
          </h1>
        </div>

        <p 
          className="max-w-xl text-zinc-600 text-lg md:text-xl font-light leading-relaxed mb-12 italic pl-6 mx-auto select-none bg-white/40 backdrop-blur-md px-4 py-2 rounded-xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Grafisch Vormgever met <br className="hidden md:block" />
          een passie voor fotografie
        </p>

        <Link 
          href="/project" 
          className="px-10 py-4 border-2 border-[#36558F] text-[#36558F] rounded-full font-bold transition-all hover:bg-[#36558F] hover:text-white active:scale-95 relative z-20 bg-white/80 backdrop-blur-sm"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          BEKIJK PORTFOLIO
        </Link>
      </section>

      {/* 4. SUBTIELE NOISE TEXTUUR */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-multiply" 
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
    </main>
  )
}