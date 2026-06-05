import { useState, useRef } from 'react'
import { Heart, Coffee, Sparkles, CheckCircle } from 'lucide-react'

// Kenar boslugu (kacma hesabi icin)
const PADDING = 16

// Ikna seviyeleri - her kacista bir sonraki seviye
const PERSUASION_LEVELS = [0, 15, 34, 52, 78, 99]

// Hayir butonunun her kacista gosterdigi mesajlar (eglenceli, baskici degil)
const NO_MESSAGES = [
  'Hayır 😅',
  'Emin misin? 😅',
  'Belki tekrar düşünürüz.',
  'Bu buton biraz utangaç.',
  'Tamam tamam, zorlamıyorum.',
  'Son şansın... 😏',
]

// Arka planda suzen kalpler (sabit pozisyonlar, render'da hesaplanir)
const HEART_DATA = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: 20 + (i * 7) % 30,
  left: (i * 23) % 100,
  top: (i * 37) % 100,
  delay: (i * 0.7) % 5,
  duration: 4 + (i * 1.3) % 4,
}))

export default function Proposal({ onAccept }) {
  const [noPos, setNoPos] = useState(null) // null = varsayilan pozisyon
  const [escapeCount, setEscapeCount] = useState(0) // Kacis sayaci
  const noBtnRef = useRef(null) // Hayir butonu ref (gercek boyut olcmek icin)
  // Ikna seviyesi (mevcut escapeCount'a gore)
  const persuasionIndex = Math.min(escapeCount, PERSUASION_LEVELS.length - 1)
  const persuasionPercent = PERSUASION_LEVELS[persuasionIndex]
  // Hayir butonundaki mevcut mesaj
  const currentNoMessage = NO_MESSAGES[Math.min(escapeCount, NO_MESSAGES.length - 1)]

  // Hayir butonunu rastgele pozisyona tasi (gercek boyutlarla)
  const handleMove = () => {
    const vw = window.innerWidth
    const vh = window.innerHeight

    // Butonun gercek boyutlarini olc
    const btn = noBtnRef.current
    const btnW = btn ? btn.offsetWidth : 160
    const btnH = btn ? btn.offsetHeight : 56

    const maxX = vw - btnW - PADDING
    const maxY = vh - btnH - PADDING

    const newX = Math.floor(Math.random() * Math.max(maxX, PADDING)) + PADDING
    const newY = Math.floor(Math.random() * Math.max(maxY, PADDING)) + PADDING

    setNoPos({ x: newX, y: newY })
    // Her kacista ikna sayacini artir
    setEscapeCount((c) => c + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-red-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Arka plan suzen kalpler */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {HEART_DATA.map((h) => (
          <Heart
            key={h.id}
            className="absolute text-pink-500/20 float-slow"
            style={{
              width: `${h.size}px`,
              height: `${h.size}px`,
              left: `${h.left}%`,
              top: `${h.top}%`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Ikna Seviyesi Gostergesi - ustte sabit */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 w-full max-w-xs px-4 z-20 scene-fade">
        <div className="glass rounded-2xl px-4 py-3 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-white/80 mb-1.5">
            İkna Seviyesi
          </p>
          {/* Ilerleme cubugu */}
          <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${persuasionPercent}%`,
                background: `linear-gradient(90deg, #f472b6, #fb923c)`,
                boxShadow: '0 0 10px rgba(244, 114, 182, 0.5)',
              }}
            />
          </div>
          <p className="text-xs text-white/60 mt-1">%{persuasionPercent}</p>
        </div>
      </div>

      {/* Ana Kart */}
      <div className="relative z-10 max-w-lg w-full glass rounded-3xl p-8 sm:p-10 shadow-2xl text-center scene-fade mt-16 sm:mt-20">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Coffee className="w-8 h-8 text-amber-300" />
          <Sparkles className="w-7 h-7 text-yellow-300" />
        </div>

        {/* Ana soru */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight tracking-tight">
          Bir kahve içmeye ne dersin? ☕
        </h1>

        <p className="text-base sm:text-lg text-white/60 mb-8">
          Bu noktaya kadar geldiysen teklifimi değerlendirmeye hak kazandın.
        </p>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
          {/* Evet Butonu - glow efektli */}
          <button
            onClick={onAccept}
            className="bg-green-500 hover:bg-green-400 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-green-500/30 transition-transform duration-200 hover:scale-110 active:scale-95 flex items-center gap-2 cursor-pointer glow-btn min-w-[160px] justify-center"
          >
            <CheckCircle className="w-6 h-6" />
            Evet ❤️
          </button>

          {/* Hayir Butonu - her kacisti pozisyon ve mesaj degistirir */}
          <button
            ref={noBtnRef}
            onMouseEnter={handleMove}
            onTouchStart={handleMove}
            onClick={handleMove}
            className={`
              bg-red-500/80 hover:bg-red-400 text-white font-bold text-base px-8 py-4 rounded-2xl
              shadow-lg shadow-red-500/20 transition-all duration-300
              flex items-center gap-2 cursor-pointer min-w-[160px] justify-center
              ${noPos === null ? 'relative' : 'fixed'}
            `}
            style={
              noPos
                ? {
                    top: `${noPos.y}px`,
                    left: `${noPos.x}px`,
                    zIndex: 50,
                    transition: 'top 0.3s ease, left 0.3s ease, transform 0.2s ease',
                  }
                : undefined
            }
          >
            {currentNoMessage}
          </button>
        </div>

        {/* Kacis sonrasi ipucu mesaji */}
        {noPos && escapeCount > 0 && (
          <p className="mt-6 text-white/50 text-sm italic scene-fade">
            {escapeCount <= 2
              ? 'Bu buton biraz çekingen...'
              : escapeCount <= 4
              ? 'Yakalamaya çalış, hadi! 😜'
              : 'İstatistikler evet diyor. 📊'}
          </p>
        )}
      </div>
    </div>
  )
}
