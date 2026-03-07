"use client"

import { useState } from "react"
import { FiX, FiRepeat, FiArrowRight, FiTarget } from "react-icons/fi" 
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function CineCityFinal() {
  const [isAltVersion, setIsAltVersion] = useState(false);
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  const layoutSurveyLink = "https://forms.gle/cmbCuhBk7dymar6Q7";

  const gridItems = [
    { id: 1, size: "md:col-span-2 md:row-span-2", img: "/projects/cinecity/img1.webp" },
    { id: 2, size: "md:col-span-1 md:row-span-1", img: "/projects/cinecity/img2.webp" },
    { id: 3, size: "md:col-span-1 md:row-span-2", img: "/projects/cinecity/img3.webp" },
    { id: 4, size: "md:col-span-2 md:row-span-1", img: "/projects/cinecity/img4.webp" },
    { id: 5, size: "md:col-span-3 md:row-span-1", img: "/projects/cinecity/img5.webp" },
  ];

  const currentItem = gridItems.find(item => item.id === selectedImg);

  return (
    <div className={`w-full min-h-screen bg-white text-zinc-900 transition-all duration-1000 selection:bg-orange-500 selection:text-white overflow-x-hidden ${isAltVersion ? 'font-serif' : 'font-sans'}`}>
      
      {/* 1. LAYOUT & ESTHETIEK SIDE-BAR KNOP (Desktop Only) */}
      <motion.div 
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[120] hidden lg:flex items-center"
      >
        <a 
          href={layoutSurveyLink} 
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-4 py-8 px-4 transition-all duration-500 group border-l-4 shadow-2xl
            ${isAltVersion 
              ? 'bg-orange-600 text-white border-white rounded-l-none' 
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

      {/* 2. AUTOMATISCHE MARQUEE */}
      <div className="pt-24 overflow-hidden whitespace-nowrap border-b border-zinc-100 pb-4">
        <motion.div 
          className="flex gap-10 md:gap-20 items-center"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className={`text-[10px] md:text-sm font-black uppercase tracking-[0.5em] opacity-20 ${isAltVersion ? 'italic text-orange-600' : 'text-blue-600'}`}>
              CineCity Film Festival 2025 • Antwerp City •
            </span>
          ))}
        </motion.div>
      </div>

      {/* 3. STYLE SWITCHER (Responsive Position) */}
      <button 
        onClick={() => setIsAltVersion(!isAltVersion)}
        className="fixed top-6 right-6 md:top-8 md:right-8 z-[110] flex items-center gap-2 md:gap-3 px-4 py-2.5 md:px-6 md:py-3 bg-white/80 backdrop-blur-md border border-zinc-200 shadow-xl rounded-full hover:border-zinc-900 transition-all active:scale-95 group"
      >
        <FiRepeat className={`text-sm md:text-base transition-transform duration-500 group-hover:rotate-180 ${isAltVersion ? 'text-orange-500' : 'text-blue-600'}`} />
        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Toggle Identity</span>
      </button>

      {/* 4. HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 pt-12 md:pt-16 pb-8 md:pb-12">
        <div className="mb-4 md:mb-6">
          <motion.h1 
            layout
            className={`
              /* Responsive Font Sizing */
              text-[15vw] md:text-[clamp(5rem,9vw,10rem)] 
              leading-[0.85] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r 
              ${isAltVersion ? 'from-orange-600 via-rose-500 to-amber-500 italic' : 'from-blue-600 via-cyan-500 to-indigo-600'}
            `}
          >
            CineCity
          </motion.h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 border-t border-zinc-100 pt-6 md:pt-8">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-300">Identity Concept</span>
            <div className={`h-1 w-16 md:w-20 ${isAltVersion ? 'bg-orange-500' : 'bg-blue-600'}`} />
          </div>
          <p className={`max-w-md text-sm md:text-base leading-relaxed text-zinc-500 ${isAltVersion ? 'font-light italic' : 'font-medium'}`}>
            Een visueel systeem dat de rauwe texturen van de stad vertaalt naar een dynamische festival ervaring.
          </p>
        </div>
      </section>

      {/* 5. BENTO GRID */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 auto-rows-[240px] md:auto-rows-[320px]">
          {gridItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedImg(item.id)}
              className={`group relative cursor-pointer overflow-hidden border border-zinc-100 transition-all duration-700
                ${item.size} 
                ${isAltVersion ? 'rounded-none border-zinc-300 p-1.5 md:p-2 bg-zinc-50' : 'rounded-[2rem] md:rounded-[3rem] shadow-sm bg-white'}`}
            >
              {isAltVersion && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-orange-300" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-orange-300" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-orange-300" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-orange-300" />
                </div>
              )}

              <div className="w-full h-full overflow-hidden relative">
                <img 
                  src={item.img} 
                  alt="Case"
                  className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 
                    ${isAltVersion ? 'grayscale brightness-90 group-hover:grayscale-0' : ''}`}
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className={`px-4 py-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md
                     ${isAltVersion ? 'bg-orange-600 text-white' : 'bg-white text-blue-600 rounded-full'}`}>
                     Expand
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. LAYOUT ENQUETE KNOP (Mobile Only Bottom Fixed of Inline) */}
      <div className="lg:hidden px-6 mb-12">
        <a 
          href={layoutSurveyLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-3 w-full py-4 px-6 font-black uppercase tracking-widest text-[9px] shadow-xl transition-all
            ${isAltVersion ? 'bg-orange-600 text-white' : 'bg-[#36558F] text-white rounded-full'}`}
        >
          <FiTarget size={16} />
          Layout Enquête
        </a>
      </div>

      {/* 7. FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24 border-t border-zinc-100 mt-12 md:mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12 text-center md:text-left">
          <div>
             <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2">Visual Identity</h2>
             <p className="text-[10px] text-zinc-400 uppercase tracking-widest italic">CineCity / 2025</p>
          </div>
          
          <Link 
            href="/project" 
            className={`flex items-center gap-4 md:gap-6 px-8 md:px-12 py-4 md:py-5 transition-all duration-500 group w-full md:w-auto justify-center
              ${isAltVersion ? 'bg-orange-600 text-white shadow-xl shadow-orange-500/20' : 'bg-zinc-950 text-white rounded-full hover:bg-blue-600 shadow-xl shadow-blue-500/10'}`}
          >
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Alle projecten</span>
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
          </Link>
        </div>
      </footer>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImg !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-white/98 backdrop-blur-2xl p-4 md:p-6"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 md:top-10 md:right-10 text-black hover:scale-110 transition-transform z-[210] p-2 bg-zinc-100 rounded-full md:bg-transparent">
              <FiX size={24} className="md:w-10 md:h-10" />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
              className={`relative max-w-full max-h-[85vh] ${isAltVersion ? 'p-1 bg-orange-600' : 'p-0'}`}
            >
              <img 
                src={currentItem?.img} 
                className={`w-full h-full max-h-[80vh] object-contain shadow-2xl ${isAltVersion ? 'rounded-none' : 'rounded-xl md:rounded-[3rem]'}`} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}