"use client"

import React, { useState } from "react"
import { FiX, FiEdit2, FiCheck, FiImage, FiTrash2, FiPlus, FiSettings, FiArrowRight, FiType, FiLayers, FiTarget } from "react-icons/fi"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Types voor stabiliteit
type GridItem = {
  id: number;
  size: string;
  img: string;
  label: string;
}

type PageData = {
  title: string;
  subtitle: string;
  description: string;
  tagline: string;
  style: "modern" | "editorial";
  gridItems: GridItem[];
}

export default function ProjectTemplateEditor() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedImg, setSelectedImg] = useState<number | null>(null)

  // VERVANG DEZE LINKS DOOR JE EIGEN ENQUETE LINKS
  const surveyLinkGeneral = "#" 
  const surveyLinkLayout = "#"

  const [pageData, setPageData] = useState<PageData>({
    title: "Project Titel",
    subtitle: "Categorie / Branche",
    description: "Schrijf hier een meeslepende introductie over je project. Pas de stijl aan in de editor om het karakter van de pagina te veranderen.",
    tagline: "Kort, krachtig, inspirerend resultaat",
    style: "modern",
    gridItems: [
      { id: 1, size: "md:col-span-2 md:row-span-2", img: "https://placehold.co/1200x1200/f4f4f5/18181b?text=Main+Feature", label: "Hero Shot" },
      { id: 2, size: "md:col-span-1 md:row-span-1", img: "https://placehold.co/600x600/f4f4f5/18181b?text=Detail+1", label: "Detail" },
      { id: 3, size: "md:col-span-1 md:row-span-2", img: "https://placehold.co/600x1200/f4f4f5/18181b?text=Vertical+View", label: "Portrait" },
      { id: 4, size: "md:col-span-2 md:row-span-1", img: "https://placehold.co/1200x600/f4f4f5/18181b?text=Wide+Angle", label: "Landscape" },
    ]
  })

  const isAlt = pageData.style === "editorial";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setPageData({ ...pageData, [e.target.name]: e.target.value })
  }

  const updateGridItem = (id: number, field: keyof GridItem, value: string) => {
    setPageData({
      ...pageData,
      gridItems: pageData.gridItems.map(item => item.id === id ? { ...item, [field]: value } : item)
    })
  }

  const addItem = () => {
    const newId = pageData.gridItems.length > 0 ? Math.max(...pageData.gridItems.map(i => i.id)) + 1 : 1
    setPageData({
      ...pageData,
      gridItems: [...pageData.gridItems, { id: newId, size: "md:col-span-1 md:row-span-1", img: "", label: "Nieuw Item" }]
    })
  }

  const removeItem = (id: number) => {
    setPageData({ ...pageData, gridItems: pageData.gridItems.filter(i => i.id !== id) })
  }

  const currentItem = pageData.gridItems.find(item => item.id === selectedImg)

  return (
    <div className={`w-full min-h-screen transition-all duration-1000 bg-white text-zinc-900 ${isAlt ? 'font-serif' : 'font-sans'}`}>
      
      {/* 1. LAYOUT ENQUETE KNOP (Desktop Sidebar Tab) */}
      <motion.div initial={{ x: 100 }} animate={{ x: 0 }} className="fixed right-0 top-1/2 -translate-y-1/2 z-120 hidden lg:flex items-center">
        <a href={surveyLinkLayout} target="_blank" className={`flex items-center gap-4 py-8 px-4 transition-all duration-500 group border-l-4 shadow-2xl ${isAlt ? 'bg-orange-600 text-white border-white' : 'bg-white text-[#36558F] border-[#36558F] rounded-l-[2rem]'}`} style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] rotate-180">Beoordeel Layout</span>
          <FiTarget className="rotate-90 group-hover:scale-125 transition-transform" size={20} />
        </a>
      </motion.div>

      {/* 2. INFINITE MARQUEE */}
      <div className="pt-20 md:pt-24 overflow-hidden whitespace-nowrap border-b border-zinc-100 pb-4">
        <motion.div className="flex gap-10 md:gap-20 items-center" animate={{ x: [0, -1000] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
          {[...Array(10)].map((_, i) => (
            <span key={i} className={`text-[10px] md:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.6em] opacity-20 ${isAlt ? 'text-orange-600' : 'text-zinc-400'}`}>
              {pageData.title} • {pageData.subtitle} • {pageData.tagline} •
            </span>
          ))}
        </motion.div>
      </div>

      {/* 3. EDITOR TOGGLE (Responsive Position) */}
      <div className="fixed bottom-6 right-6 md:bottom-auto md:top-8 md:right-8 z-150">
        <button onClick={() => setIsEditing(!isEditing)} className={`flex items-center gap-3 px-5 py-3 md:px-6 md:py-4 rounded-full shadow-2xl transition-all font-black uppercase text-[9px] md:text-[10px] tracking-widest ${isEditing ? 'bg-orange-500 text-white' : 'bg-zinc-950 text-white hover:scale-105'}`}>
          {isEditing ? <><FiCheck /> Opslaan</> : <><FiSettings /> Editor</>}
        </button>
      </div>

      {/* 4. SIDEBAR EDITOR (Mobile Optimized) */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }} 
            className="fixed inset-y-0 right-0 w-full md:w-96 bg-white z-140 md:m-6 md:rounded-[2.5rem] shadow-2xl flex flex-col border-l md:border border-zinc-200"
          >
            <div className="p-6 md:p-8 border-b border-zinc-100 flex justify-between items-center bg-white sticky top-0 z-10 md:rounded-t-[2.5rem]">
              <h2 className="font-black uppercase text-[10px] tracking-widest">Design Studio</h2>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><FiX size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 pb-32 md:pb-20">
              <div className="space-y-4">
                <label className="text-[9px] font-bold uppercase text-zinc-400 tracking-widest flex items-center gap-2"><FiLayers /> Visuele Stijl</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setPageData({...pageData, style: 'modern'})} className={`py-3 rounded-xl text-[10px] font-bold uppercase border transition-all ${!isAlt ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-transparent text-zinc-400 border-zinc-200'}`}>Modern</button>
                  <button onClick={() => setPageData({...pageData, style: 'editorial'})} className={`py-3 rounded-xl text-[10px] font-bold uppercase border transition-all ${isAlt ? 'bg-orange-500 text-white border-orange-500' : 'bg-transparent text-zinc-400 border-zinc-200'}`}>Editorial</button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[9px] font-bold uppercase text-zinc-400 tracking-widest flex items-center gap-2"><FiType /> Content</label>
                <input name="title" value={pageData.title} onChange={handleChange} className="w-full bg-zinc-50 p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-100" placeholder="Project Titel" />
                <textarea name="description" value={pageData.description} onChange={handleChange} className="w-full bg-zinc-50 p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-100 h-24 resize-none" placeholder="Beschrijving" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] font-bold uppercase text-zinc-400 tracking-widest flex items-center gap-2"><FiImage /> Assets</label>
                  <button onClick={addItem} className="bg-zinc-900 text-white p-2 rounded-lg hover:bg-orange-500 transition-colors"><FiPlus size={14}/></button>
                </div>
                <div className="space-y-3">
                  {pageData.gridItems.map((item) => (
                    <div key={item.id} className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 space-y-3">
                      <input value={item.img} onChange={(e) => updateGridItem(item.id, "img", e.target.value)} placeholder="Afbeelding URL" className="w-full bg-white p-2 rounded-lg text-[10px] border-none outline-none ring-1 ring-zinc-100" />
                      <div className="flex gap-2">
                        <select value={item.size} onChange={(e) => updateGridItem(item.id, "size", e.target.value)} className="flex-1 bg-white p-2 rounded-lg text-[10px] outline-none ring-1 ring-zinc-100">
                          <option value="md:col-span-1 md:row-span-1">1x1</option>
                          <option value="md:col-span-2 md:row-span-1">2x1 Wide</option>
                          <option value="md:col-span-1 md:row-span-2">1x2 Tall</option>
                          <option value="md:col-span-2 md:row-span-2">2x2 Large</option>
                        </select>
                        <button onClick={() => removeItem(item.id)} className="p-2 text-zinc-300 hover:text-red-500 transition-colors"><FiTrash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. MAIN PREVIEW */}
      <main className={`transition-all duration-700 ${isEditing ? 'lg:pr-100' : ''}`}>
        <section className="max-w-6xl mx-auto px-6 md:px-8 pt-12 md:pt-16 pb-8 md:pb-12">
          <div className="mb-6">
            <motion.h1 layout className={`text-[14vw] md:text-[8.5vw] leading-[0.85] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-r ${isAlt ? 'from-orange-500 to-rose-500 italic' : 'from-blue-600 to-cyan-600'}`}>
              {pageData.title}
            </motion.h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-t border-zinc-100 pt-6 md:pt-8">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-300">{pageData.subtitle}</span>
              <div className={`h-1 w-16 md:w-20 transition-all duration-700 ${isAlt ? 'bg-orange-500' : 'bg-blue-600'}`} />
            </div>
            <p className={`max-w-md text-sm md:text-base leading-relaxed text-zinc-500 ${isAlt ? 'font-light italic' : 'font-medium'}`}>
              {pageData.description}
            </p>
          </div>
        </section>

        {/* BENTO GRID */}
        <section className="max-w-6xl mx-auto px-6 md:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-dense gap-4 md:gap-8 auto-rows-[250px] md:auto-rows-[320px]">
            {pageData.gridItems.map((item) => (
              <motion.div key={item.id} layout onClick={() => setSelectedImg(item.id)} className={`group relative cursor-pointer overflow-hidden border border-zinc-100 transition-all duration-700 ${item.size} ${isAlt ? 'rounded-none border-zinc-300 p-1 md:p-2 bg-zinc-50' : 'rounded-[2rem] md:rounded-[3rem] shadow-sm bg-white'}`}>
                {isAlt && (
                  <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-300" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-orange-300" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-orange-300" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-300" />
                  </div>
                )}
                <div className="w-full h-full overflow-hidden relative">
                  {item.img ? (
                    <img src={item.img} alt="" className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${isAlt ? 'grayscale brightness-90 group-hover:grayscale-0' : ''}`} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-200 bg-zinc-50"><FiImage size={32} /></div>
                  )}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest shadow-xl backdrop-blur-sm ${isAlt ? 'bg-orange-500 text-white' : 'bg-white rounded-full'}`}>Bekijk</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MOBILE ENQUETE BUTTON */}
        <div className="lg:hidden px-6 mb-12">
          <a href={surveyLinkLayout} target="_blank" className={`flex items-center justify-center gap-4 w-full py-4 px-6 font-black uppercase tracking-widest text-[9px] shadow-xl transition-all ${isAlt ? 'bg-orange-600 text-white' : 'bg-[#36558F] text-white rounded-full'}`}>
            <FiTarget size={16} /> Beoordeel deze Layout
          </a>
        </div>

        <footer className="max-w-6xl mx-auto px-6 md:px-8 py-16 border-t border-zinc-100 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/project" className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2 group hover:text-orange-500 transition-colors">
            <FiArrowRight className="rotate-180 group-hover:-translate-x-2 transition-transform" /> Projecten
          </Link>
          <p className="text-[9px] text-zinc-300 uppercase tracking-widest">Configuratie Modus v1.1</p>
        </footer>
      </main>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImg !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-200 flex items-center justify-center bg-white/95 backdrop-blur-2xl p-4 md:p-6" onClick={() => setSelectedImg(null)}>
            <button className="absolute top-6 right-6 md:top-10 md:right-10 text-black hover:rotate-90 transition-transform"><FiX size={32} /></button>
            <motion.img initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} src={currentItem?.img} className={`max-h-[70vh] md:max-h-[80vh] w-auto shadow-2xl ${isAlt ? 'rounded-none p-1 bg-orange-500' : 'rounded-[1.5rem] md:rounded-[2rem]'}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}