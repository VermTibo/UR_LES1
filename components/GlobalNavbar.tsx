"use client"

import { useState } from "react"
import SidebarSlider from "@/components/SidebarSlider"
import { GiHamburgerMenu } from "react-icons/gi"
import { FiChevronDown, FiUser, FiSettings, FiEdit3 } from "react-icons/fi" // FiEdit3 voor het enquête icoon

export default function GlobalNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProjectOpen, setIsProjectOpen] = useState(false)

  // VERVANG DEZE LINK DOOR JE EIGEN ENQUETE LINK (Google Forms, Tally, etc.)
  const surveyLink = "https://forms.gle/jpwHhHgdGVYP7YZQ8"

  return (
    <>
      {/* 1. OPVALLENDE FLOATING ENQUETE KNOP (Altijd in beeld) */}
      <a
        href={surveyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 bg-[#36558F] text-white rounded-full shadow-2xl hover:scale-110 hover:bg-orange-500 transition-all duration-300 group animate-bounce-slow"
      >
        <FiEdit3 className="group-hover:rotate-12 transition-transform" size={20} />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Gebruiksvriendelijkheid ENQUETE</span>
      </a>

      {/* Hamburger menu */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-gray-700 hover:text-gray-900 rounded"
        onClick={() => setIsSidebarOpen(true)}
      >
        <GiHamburgerMenu size={24} />
      </button>

      {/* Sidebar */}
      <SidebarSlider
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false)
          setIsProjectOpen(false)
        }}
      >
        <nav className="flex flex-col h-full text-lg">
          
          <div className="grow space-y-4">
            <a href="/home" className="block hover:underline">Home</a>
            <a href="/about" className="block hover:underline">About</a>

            <div>
              <button
                onClick={() => setIsProjectOpen(!isProjectOpen)}
                className="flex items-center justify-between w-full hover:underline"
              >
                Project
                <FiChevronDown
                  className={`transition-transform ${
                    isProjectOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProjectOpen && (
                <div className="mt-3 ml-4 flex flex-col space-y-2 text-base italic">
                  <a href="/project_1" className="hover:underline">CineCity</a>
                  <a href="/project_2" className="hover:underline">De Fermette</a>
                  <a href="/project_3" className="hover:underline">Beach Volleybal</a>
                </div>
              )}
            </div>

            <a href="/contact" className="block hover:underline">Contact</a>

            {/* 2. EXTRA OPVALLENDE KNOP IN DE SIDEBAR LIJST */}
            <div className="pt-8">
              <a 
                href={surveyLink}
                target="_blank"
                className="block w-full p-6 border-2 border-dashed border-[#36558F]/30 rounded-3xl bg-[#36558F]/5 hover:bg-[#36558F]/10 transition-colors group"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-[#36558F] mb-1">User Research</p>
                <p className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">Wat vind je van de website?</p>
              </a>
            </div>
          </div>

          <div className="border-t border-zinc-100 pt-6 mt-6 flex items-center gap-4">
            <a 
              href="/admin" 
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-50 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#36558F] hover:text-white transition-all"
            >
              <FiSettings /> Admin
            </a>
            <a 
              href="/user" 
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#36558F] transition-all shadow-lg shadow-zinc-200"
            >
              <FiUser /> User
            </a>
          </div>

        </nav>
      </SidebarSlider>

      {/* Kleine animatie-toevoeging voor de bounce */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}