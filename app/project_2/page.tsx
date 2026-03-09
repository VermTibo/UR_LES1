"use client"

import { useState } from "react"
import { FiX, FiRepeat, FiArrowRight, FiTarget } from "react-icons/fi" 
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function FermettePage() {
  const [isAltVersion, setIsAltVersion] = useState(false);
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  const layoutSurveyLink = "https://forms.gle/WuZcxAqnGpvj5BzM6";

  const gridItems = [
    { id: 1, size: "md:col-span-2 md:row-span-2", img: "/projects/fermette/img1.webp" },
    { id: 2, size: "md:col-span-1 md:row-span-1", img: "/projects/fermette/img2.webp" },
    { id: 3, size: "md:col-span-1 md:row-span-2", img: "/projects/fermette/img3.webp" },
    { id: 4, size: "md:col-span-2 md:row-span-1", img: "/projects/fermette/img4.webp" },
    { id: 5, size: "md:col-span-3 md:row-span-1", img: "/projects/fermette/img5.webp" },
  ];

  const currentItem = gridItems.find(item => item.id === selectedImg);

  return (
    <div className={`w-full min-h-screen bg-white text-zinc-900 transition-all duration-1000 selection:bg-orange-500 selection:text-white overflow-x-hidden ${isAltVersion ? 'font-serif' : 'font-sans'}`}>
      
      {/* 1. LAYOUT SIDE-BAR (Desktop) */}
      <motion.div 
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-100 hidden lg:flex items-center"
      >
        <a 
          href={layoutSurveyLink} 
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-4 py-8 px-4 transition-all duration-500 group border-l-4 shadow-2xl
            ${isAltVersion 
              ? 'bg-orange-600 text-white border-white' 
              : 'bg-white text-[#36558F] border-[#36558F] rounded-l-[2rem]'
            }`}
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] rotate-180">
            Beoordeel deze layout
          </span>
          <FiTarget className="rotate-90 group-hover:scale-125 transition-transform" size={20} />
        </a>
      </motion.div>

      {/* 2. GRAIN OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-90 opacity-[0.03] contrast-125" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 3. AUTOMATISCHE MARQUEE - Fluid Text */}
      <div className="pt-24 overflow-hidden whitespace-nowrap border-b border-zinc-100 pb-4">
        <motion.div 
          className="flex gap-12 md:gap-24 items-center"
          animate={{ x: [0, -1500] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(12)].map((_, i) => (
            <span key={i} className={`text-[min(3.5vw,14px)] font-black uppercase tracking-[0.4em] opacity-20 ${isAltVersion ? 'italic text-orange-600' : 'text-blue-600'}`}>
              De Fermette Gastronomie • Sfeer & Gezelligheid • 2025 •
            </span>
          ))}
        </motion.div>
      </div>

      {/* 4. STYLE SWITCHER */}
      <button 
        onClick={() => setIsAltVersion(!isAltVersion)}
        className="fixed top-4 right-4 md:top-8 md:right-8 z-110 flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-white/90 backdrop-blur-md border border-zinc-200 shadow-xl rounded-full hover:border-zinc-900 transition-all active:scale-95 group"
      >
        <FiRepeat className={`text-xs md:text-base transition-transform duration-500 group-hover:rotate-180 ${isAltVersion ? 'text-orange-500' : 'text-blue-600'}`} />
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Switch Identity</span>
      </button>

      {/* 5. HERO SECTION - Fluid Scaling */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-8 md:pb-16">
        <div className="mb-6 md:mb-10">
          <motion.h1 
            layout
            className={`
              /* Fluid Text: van ~50px naar ~150px */
              text-[clamp(3rem,12vw,9.5rem)] 
              leading-[0.8] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-r 
              ${isAltVersion ? 'from-orange-500 via-red-500 to-rose-500 italic' : 'from-blue-600 via-cyan-500 to-indigo-600'}
            `}
          >
            De Fermette
          </motion.h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-t border-zinc-100 pt-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Shoot Report</span>
            <div className={`h-1 w-24 ${isAltVersion ? 'bg-orange-500' : 'bg-blue-600'}`} />
          </div>
          <p className={`max-w-md text-base md:text-lg lg:text-xl leading-snug text-zinc-500 ${isAltVersion ? 'font-light italic' : 'font-medium'}`}>
            Een uitgebreide shoot waarbij interieur en culinaire presentatie naadloos in elkaar overlopen. Focus op de unieke, landelijke ambiance.
          </p>
        </div>
      </section>

      {/* 6. BENTO GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 auto-rows-[280px] md:auto-rows-[380px]">
          {gridItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => setSelectedImg(item.id)}
              className={`group relative cursor-pointer overflow-hidden border border-zinc-100 transition-all duration-700
                ${item.size} 
                ${isAltVersion ? 'rounded-none border-zinc-300 p-2 bg-zinc-50 shadow-inner' : 'rounded-[2rem] lg:rounded-[4rem] shadow-sm bg-white'}`}
            >
              {isAltVersion && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-orange-300" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-orange-300" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-orange-300" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-orange-300" />
                </div>
              )}

              <div className="w-full h-full overflow-hidden relative">
                <img 
                  src={item.img} 
                  alt="Fermette detail"
                  className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 
                    ${isAltVersion ? 'grayscale brightness-90 group-hover:grayscale-0' : ''}`}
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md
                     ${isAltVersion ? 'bg-orange-600 text-white' : 'bg-white text-blue-600 rounded-full'}`}>
                     Open View
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. MOBILE SURVEY BUTTON */}
      <div className="lg:hidden px-6 my-12">
        <a 
          href={layoutSurveyLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-3 w-full py-5 px-6 font-black uppercase tracking-[0.2em] text-[10px] shadow-xl active:scale-95 transition-all
            ${isAltVersion ? 'bg-orange-600 text-white' : 'bg-[#36558F] text-white rounded-xl'}`}
        >
          <FiTarget size={18} />
          Layout Enquête
        </a>
      </div>

      {/* 8. FOOTER - Responsive Typography */}
      <footer className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 border-t border-zinc-100 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="space-y-2">
             <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Gastronomie</h2>
             <p className="text-xs md:text-sm text-zinc-400 uppercase tracking-[0.3em] italic text-center md:text-left">De Fermette / Fotoreportage / 2025</p>
          </div>
          
          <Link 
            href="/project" 
            className={`flex items-center gap-6 px-10 py-5 transition-all duration-500 group w-full md:w-auto justify-center
              ${isAltVersion ? 'bg-orange-600 text-white shadow-2xl shadow-orange-500/30' : 'bg-zinc-950 text-white rounded-full hover:bg-blue-600 shadow-2xl shadow-blue-500/20'}`}
          >
            <span className="text-xs font-black uppercase tracking-[0.2em]">Terug naar overzicht</span>
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
        </div>
      </footer>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImg !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 flex items-center justify-center bg-white/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-zinc-900 p-3 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors">
              <FiX size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className={`relative max-w-5xl w-full aspect-video md:aspect-auto ${isAltVersion ? 'p-1 bg-orange-600' : ''}`}
            >
              <img 
                src={currentItem?.img} 
                className={`w-full h-full max-h-[85vh] object-contain shadow-2xl ${isAltVersion ? 'rounded-none' : 'rounded-2xl lg:rounded-[3rem]'}`} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}