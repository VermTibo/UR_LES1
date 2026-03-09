"use client"

import React, { useState, useEffect } from "react"
import { IconType } from "react-icons"
import { 
  FiHome, 
  FiInfo, 
  FiFolder, 
  FiMail, 
  FiSettings, 
  FiUser, 
  FiX, 
  FiMenu, 
  FiEdit3, 
  FiZap,
  FiArrowRight
} from "react-icons/fi"

interface MenuLinkProps {
  href: string;
  label: string;
  Icon: IconType;
  sub?: string;
  onClick: () => void;
}

export default function GlobalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const surveyLink1 = "https://forms.gle/dWmSTQMRP9bfjo9n6"
  const surveyLink2 = "https://forms.gle/Eonhz5NMeKmvw6jaA"

  if (!mounted) return null

  return (
    <>
      {/* --- 1. NAVIGATIE TRIGGER (LINKS BOVEN) --- */}
      <div className="fixed top-6 left-6 z-110">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="group flex items-center gap-3 bg-white/90 backdrop-blur-md p-1.5 pr-6 rounded-full shadow-xl hover:shadow-[#36558F]/20 transition-all duration-300 border border-zinc-200"
        >
          <div className="bg-zinc-900 text-white p-3.5 rounded-full group-hover:rotate-90 transition-transform duration-500">
            <FiMenu size={20} />
          </div>
          <span className="font-black uppercase text-xs tracking-[0.2em] text-zinc-900">Menu</span>
        </button>
      </div>

      {/* --- 2. COMPACTE ENQUETE KNOPPEN (RECHTS BENEDEN) --- */}
      <div className="fixed bottom-6 right-6 z-100 flex flex-col gap-3 pointer-events-none">
        <CompactSurveyButton 
          href={surveyLink1}
          label="Gebruiksvriendelijkheid"
          Icon={FiEdit3}
          color="bg-[#36558F]"
          glowColor="shadow-[0_0_15px_rgba(54,85,143,0.4)]"
        />
        <CompactSurveyButton 
          href={surveyLink2}
          label="Design Feedback"
          Icon={FiZap}
          color="bg-orange-500"
          glowColor="shadow-[0_0_15px_rgba(249,115,22,0.4)]"
        />
      </div>

      {/* --- 3. FULLSCREEN OVERLAY --- */}
      <div 
        className={`fixed inset-0 z-120 bg-zinc-950 transition-all duration-700 ease-in-out ${
          isMenuOpen ? "clip-path-open opacity-100" : "clip-path-closed opacity-0 pointer-events-none"
        }`}
      >
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-8 left-8 flex items-center gap-4 text-white hover:text-[#36558F] transition-colors group"
        >
          <div className="p-4 border border-white/10 rounded-full group-hover:border-[#36558F] transition-colors">
            <FiX size={28} />
          </div>
          <span className="font-black uppercase tracking-[0.2em] text-xs">Sluiten</span>
        </button>

        <div className="h-full w-full flex flex-col justify-center px-8 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 max-w-6xl">
            <div className="flex flex-col gap-2">
              <p className="text-white/10 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Navigatie</p>
              <FullScreenLink href="/home" label="Home" Icon={FiHome} sub="Start" onClick={() => setIsMenuOpen(false)} />
              <FullScreenLink href="/about" label="About" Icon={FiInfo} sub="Story" onClick={() => setIsMenuOpen(false)} />
              <FullScreenLink href="/contact" label="Contact" Icon={FiMail} sub="Mail" onClick={() => setIsMenuOpen(false)} />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[#36558F] font-black uppercase tracking-[0.4em] text-[10px] mb-4">Werk</p>
              <FullScreenLink href="/project_1" label="CineCity" Icon={FiFolder} sub="Case 01" onClick={() => setIsMenuOpen(false)} />
              <FullScreenLink href="/project_2" label="De Fermette" Icon={FiFolder} sub="Case 02" onClick={() => setIsMenuOpen(false)} />
              <FullScreenLink href="/project_3" label="Beach Volley" Icon={FiFolder} sub="Case 03" onClick={() => setIsMenuOpen(false)} />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .clip-path-closed { clip-path: circle(0% at 4rem 4rem); }
        .clip-path-open { clip-path: circle(150% at 4rem 4rem); }
      `}</style>
    </>
  )
}

/* --- COMPACT SURVEY COMPONENT --- */

function CompactSurveyButton({ href, label, Icon, color, glowColor }: { href: string; label: string; Icon: IconType; color: string; glowColor: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`pointer-events-auto group relative flex items-center gap-3 ${color} ${glowColor} text-white p-1 pr-5 rounded-2xl transition-all duration-300 hover:-translate-x-2 border border-white/10 shadow-lg`}
    >
      <div className="bg-white/20 p-3.5 rounded-xl group-hover:bg-white group-hover:text-zinc-900 transition-all">
        <Icon size={20} />
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-black uppercase tracking-widest text-white/50 leading-none mb-1">Enquête</span>
        <span className="text-xs font-bold tracking-tight whitespace-nowrap">{label}</span>
      </div>
      <FiArrowRight size={14} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </a>
  )
}

function FullScreenLink({ href, label, Icon, sub, onClick }: MenuLinkProps) {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="group flex items-center gap-6 py-3 border-b border-white/5 hover:border-[#36558F] transition-all"
    >
      <div className="text-white/10 group-hover:text-[#36558F] transition-colors">
        <Icon size={28} />
      </div>
      <div className="flex flex-col">
        <span className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter group-hover:tracking-normal transition-all">{label}</span>
        <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">{sub}</span>
      </div>
    </a>
  )
}