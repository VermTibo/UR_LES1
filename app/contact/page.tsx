"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen text-black selection:bg-[#36558F] selection:text-white font-sans">
      <main className="max-w-6xl mx-auto px-6 py-24 md:py-40">
        
        <div className="mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#36558F] font-bold tracking-[0.4em] uppercase text-[10px] mb-4"
          >
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-[9rem] text-[#36558F] tracking-tighter leading-[0.8] uppercase"
          >
            Laten We <br /> Praten.
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">
            <p className="text-2xl text-zinc-500 leading-tight font-medium">
              Heb je een project in gedachten?
            </p>
            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#36558F]">Email</h3>
              <a href="mailto:hallo@jouwmail.com" className="text-2xl font-bold hover:text-[#36558F] transition-colors">
                tibovermeersch0609@gmail.com
              </a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-zinc-50 p-8 md:p-12 rounded-[3rem] border border-zinc-100"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-4">Naam</label>
                  <input type="text" placeholder="Je naam" className="w-full bg-white border-none rounded-full px-8 py-5 outline-none focus:ring-2 focus:ring-[#36558F]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-4">Email</label>
                  <input type="email" placeholder="Email adres" className="w-full bg-white border-none rounded-full px-8 py-5 outline-none focus:ring-2 focus:ring-[#36558F]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-4">Bericht</label>
                <textarea rows={4} placeholder="Wat kan ik voor je doen?" className="w-full bg-white border-none rounded-[2rem] px-8 py-6 outline-none focus:ring-2 focus:ring-[#36558F] resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white font-black uppercase text-xs tracking-[0.3em] py-6 rounded-full hover:bg-[#36558F] transition-all flex items-center justify-center gap-4">
                Verstuur Bericht
              </button>
            </form>
          </motion.div>
        </div>

        <footer className="flex justify-center pt-24">
          <Link href="/home" className="group flex items-center gap-4 bg-zinc-100 text-black px-10 py-5 rounded-full hover:bg-black hover:text-white transition-all">
            <span className="text-xs font-black uppercase tracking-[0.3em]">Terug</span>
          </Link>
        </footer>

      </main>
    </div>
  )
}