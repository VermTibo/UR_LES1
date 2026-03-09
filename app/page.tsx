"use client"

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Typewriter from 'typewriter-effect'
import { motion, useSpring, useMotionValue, useTransform, MotionValue, Variants } from 'framer-motion'

// 1. INTERFACES
interface ImageData {
  id: number;
  src: string;
  top: string;
  left: string;
  size: string;
  speed: number;
}

interface FloatingImageProps {
  img: ImageData;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isHovering: boolean;
}

// 2. FLOATING IMAGE COMPONENT
const FloatingImage = ({ img, mouseX, mouseY, isHovering }: FloatingImageProps) => {
  const springConfig = { damping: 40, stiffness: 80 };
  const x = useTransform(mouseX, [0, 2000], [img.speed, -img.speed]);
  const y = useTransform(mouseY, [0, 1200], [img.speed, -img.speed]);
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isHovering ? 0.4 : 0.25, 
        scale: isHovering ? 1.05 : 1,
        y: [0, -10, 0] 
      }}
      transition={{
        opacity: { duration: 0.6 },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: img.id * 0.4 }
      }}
      style={{
        top: img.top,
        left: img.left,
        x: smoothX,
        y: smoothY,
      }}
      className={`absolute ${img.size} rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl pointer-events-none z-10`}
    >
      <img 
        src={img.src} 
        alt="" 
        className="w-full h-full object-cover grayscale brightness-110" 
      />
    </motion.div>
  );
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // FIX: Hooks bovenaan definiëren voor de achtergrondlijnen (voorkomt de error uit je screenshot)
  const lineLeftX = useTransform(mouseX, [0, 2000], [-30, 30]);
  const lineRightX = useTransform(mouseX, [0, 2000], [30, -30]);
  const smoothLineLeft = useSpring(lineLeftX, { damping: 50, stiffness: 100 });
  const smoothLineRight = useSpring(lineRightX, { damping: 50, stiffness: 100 });

  const cursorX = useSpring(mouseX, { damping: 30, stiffness: 300 });
  const cursorY = useSpring(mouseY, { damping: 30, stiffness: 300 });

  const floatingImages: ImageData[] = useMemo(() => [
    { id: 1, src: "/home/foto1.webp", top: "18%", left: "18%", size: "w-24 h-36 md:w-52 md:h-64", speed: 30 },
    { id: 2, src: "/home/foto2.webp", top: "65%", left: "15%", size: "w-32 h-24 md:w-60 md:h-44", speed: -25 },
    { id: 3, src: "/home/foto3.webp", top: "20%", left: "68%", size: "w-24 h-40 md:w-56 md:h-72", speed: 25 },
    { id: 4, src: "/home/foto4.webp", top: "68%", left: "72%", size: "w-20 h-32 md:w-48 md:h-60", speed: -30 },
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

  // Typescript Variants Fix (lost de foutmelding in je VS Code op)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  if (!mounted) return <div className="h-screen bg-white" />;

  return (
    <main className={`h-dvh w-full bg-white text-zinc-900 overflow-hidden relative flex flex-col justify-center items-center select-none ${!isMobile ? 'cursor-none' : ''}`}>
      
      <style>{`
        .Typewriter__cursor { color: #36558F; font-weight: 900; }
        .clip-text-reveal { clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
      `}</style>

      {/* ACHTERGROND LIJNEN: Nu zonder errors */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-white">
         <motion.div 
           style={{ x: smoothLineLeft }}
           className="absolute top-0 left-[20%] w-px h-full bg-zinc-200" 
         />
         <motion.div 
           style={{ x: smoothLineRight }}
           className="absolute top-0 right-[20%] w-px h-full bg-zinc-200" 
         />
      </div>

      {/* HEADER: Altijd bovenaan (z-100) */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-0 inset-x-0 z-100 p-10 md:p-14 flex justify-between items-start text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#36558F] rounded-full" />
          DESIGNER & PHOTOGRAPHER
        </div>
        <div className="text-right">ANTWERP // 2026</div>
      </motion.div>

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
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            scale: isHovering ? 4 : 1,
          }}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-30 text-center flex flex-col items-center px-6"
      >
        <motion.div 
          variants={itemVariants}
          className="mb-6 md:mb-8 clip-text-reveal"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
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
                  wrapperClassName: "text-[#36558F]"
                }}
              />
            </span>
          </h1>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="max-w-65 md:max-w-xl text-zinc-400 text-xs md:text-lg font-medium italic mb-10 leading-relaxed"
        >
          Grafisch Vormgever met <br className="hidden md:block" />
          een passie voor fotografie.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link 
            href="/project" 
            className="group relative overflow-hidden flex items-center gap-6 px-10 py-5 md:px-12 md:py-6 bg-[#36558F] border-2 border-[#36558F] rounded-full transition-all duration-500 hover:bg-transparent"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="relative z-10 text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase text-white group-hover:text-[#36558F] transition-colors duration-500">
              Ontdek Portfolio
            </span>
            <div className="relative z-10 w-6 md:w-8 h-0.5 bg-white group-hover:bg-[#36558F] transition-colors duration-500" />
          </Link>
        </motion.div>
      </motion.section>

      {/* FOOTER */}
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute bottom-0 inset-x-0 z-50 p-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[7px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300"
      >
        <div className="hidden md:block">© T. VERMEERSCH</div>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-zinc-500 transition-colors">Instagram</Link>
          <Link href="#" className="hover:text-zinc-500 transition-colors">LinkedIn</Link>
        </div>
        <div>VISUAL DESIGN // 2026</div>
      </motion.div>

      {/* NOISE OVERLAY */}
      <div className="pointer-events-none fixed inset-0 z-60 opacity-[0.02] mix-blend-multiply" 
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
    </main>
  )
}