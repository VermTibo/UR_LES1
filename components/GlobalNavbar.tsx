"use client"

import { useState } from "react"
import SidebarSlider from "@/components/SidebarSlider"
import { GiHamburgerMenu } from "react-icons/gi"
import { FiChevronDown } from "react-icons/fi"

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
        <nav className="flex flex-col space-y-4 text-lg">

          <a href="/home" className="hover:underline">Home</a>
          <a href="/about" className="hover:underline">About</a>

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
              <div className="mt-3 ml-4 flex flex-col space-y-2 text-base">
                <a
                  href="/project_1"
                  className="hover:underline"
                >
                  CineCity
                </a>
                <a
                  href="/project_2"
                  className="hover:underline"
                >
                  Beachvolleyball
                </a>
                <a
                  href="/project_3"
                  className="hover:underline"
                >
                  Hoe zie jij mij
                </a>
              </div>
            )}
          </div>

          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/login" className="hover:underline">Login</a>

        </nav>
      </SidebarSlider>
    </>
  )
}
