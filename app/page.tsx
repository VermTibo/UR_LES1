"use client"

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import Typewriter from 'typewriter-effect'
import { motion, useSpring, useMotionValue, useTransform, MotionValue, Variants, AnimatePresence } from 'framer-motion'

// 1. LOADING SCREEN COMPONENT
const LoadingScreen = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className="fixed inset-0 z-200 bg-white flex flex-col justify-center items-center"
  >
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-[#36558F] text-[10px] font-black uppercase tracking-[1em] mb-8"
    >
      T. Vermeersch
    </motion.div>
    <div className="w-32 h-px bg-zinc-100 relative overflow-hidden">
      <motion.div 
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[#36558F]"
      />
    </div>
  </motion.div>
)

// 2. GEOPTIMALISEERDE FLOATING IMAGE
const FloatingImage = ({ img, mouseX, mouseY, isHovering }: { img: any; mouseX: MotionValue<number>; mouseY: MotionValue<number>; isHovering: boolean }) => {
  const x = useTransform(mouseX, [0, 2000], [img.speed, -img.speed]);
  const y = useTransform(mouseY, [0, 1200], [img.speed, -img.speed]);
  const smoothX = useSpring(x, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(y, { damping: 50, stiffness: 100 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isHovering ? 0.4 : 0.25, 
        scale: isHovering ? 1.05 : 1,
        y: [0, -10, 0] 
      }}
      transition={{
        opacity: { duration: 0.4 },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: img.id * 0.4 }
      }}
      style={{ top: img.top, left: img.left, x: smoothX, y: smoothY }}
      className={`absolute ${img.size} rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl pointer-events-none z-10`}
    >
      <Image 
        src={img.src} 
        alt=""
        fill
        sizes="300px"
        className="object-cover grayscale brightness-110"
        priority={img.id <= 2}
        quality={60}
      />
    </motion.div>
  );
};

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const lineLeftX = useTransform(mouseX, [0, 2000], [-30, 30]);
  const lineRightX = useTransform(mouseX, [0, 2000], [30, -30]);
  const smoothLineLeft = useSpring(lineLeftX, { damping: 50, stiffness: 100 });
  const smoothLineRight = useSpring(lineRightX, { damping: 50, stiffness: 100 });

  const cursorX = useSpring(mouseX, { damping: 30, stiffness: 400 });
  const cursorY = useSpring(mouseY, { damping: 30, stiffness: 400 });

  const floatingImages = useMemo(() => [
    { id: 1, src: "/home/foto1.webp", top: "18%", left: "18%", size: "w-24 h-36 md:w-52 md:h-64", speed: 30 },
    { id: 2, src: "/home/foto2.webp", top: "65%", left: "15%", size: "w-32 h-24 md:w-60 md:h-44", speed: -25 },
    { id: 3, src: "/home/foto3.webp", top: "20%", left: "68%", size: "w-24 h-40 md:w-56 md:h-72", speed: 25 },
    { id: 4, src: "/home/foto4.webp", top: "68%", left: "72%", size: "w-20 h-32 md:w-48 md:h-60", speed: -30 },
  ], []);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    // Loader weghalen zodra alles geladen is
    const handleLoad = () => setTimeout(() => setLoading(false), 800);
    if (document.readyState === 'complete') handleLoad();
    else window.addEventListener('load', handleLoad);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('load', handleLoad);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return <div className="h-screen bg-white" />;

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <main className={`h-dvh w-full bg-white text-zinc-900 overflow-hidden relative flex flex-col justify-center items-center select-none ${!isMobile ? 'cursor-none' : ''}`}>
        
        <style>{`
          .Typewriter__cursor { color: #36558F; font-weight: 900; }
          .clip-text-reveal { clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
        `}</style>

        {/* ACHTERGROND LIJNEN */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-white">
           <motion.div style={{ x: smoothLineLeft }} className="absolute top-0 left-[20%] w-px h-full bg-zinc-200" />
           <motion.div style={{ x: smoothLineRight }} className="absolute top-0 right-[20%] w-px h-full bg-zinc-200" />
        </div>

        {/* HEADER - z-100 voor zichtbaarheid */}
        <motion.header 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 inset-x-0 z-100 p-10 md:p-14 flex justify-between items-start text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 pointer-events-none"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#36558F] rounded-full" />
            DESIGNER & PHOTOGRAPHER
          </div>
          <div>ANTWERP // 2026</div>
        </motion.header>

        {/* FLOATING IMAGES */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {floatingImages.map((img) => (
            <FloatingImage key={img.id} img={img} mouseX={mouseX} mouseY={mouseY} isHovering={isHovering} />
          ))}
        </div>

        {/* CUSTOM CURSOR */}
        {!isMobile && (
          <motion.div 
            className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-110 mix-blend-difference bg-white"
            style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%", scale: isHovering ? 4 : 1 }}
          />
        )}

        {/* MAIN CONTENT */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={loading ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-30 text-center flex flex-col items-center px-6"
        >
          <div className="mb-6 md:mb-8 clip-text-reveal" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <h1 className="text-[14vw] md:text-[8rem] font-black tracking-tighter leading-[0.9] uppercase text-[#36558F]">
              <span className="block">Tibo</span>
              <span className="block min-h-[1.1em]"> 
                <Typewriter options={{ strings: ['Fotograaf', 'Vormgever', 'Designer'], autoStart: true, loop: true, cursor: '', delay: 50, deleteSpeed: 30, wrapperClassName: "text-[#36558F]" }} />
              </span>
            </h1>
          </div>

          <p className="max-w-65 md:max-w-xl text-zinc-400 text-xs md:text-lg font-medium italic mb-10 leading-relaxed">
            Visual Designer & Photographer.
          </p>

          <Link 
            href="/project" 
            className="group relative flex items-center gap-6 px-10 py-5 md:px-12 md:py-6 bg-[#36558F] border-2 border-[#36558F] rounded-full transition-all duration-300 hover:bg-transparent"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="relative z-10 text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase text-white group-hover:text-[#36558F]">
              Ontdek Portfolio
            </span>
            <div className="relative z-10 w-6 md:w-8 h-0.5 bg-white group-hover:bg-[#36558F]" />
          </Link>
        </motion.section>

        {/* FOOTER */}
        <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-0 inset-x-0 z-50 p-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[7px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300 pointer-events-none">
          <div className="hidden md:block">© T. VERMEERSCH</div>
          <div className="flex gap-6 pointer-events-auto">
            <Link href="#" className="hover:text-zinc-500 transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-zinc-500 transition-colors">LinkedIn</Link>
          </div>
          <div>2026</div>
        </motion.footer>
      </main>
    </>
  )
}