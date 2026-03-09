"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FiArrowRight, FiMail } from "react-icons/fi"

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen text-black selection:bg-[#36558F] selection:text-white font-sans overflow-x-hidden">
      <main className="max-w-6xl mx-auto px-6 py-20 md:py-40">
        
        {/* TITEL SECTIE */}
        <div className="mb-12 md:mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#36558F] font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block"
          >
            Contact
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[18vw] md:text-[9rem] text-[#36558F] tracking-tighter leading-[0.8] uppercase font-black"
          >
            Laten We <br /> Praten.
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LINKERKANT: INFO */}
          <div className="lg:col-span-5 space-y-10 md:space-y-12">
            <p className="text-xl md:text-2xl text-zinc-500 leading-snug font-medium max-w-sm">
              Heb je een project in gedachten of wil je even sparren?
            </p>
            
            <div className="space-y-3">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#36558F] flex items-center gap-2">
                <FiMail /> Email
              </h3>
              <a 
                href="mailto:tibovermeersch0609@gmail.com" 
                className="text-lg md:text-2xl font-bold hover:text-[#36558F] transition-colors warp-break-words"
              >
                tibovermeersch0609@gmail.com
              </a>
            </div>
          </div>

          {/* RECHTERKANT: FORMULIER */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 bg-zinc-50 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-zinc-100 shadow-sm"
          >
            <form className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-zinc-400">Naam</label>
                  <input 
                    type="text" 
                    placeholder="Je naam" 
                    className="w-full bg-white border-none rounded-full px-6 md:px-8 py-4 md:py-5 outline-none focus:ring-2 focus:ring-[#36558F] transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-zinc-400">Email</label>
                  <input 
                    type="email" 
                    placeholder="Email adres" 
                    className="w-full bg-white border-none rounded-full px-6 md:px-8 py-4 md:py-5 outline-none focus:ring-2 focus:ring-[#36558F] transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-zinc-400">Bericht</label>
                <textarea 
                  rows={4} 
                  placeholder="Wat kan ik voor je doen?" 
                  className="w-full bg-white border-none rounded-[1.5rem] md:rounded-[2rem] px-6 md:px-8 py-5 md:py-6 outline-none focus:ring-2 focus:ring-[#36558F] resize-none transition-all"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-black text-white font-black uppercase text-[10px] md:text-xs tracking-[0.3em] py-5 md:py-6 rounded-full hover:bg-[#36558F] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-xl"
              >
                Verstuur Bericht
              </button>
            </form>
          </motion.div>
        </div>

        {/* NAVIGATION BACK */}
        <footer className="flex justify-center pt-20 md:pt-32">
          <Link 
            href="/home" 
            className="group flex items-center gap-4 bg-zinc-100 text-black px-8 md:px-10 py-4 md:py-5 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <FiArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Terug naar Home</span>
          </Link>
        </footer>

      </main>
    </div>
  )
}