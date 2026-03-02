"use client"

import React from "react"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen text-black selection:bg-zinc-200 font-sans">
      <main className="max-w-6xl mx-auto px-6 py-24 md:py-40">
        
        {/* HEADER SECTIE */}
        <div className="mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#36558F] font-bold tracking-[0.4em] uppercase text-[10px] mb-4"
          >
            Grafisch Vormgever & Fotograaf
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-[9rem] text-[#36558F] tracking-tighter leading-[0.8] uppercase"
          >
            Achter <br /> Het <br /> Werk.
          </motion.h1>
        </div>

        {/* INTRODUCTIE GRID (Foto + Tekst) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          
          {/* FOTO PLACEHOLDER (Grijs vlak) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 aspect-4/5 bg-zinc-100 rounded-[3rem] overflow-hidden relative group"
          >
            {/* Zodra je een foto hebt, vervang je de 'src' hieronder */}
           <img src="/img1.webp" className="w-full h-full object-cover" alt="Portret" />
          </motion.div>

          {/* TEKST: VOORSTELLEN */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Hoi, ik ben Tibo een creatieve geest met een passie voor <span className="italic text-zinc-400 font-medium">beeld en beleving.</span>
            </h2>
            <div className="space-y-6 text-zinc-500 text-lg leading-relaxed">
              <p>
                Mijn reis in design en fotografie begon vanuit een fascinatie voor hoe beelden een verhaal kunnen vertellen zonder woorden. Vandaag de dag help ik merken en ondernemers om diezelfde impact te maken.
              </p>
              <p>
                Ik werk vanuit een minimalistische filosofie: alles wat geen functie heeft, laten we weg. Wat overblijft is de essentie, krachtig en puur. Of ik nu een brandingtraject doe of een fotoshoot leid, die focus op kwaliteit staat altijd centraal.
              </p>
            </div>
          </motion.div>
        </div>

        {/* EXTRA INFO & CONTACT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-zinc-100 pt-20">
          
          <div className="lg:col-span-7">
            <h3 className="text-xs font-black uppercase tracking-widest mb-10 text-[#36558F]">Hoe ik werk</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <span className="text-xl font-bold uppercase tracking-tighter italic text-zinc-300">01. Luisteren</span>
                <p className="text-sm text-zinc-500">Ik duik diep in jouw verhaal om te begrijpen wat je écht wilt vertellen.</p>
              </div>
              <div className="space-y-3">
                <span className="text-xl font-bold uppercase tracking-tighter italic text-zinc-300">02. Creëren</span>
                <p className="text-sm text-zinc-500">Geen standaard templates, maar maatwerk dat perfect aansluit bij jouw visie.</p>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-zinc-900 text-white p-12 rounded-[3.5rem] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#36558F]">Project starten?</h3>
              <p className="text-2xl font-bold tracking-tight">Klaar om je merk naar een hoger niveau te tillen?</p>
            </div>
            <a 
              href="mailto:tibovermeersch0609@gmail.com" 
              className="mt-12 bg-white text-black text-center py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#36558F] hover:text-white transition-all duration-500 shadow-xl"
            >
              Stuur een mailtje
            </a>
          </motion.div>

        </div>
      </main>
    </div>
  )
}