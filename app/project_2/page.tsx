"use client"

import { useState } from "react"
import { FiX } from "react-icons/fi" 
import Link from "next/link" // DIT MOET BOVENAAN STAAN
import { motion, AnimatePresence } from "framer-motion"

export default function AboutPage() {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  // Hier koppel je de afbeeldingen aan de grid items
  const gridItems = [
    { id: 1, size: "md:col-span-2 md:row-span-2", img: "/projects/fermette/img1.jpg" },
    { id: 2, size: "md:col-span-1 md:row-span-1", img: "/projects/fermette/img2.jpg" },
    { id: 3, size: "md:col-span-1 md:row-span-2", img: "/projects/fermette/img3.jpg" },
    { id: 4, size: "md:col-span-2 md:row-span-1", img: "/projects/fermette/img4.jpg" },
    { id: 5, size: "md:col-span-3 md:row-span-1", img: "/projects/fermette/img5.jpg" },
  ];

  // Zoek de data van de geselecteerde afbeelding voor de lightbox
  const currentItem = gridItems.find(item => item.id === selectedImg);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-20 text-white min-h-screen">

      {/* HEADER SECTIE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-orange-500 to-red-500 uppercase">
            De Fermette
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <h2 className="text-xl font-bold tracking-[0.2em] text-white uppercase">
              Fotoreportage
            </h2>
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-zinc-700 hidden md:block"></span>
              <p className="text-sm font-light tracking-widest text-zinc-500 italic">
                Sfeer, Gezelligheid, lekker eten
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
          <p>
            Recent heb ik een uitgebreide shoot verzorgd voor De Fermette. De focus lag op het vangen van de unieke, landelijke ambiance in combinatie met hun hoogwaardige gastronomie. Een prachtige locatie waar interieur en culinaire presentatie naadloos in elkaar overlopen.
          </p>
        </div>
      </div>

      {/* DYNAMISCH BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
        {gridItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImg(item.id)}
            className={`group relative overflow-hidden rounded-[2.5rem] cursor-pointer border border-white/5 transition-all duration-500 hover:border-cyan-500/50 ${item.size} bg-zinc-800`}
          >
            {/* DE AFBEELDING */}
            <img 
              src={item.img} 
              alt={`Project display ${item.id}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* HOVER OVERLAY */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
               <p className="text-orange-400 text-sm font-bold tracking-widest uppercase">Bekijk Detail</p>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImg !== null && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-xl bg-black/40 p-4 md:p-12"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-110">
            <FiX size={40} />
          </button>

          <div 
            className="relative w-full h-full max-w-6xl rounded-[3rem] bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
             {/* TOONT DE GROTE FOTO IN DE MODAL */}
             {currentItem ? (
                <img 
                  src={currentItem.img} 
                  alt="Full preview" 
                  className="w-full h-full object-contain p-4"
                />
             ) : (
                <div className="text-center space-y-4">
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white/20">
                        Image {selectedImg}
                    </h3>
                    <div className="w-12 h-0.5 bg-cyan-500 mx-auto"></div>
                    <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">Geen afbeelding gevonden</p>
                </div>
             )}
          </div>
        </div>
      )}
{/* TERUG NAAR OVERZICHT KNOP */}
<footer className="flex justify-center pt-8 pb-12">
          <Link 
            href="/project" 
            className="group flex items-center gap-4 bg-black text-white px-8 py-5 rounded-full hover:bg-[#36558F] transition-all duration-500 shadow-xl"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span className="text-xs font-black uppercase tracking-[0.3em]">
              Projecten
            </span>
          </Link>
        </footer>
    </div>
  )
}