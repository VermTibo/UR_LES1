"use client"

import { useState, useRef } from "react"
import { 
  FiMail, FiLock, FiCamera, FiShield, FiLogOut, FiEdit3, 
  FiInstagram, FiCheck, FiGlobe, FiSmartphone, FiMonitor, 
  FiAlertTriangle, FiBell, FiActivity, FiChevronRight, FiMapPin, FiType, FiX
} from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"

export default function ElegantProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [lang, setLang] = useState<"nl" | "en">("nl")
  const [show2FA, setShow2FA] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showToast, setShowToast] = useState(false)
  
  // Camera States
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [user, setUser] = useState({
    name: "Jan Peters",
    email: "jan.peters@gmail.com",
    role: "Senior Photographer",
    bio: "Capturing the essence of simplicity through the lens of a fermette.",
    location: "Antwerp, BE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop", 
    notifications: { email: true, security: true }
  })
  
  const [errors, setErrors] = useState<{name?: string, email?: string}>({})

  const toggleCamera = async () => {
    if (isCameraActive) {
      stopCamera()
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          streamRef.current = stream
          setIsCameraActive(true)
        }
      } catch (err) {
        alert("Camera toegang geweigerd.")
      }
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      setIsCameraActive(false)
    }
  }

  const t = {
    nl: {
      security: "Beveiliging",
      twoFactor: "2-Staps Verificatie",
      password: "Wachtwoord",
      danger: "Gevarenzone",
      logout: "Uitloggen",
      save: "Bijwerken",
      edit: "Profiel Aanpassen",
      activity: "Activiteit",
      toast: "Wijzigingen opgeslagen",
      placeholderBio: "Vertel iets over jezelf...",
      labelRole: "Functie",
      labelLoc: "Locatie"
    },
    en: {
      security: "Security",
      twoFactor: "Two-Factor Auth",
      password: "Password",
      danger: "Danger Zone",
      logout: "Sign Out",
      save: "Save Changes",
      edit: "Edit Profile",
      activity: "Activity",
      toast: "Changes saved",
      placeholderBio: "Tell us about yourself...",
      labelRole: "Role",
      labelLoc: "Location"
    }
  }[lang]

  const validate = () => {
    let newErrors: {name?: string, email?: string} = {}
    if (user.name.length < 3) newErrors.name = "Te kort"
    if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = "Ongeldig"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validate()) {
      setIsEditing(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-orange-100 selection:text-orange-600 px-6 py-12">
      
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-10 right-10 z-200 bg-zinc-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t.toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto flex justify-between items-start mb-20">
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-0.5 bg-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 italic">User id</span>
            </div>
        </div>

        <button 
          onClick={() => setLang(lang === "nl" ? "en" : "nl")}
          className="group flex items-center gap-4 px-6 py-3 border border-zinc-100 rounded-full hover:bg-zinc-50 transition-all shadow-sm"
        >
          <FiGlobe className="text-zinc-400 group-hover:rotate-45 transition-transform duration-500" />
          <span className="text-[9px] font-black uppercase tracking-widest">{lang}</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT COLUMN: AVATAR & EDITABLE INFO */}
        <div className="lg:col-span-5 space-y-12">
          <div className="relative group inline-block">
            <div className="w-72 h-96 rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] bg-zinc-900 relative transform rotate-1">
                <AnimatePresence mode="wait">
                  {!isCameraActive ? (
                    <motion.img 
                      key="avatar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      src={user.avatar} className="w-full h-full object-cover" 
                    />
                  ) : (
                    <motion.video 
                      key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" 
                    />
                  )}
                </AnimatePresence>
            </div>
            <button 
                onClick={toggleCamera}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center border border-zinc-100 hover:scale-110 transition-transform z-10"
            >
                {isCameraActive ? <FiX className="text-red-500" size={24} /> : <FiCamera className="text-zinc-400" size={24} />}
            </button>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
                {/* NAME EDIT */}
                <div className="space-y-1">
                    {isEditing ? (
                        <input 
                            value={user.name} 
                            onChange={(e) => setUser({...user, name: e.target.value})}
                            className="text-5xl font-light tracking-tight italic border-b border-zinc-200 outline-none w-full bg-transparent pb-2 focus:border-orange-500 transition-colors"
                        />
                    ) : (
                        <h2 className="text-6xl font-light tracking-tight italic">{user.name}</h2>
                    )}
                </div>

                {/* ROLE & LOCATION EDIT */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1"><FiType size={10}/> {t.labelRole}</span>
                        {isEditing ? (
                            <input 
                                value={user.role} 
                                onChange={(e) => setUser({...user, role: e.target.value})}
                                className="text-sm font-bold border-b border-zinc-100 outline-none w-full bg-transparent py-1"
                            />
                        ) : (
                            <p className="text-sm font-bold tracking-wide">{user.role}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1"><FiMapPin size={10}/> {t.labelLoc}</span>
                        {isEditing ? (
                            <input 
                                value={user.location} 
                                onChange={(e) => setUser({...user, location: e.target.value})}
                                className="text-sm font-bold border-b border-zinc-100 outline-none w-full bg-transparent py-1"
                            />
                        ) : (
                            <p className="text-sm font-bold tracking-wide">{user.location}</p>
                        )}
                    </div>
                </div>

                {/* BIO EDIT */}
                <div className="space-y-2 pt-2">
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 italic">biography</span>
                    {isEditing ? (
                        <textarea 
                            value={user.bio} 
                            onChange={(e) => setUser({...user, bio: e.target.value})}
                            className="text-sm text-zinc-600 font-medium leading-relaxed border border-zinc-100 rounded-2xl p-4 w-full bg-zinc-50 outline-none focus:border-orange-200 transition-all h-24 resize-none"
                            placeholder={t.placeholderBio}
                        />
                    ) : (
                        <p className="text-sm text-zinc-500 font-medium leading-relaxed max-w-sm lowercase italic">
                            "{user.bio}"
                        </p>
                    )}
                </div>
            </div>
            
            <button 
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className={`px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all ${
                    isEditing ? 'bg-orange-500 text-white shadow-2xl shadow-orange-200 scale-105' : 'bg-zinc-900 text-white hover:bg-orange-500 shadow-xl'
                }`}
            >
                {isEditing ? t.save : t.edit}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: SECURITY & SETTINGS */}
        <div className="lg:col-span-7 space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* EMAIL SECTION (Always editable via profile update) */}
            <div className="p-10 bg-zinc-50 rounded-[3rem] space-y-8 border border-zinc-100 transition-all duration-500">
                <div className="flex justify-between items-start">
                    <FiMail className="text-3xl text-orange-500/20" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">contact</span>
                </div>
                <div className="space-y-1">
                    {isEditing ? (
                        <input 
                            value={user.email} 
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            className="w-full bg-transparent border-b border-zinc-200 py-1 outline-none text-sm font-bold"
                        />
                    ) : (
                        <p className="text-sm font-bold">{user.email}</p>
                    )}
                    <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Primary Email</p>
                </div>
            </div>

            <div className="p-10 bg-zinc-900 rounded-[3rem] text-white space-y-8 shadow-2xl relative overflow-hidden group">
                <FiSmartphone className="text-3xl text-white/20 relative z-10" />
                <div className="relative z-10">
                    <h4 className="text-xl font-light italic mb-2 tracking-tight">{t.twoFactor}</h4>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-6">Device Link</p>
                    <button onClick={() => setShow2FA(true)} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] hover:text-orange-500 transition-colors">
                        Setup <FiChevronRight />
                    </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000" />
            </div>
          </div>

          {/* SOCIAL FEED - UPDATED COLOR */}
          <a href="https://www.instagram.com/verm_photographic/" target="_blank" className="block relative bg-white border border-zinc-100 p-10 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all group overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-tr from-[#f9ce34]/5 via-[#ee2a7b]/5 to-[#6228d7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500 mb-2">curated works</p>
                        <h4 className="text-2xl font-light italic lowercase">@verm_photographic</h4>
                    </div>
                    <div className="w-16 h-16 rounded-3xl bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-lg transform group-hover:rotate-12 transition-transform">
                        <FiInstagram size={28} />
                    </div>
                </div>
          </a>

          <div className="pt-16 flex flex-col items-center gap-8 border-t border-zinc-100">
             <div className="flex gap-12">
                <button className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300 hover:text-red-500 transition-colors flex items-center gap-2">
                    <FiAlertTriangle size={14} /> {t.danger}
                </button>
                <button className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300 hover:text-zinc-900 transition-colors flex items-center gap-2">
                    <FiLogOut size={14} /> {t.logout}
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* 2FA MODAL */}
      <AnimatePresence>
        {show2FA && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-300 bg-zinc-950/20 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setShow2FA(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white p-16 rounded-[4rem] max-w-sm w-full text-center space-y-10 shadow-2xl border border-zinc-100"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-4xl font-light tracking-tight italic">Security Sync.</h3>
              <div className="w-56 h-56 bg-white mx-auto p-6 rounded-[3rem] border border-zinc-100 shadow-inner flex items-center justify-center">
                 <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Fermette" alt="QR" className="w-full h-full opacity-80 mix-blend-multiply" />
              </div>
              <button onClick={() => setShow2FA(false)} className="w-full py-5 bg-zinc-900 text-white rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-orange-500 transition-all shadow-xl">
                confirm device
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}