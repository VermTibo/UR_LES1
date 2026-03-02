"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ProjectsOverview() {
  const projects = [
    {
      id: "project_1", // Komt overeen met de mapnaam in 'app'
      title: "CineCity Filmfestival",
      category: "Visuele Identiteit",
      image: "/projects/cinecity/img1.jpg", 
    },
    {
      id: "project_2", 
      title: "De Fermette",
      category: "Fotografie",
      image: "/projects/fermette/img2.jpg", 
    },
    {
      id: "project_3", 
      title: "Hoe zie jij mij?",
      category: "Grafisch Ontwerp",
      image: "/projects/hoeziejijmij/thumb.jpg",
    }
  ];

  return (
    <main className="min-h-screen bg-white text-black py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl text-[#36558F] uppercase tracking-tighter">Projecten</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <motion.div key={project.id} whileHover={{ y: -5 }}>
              
              {/* DE FIX: We linken direct naar de mapnaam in 'app' */}
              <Link href={`/${project.id}`} className="group cursor-pointer">
                
                <div className="relative aspect-16/10 overflow-hidden rounded-3xl bg-zinc-100 mb-6 border border-zinc-100">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-[#36558F] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm uppercase tracking-widest">{project.category}</p>
                  </div>
                  <div className="text-2xl group-hover:translate-x-2 transition-transform">→</div>
                </div>

              </Link>

            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}