import { useState, useCallback } from 'react'
import { Heart, Coffee, Sparkles, CheckCircle } from 'lucide-react'

const BUTTON_WIDTH = 160
const BUTTON_HEIGHT = 56
const PADDING = 16

const HEART_DATA = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: 20 + Math.random() * 30,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 4,
}))

export default function Proposal({ onAccept }) {
  const [noPos, setNoPos] = useState(null) // null = default position

  const handleMove = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight

    const maxX = vw - BUTTON_WIDTH - PADDING
    const maxY = vh - BUTTON_HEIGHT - PADDING

    const newX = Math.floor(Math.random() * maxX) + PADDING
    const newY = Math.floor(Math.random() * maxY) + PADDING

    setNoPos({ x: newX, y: newY })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-red-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {HEART_DATA.map((h) => (
          <Heart
            key={h.id}
            className="absolute text-pink-500/20 animate-float"
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

      {/* Main Card */}
      <div className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/20 shadow-2xl text-center animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Coffee className="w-8 h-8 text-amber-300" />
          <Sparkles className="w-7 h-7 text-yellow-300" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
          Tebrikler, testi geçtin! 🎉
        </h1>

        <p className="text-lg sm:text-xl text-pink-100 mb-2">
          Peki, benimle tatlı bir kahve randevusuna
        </p>
        <p className="text-lg sm:text-xl text-pink-100 mb-8">
          çıkmaya ne dersin? ☕💕
        </p>

        {/* Buttons container — relative so the No button can escape out of it */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
          {/* Yes Button */}
          <button
            onClick={onAccept}
            className="bg-green-500 hover:bg-green-400 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-green-500/30 transition-transform duration-200 hover:scale-110 active:scale-95 flex items-center gap-2 cursor-pointer animate-pulse min-w-[160px] justify-center"
          >
            <CheckCircle className="w-6 h-6" />
            Evet!
          </button>

          {/* No Button — inline positioned when escaped */}
          <button
            onMouseEnter={handleMove}
            onTouchStart={handleMove}
            className={`
              bg-red-500 hover:bg-red-400 text-white font-bold text-lg px-8 py-4 rounded-2xl
              shadow-lg shadow-red-500/30 transition-all duration-300
              flex items-center gap-2 cursor-pointer min-w-[160px] justify-center
              ${noPos === null ? 'relative' : 'fixed'}
            `}
            style={
              noPos
                ? {
                    top: `${noPos.y}px`,
                    left: `${noPos.x}px`,
                    zIndex: 50,
                    transition: 'top 0.3s ease, left 0.3s ease',
                  }
                : undefined
            }
          >
            Hayır
          </button>
        </div>

        {noPos && (
          <p className="mt-6 text-pink-200 text-sm italic animate-fade-in">
            Hayır butonunu yakalamaya çalış, hadi! 😜
          </p>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50%       { transform: translateY(-40px) rotate(15deg); opacity: 0.4; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
