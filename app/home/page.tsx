"use client"

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Typewriter from 'typewriter-effect'
import { motion, useSpring, useMotionValue, useTransform, MotionValue } from 'framer-motion'

// 1. FLOATING IMAGE COMPONENT
const FloatingImage = ({ img, mouseX, mouseY }: { img: any, mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
  const springConfig = { damping: 40, stiffness: 100 };
  const x = useTransform(mouseX, [0, 2000], [img.speed, -img.speed]);
  const y = useTransform(mouseY, [0, 1200], [img.speed, -img.speed]);
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  return (
    <motion.div
      style={{
        top: img.top,
        left: img.left,
        x: smoothX,
        y: smoothY,
        opacity: 0.3
      }}
      className={`absolute ${img.size} rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm animate-slow-float pointer-events-none z-0`}
    >
      <img src={img.src} alt="" className="w-full h-full object-cover grayscale brightness-110" />
    </motion.div>
  );
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { damping: 35, stiffness: 400 });
  const cursorY = useSpring(mouseY, { damping: 35, stiffness: 400 });

  const floatingImages = useMemo(() => [
    { id: 1, src: "/home/foto1.webp", top: "12%", left: "8%", size: "w-24 h-36 md:w-48 md:h-64", speed: 30 },
    { id: 2, src: "/home/foto2.webp", top: "75%", left: "5%", size: "w-32 h-24 md:w-64 md:h-44", speed: -25 },
    { id: 3, src: "/home/foto3.webp", top: "15%", left: "75%", size: "w-24 h-40 md:w-56 md:h-72", speed: 25 },
    { id: 4, src: "/home/foto4.webp", top: "78%", left: "72%", size: "w-20 h-32 md:w-44 md:h-60", speed: -30 },
  ], []);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return <div className="h-screen bg-white" />;

  return (
    <main className={`h-[100dvh] w-full bg-white text-black overflow-hidden relative flex flex-col justify-center items-center select-none ${!isMobile ? 'cursor-none' : ''}`}>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-slow-float {
          animation: float 7s ease-in-out infinite;
        }
        /* Zorg dat de typewriter cursor ook de juiste kleur heeft */
        .Typewriter__cursor {
          color: #36558F;
        }
      `}</style>

      {/* HEADER UI */}
      <div className="absolute top-0 inset-x-0 z-50 p-6 md:p-10 flex justify-between items-start text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
          DESIGNER & PHOTOGRAPHER
        </div>
        <div className="text-right">ANTWERP // 2026</div>
      </div>

      {/* FLOATING IMAGES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingImages.map((img) => (
          <FloatingImage key={img.id} img={img} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      {/* CUSTOM CURSOR */}
      {!isMobile && (
        <motion.div 
          className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-10 mix-blend-difference bg-white"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            scale: isHovering ? 5 : 1,
          }}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <section className="relative z-20 text-center flex flex-col items-center px-6">
        <div 
          className="mb-4 md:mb-6"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Titel iets kleiner voor betere balans (14vw ipv 16vw) */}
          <h1 className="text-[14vw] md:text-[8rem] font-black tracking-tighter leading-[0.9] uppercase text-[#36558F]">
            <span className="block">Tibo</span>
            <span className="block min-h-[1.1em]"> 
              <Typewriter
                options={{
                  strings: ['Fotograaf', 'Vormgever', 'Designer'],
                  autoStart: true, 
                  loop: true, 
                  cursor: '', 
                  delay: 70, 
                  deleteSpeed: 40,
                  wrapperClassName: "text-[#36558F]" // Kleur exact hetzelfde als 'Tibo'
                }}
              />
            </span>
          </h1>
        </div>

        <p className="max-w-[260px] md:max-w-xl text-zinc-400 text-xs md:text-lg font-medium italic mb-10 leading-relaxed">
          Grafisch Vormgever met <br className="hidden md:block" />
          een passie voor fotografie.
        </p>

        <Link 
          href="/project" 
          className="group px-10 py-4 md:px-12 md:py-5 border border-zinc-200 text-[#36558F] rounded-full text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 hover:bg-[#36558F] hover:text-white flex items-center gap-6 relative overflow-hidden bg-white"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className="relative z-10">Ontdek Portfolio</span>
          <div className="w-6 md:w-8 h-px bg-[#36558F] group-hover:bg-white transition-all duration-500 relative z-10" />
          <div className="absolute inset-0 bg-[#36558F] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
        </Link>
      </section>

      {/* FOOTER UI */}
      <div className="absolute bottom-0 inset-x-0 z-50 p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[7px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300">
        <div className="hidden md:block">© T. VERMEERSCH</div>
        <div className="flex gap-6">
          <span className="hover:text-zinc-500 cursor-pointer transition-colors">Instagram</span>
          <span className="hover:text-zinc-500 cursor-pointer transition-colors">LinkedIn</span>
        </div>
        <div>VISUAL DESIGN // 2026</div>
      </div>

      {/* NOISE OVERLAY */}
      <div className="pointer-events-none fixed inset-0 z-[60] opacity-[0.02] mix-blend-multiply" 
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
    </main>
  )
}