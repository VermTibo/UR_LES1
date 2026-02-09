"use client"

import React from "react"
import Link from "next/link"
import Typewriter from 'typewriter-effect'

export default function HomePage() {
  return (
    <main className="min-h-screen  text-white overflow-hidden relative">
      
      {/* 1. npm install typewriter */}
      {/* 2. HERO SECTIE */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        {/* NAAM MET TYPEWRITER */}
        <div className="mb-8">
          <h1 className="text-7xl md:text-[11rem] font-[900] tracking-tighter leading-[0.85] text-black-600 uppercase">
            <span className="text-red-600 block">Tibo</span>
            <span className="text-red-600 block min-h-[1em]"> 
              <Typewriter
                options={{
                  strings: ['Vermeersch', 'Vormgever', 'Fotograaf', 'Designer'],
                  autoStart: true,
                  loop: true,
                  cursor: '_',
                  delay: 80,
                  deleteSpeed: 40,
                }}
              />
            </span>
          </h1>
        </div>

        {/* BESCHRIJVING */}
        <p className="max-w-xl text-zinc-500 text-lg md:text-xl font-light leading-relaxed mb-12 italic  pl-6 mx-auto">
          Grafisch Vormgever met  <br className="hidden md:block" />
          een passie voor fotografie
        </p>

      </section>


    </main>
  )
}