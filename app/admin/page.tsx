"use client"

import { useState } from "react"
import { FiX, FiEdit2, FiCheck, FiImage, FiTrash2, FiPlus } from "react-icons/fi"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function AboutPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedImg, setSelectedImg] = useState<number | null>(null)

  // Initial Data
  const [pageData, setPageData] = useState({
    title: "De Fermette",
    subtitle: "Fotoreportage",
    description: "Recent heb ik een uitgebreide shoot verzorgd voor De Fermette. De focus lag op het vangen van de unieke, landelijke ambiance in combinatie met hun hoogwaardige gastronomie.",
    tagline: "Sfeer, Gezelligheid, lekker eten",
    gridItems: [
      { id: 1, size: "md:col-span-2 md:row-span-2", img: "/projects/fermette/img1.jpg" },
      { id: 2, size: "md:col-span-1 md:row-span-1", img: "/projects/fermette/img2.jpg" },
      { id: 3, size: "md:col-span-1 md:row-span-2", img: "/projects/fermette/img3.jpg" },
      { id: 4, size: "md:col-span-2 md:row-span-1", img: "/projects/fermette/img4.jpg" },
      { id: 5, size: "md:col-span-3 md:row-span-1", img: "/projects/fermette/img5.jpg" },
    ]
  })

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPageData({ ...pageData, [e.target.name]: e.target.value })
  }

  const updateGridItem = (id: number, field: string, value: string) => {
    setPageData({
      ...pageData,
      gridItems: pageData.gridItems.map(item => item.id === id ? { ...item, [field]: value } : item)
    })
  }

  const addItem = () => {
    const newId = pageData.gridItems.length > 0 ? Math.max(...pageData.gridItems.map(i => i.id)) + 1 : 1
    setPageData({
      ...pageData,
      gridItems: [...pageData.gridItems, { id: newId, size: "md:col-span-1 md:row-span-1", img: "" }]
    })
  }

  const removeItem = (id: number) => {
    setPageData({ ...pageData, gridItems: pageData.gridItems.filter(i => i.id !== id) })
  }

  const currentItem = pageData.gridItems.find(item => item.id === selectedImg)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-20 text-white min-h-screen relative">
      
      {/* EDIT TOGGLE */}
      <button 
        onClick={() => setIsEditing(!isEditing)}
        className="fixed bottom-8 right-8 z-110 bg-white text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 font-bold"
      >
        {isEditing ? <><FiCheck /> Klaar</> : <><FiEdit2 /> Edit Mode</>}
      </button>

      {/* EDITOR FORM */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="bg-zinc-900 border border-white/10 p-6 rounded-[2rem] space-y-6 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="title" value={pageData.title} onChange={handleChange} className="bg-zinc-800 p-3 rounded-xl border border-zinc-700 w-full" placeholder="Titel" />
              <input name="subtitle" value={pageData.subtitle} onChange={handleChange} className="bg-zinc-800 p-3 rounded-xl border border-zinc-700 w-full" placeholder="Subtitel" />
              <textarea name="description" value={pageData.description} onChange={handleChange} className="bg-zinc-800 p-3 rounded-xl border border-zinc-700 w-full md:col-span-2" rows={3} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold uppercase text-zinc-500">Grid Layout & Images</h3>
                <button onClick={addItem} className="text-xs bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700 flex items-center gap-1 hover:bg-zinc-700"><FiPlus /> Item</button>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {pageData.gridItems.map((item) => (
                  <div key={item.id} className="flex flex-wrap md:flex-nowrap gap-2 bg-zinc-800/50 p-2 rounded-xl items-center border border-zinc-700/30">
                    <input value={item.img} onChange={(e) => updateGridItem(item.id, "img", e.target.value)} placeholder="Image URL" className="flex-1 bg-zinc-900 p-2 rounded-lg text-xs" />
                    <select value={item.size} onChange={(e) => updateGridItem(item.id, "size", e.target.value)} className="bg-zinc-900 p-2 rounded-lg text-xs border border-zinc-700">
                      <option value="md:col-span-1 md:row-span-1">1x1</option>
                      <option value="md:col-span-2 md:row-span-1">2x1 (Breed)</option>
                      <option value="md:col-span-1 md:row-span-2">1x2 (Hoog)</option>
                      <option value="md:col-span-2 md:row-span-2">2x2 (Groot)</option>
                      <option value="md:col-span-3 md:row-span-1">3x1 (Volledig)</option>
                    </select>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg"><FiTrash2 /></button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREVIEW: HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-orange-500 to-red-500 uppercase">
            {pageData.title}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <h2 className="text-xl font-bold tracking-[0.2em] text-white uppercase">{pageData.subtitle}</h2>
            <div className="flex items-center gap-2 text-sm font-light tracking-widest text-zinc-500 italic">
              <span className="h-px w-8 bg-zinc-700 hidden md:block"></span>
              <p>{pageData.tagline}</p>
            </div>
          </div>
        </div>
        <div className="text-zinc-400 leading-relaxed text-lg">
          <p>{pageData.description}</p>
        </div>
      </div>

      {/* PREVIEW: BENTO GRID */}
      {/* grid-flow-dense is de key voor het fixen van verdwijnende items! */}
      <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-dense gap-4 auto-rows-[250px]">
        {pageData.gridItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImg(item.id)}
            className={`group relative overflow-hidden rounded-[2.5rem] cursor-pointer border border-white/5 transition-all duration-500 hover:border-orange-500/50 ${item.size} bg-zinc-900`}
          >
            {item.img ? (
              <img src={item.img} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 text-zinc-500"><FiImage size={24} /></div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
               <p className="text-orange-400 text-sm font-bold tracking-widest uppercase">Bekijk Detail</p>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImg !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 flex items-center justify-center backdrop-blur-xl bg-black/80 p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><FiX size={40} /></button>
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
               className="relative w-full h-full max-w-5xl flex items-center justify-center"
               onClick={(e) => e.stopPropagation()}
            >
               {currentItem && <img src={currentItem.img} alt="Full size" className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="flex justify-center pt-8 pb-12">
        
      </footer>
    </div>
  )
}