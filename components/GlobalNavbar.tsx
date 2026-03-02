"use client"

import { useState } from "react"
import SidebarSlider from "@/components/SidebarSlider"
import { GiHamburgerMenu } from "react-icons/gi"
import { FiChevronDown, FiUser, FiSettings } from "react-icons/fi"

export default function GlobalNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProjectOpen, setIsProjectOpen] = useState(false)

  return (
    <>
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
        {/* We gebruiken h-full en flex-col om de items te verspreiden */}
        <nav className="flex flex-col h-full text-lg">
          
          {/* Bovenste sectie: Hoofdmenu */}
          <div className="grow space-y-4">
            <a href="/home" className="block hover:underline">Home</a>
            <a href="/about" className="block hover:underline">About</a>

            {/* Project with subnavigation */}
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
                  <a href="/project_3" className="hover:underline">Hoe zie jij mij</a>
                </div>
              )}
            </div>

            <a href="/contact" className="block hover:underline">Contact</a>
          </div>

          {/* Onderste sectie: Admin & User naast elkaar */}
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
    </>
  )
}