"use client"

import { useState } from "react"
import { FiX } from "react-icons/fi" 

export default function AboutPage() {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  const gridItems = [
    { id: 1,size: "md:col-span-2 md:row-span-2", color: "bg-zinc-800" },
    { id: 2,size: "md:col-span-1 md:row-span-1", color: "bg-zinc-700" },
    { id: 3,size: "md:col-span-1 md:row-span-2", color: "bg-zinc-800" },
    { id: 4,size: "md:col-span-2 md:row-span-1", color: "bg-zinc-700" },
    { id: 5, size: "md:col-span-3 md:row-span-1", color: "bg-zinc-800" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-20 text-white min-h-screen">

      {/* HEADER SECTIE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-red to-red-500 uppercase">
            Hoe zie jij mij?
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <h2 className="text-xl font-bold tracking-[0.2em] text-white uppercase">
              Reflecties | Leporello
            </h2>
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-8 bg-zinc-700 hidden md:block"></span>
              <p className="text-sm font-light tracking-widest text-zinc-500 italic">
                Focus: Persoonlijk, redactioneel en kwetsbaar
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
          <p>
            Wie ben ik door de ogen van een ander? In dit persoonlijke project heb ik de vorm van een leporello (harmonicaboek) gebruikt om een gelaagd beeld van mezelf te schetsen. In plaats van alleen mijn eigen perspectief te tonen, heb ik twee sleutelfiguren uit mijn leven gevraagd om een tekst over mij te schrijven. Het resultaat is een tastbaar object waarin beeld en oprechte woorden samenkomen, en waarin de kijker letterlijk mijn identiteit kan uitvouwen en ontdekken.
          </p>
        </div>
      </div>

      {/* DYNAMISCH BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
        {gridItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImg(item.id)}
            className={`group relative overflow-hidden rounded-[2.5rem] cursor-pointer border border-white/5 transition-all duration-500 hover:border-cyan-500/50 ${item.size} ${item.color}`}
          >
            <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
              <span className="text-white/10 font-black text-2xl uppercase tracking-tighter group-hover:text-cyan-500/20 transition-colors">
              
              </span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImg !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center  backdrop-blur-xl p-4 md:p-12"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50">
            <FiX size={40} />
          </button>

          <div 
            className="relative w-full h-full max-w-5xl rounded-[3rem] bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
             <div className="text-center space-y-4">
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white/20">
                    Image {selectedImg}
                </h3>
                <div className="w-12 h-[2px] bg-cyan-500 mx-auto"></div>
                <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">Project Preview Mode</p>
             </div>
          </div>
        </div>
      )}

    </div>
  )
}