import { useState } from 'react'

const REEL_URL = "https://www.instagram.com/reel/DW3-oVhxrB8/embed"

export default function MemeGallery({ onComplete }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Arka plan isiklari */}
      <div className="orb w-72 h-72 bg-indigo-500 -top-20 -left-20" />
      <div className="orb w-56 h-56 bg-fuchsia-500 bottom-10 right-10" style={{ animationDelay: '7s' }} />

      {/* Baslik */}
      <div className="text-center mb-8 sm:mb-10 scene-fade relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">Biraz Gerçekçi Olalım</h1>
        <p className="text-white/60">Bu video %100 gerçektir. Kaynak: Ben.</p>
      </div>

      {/* Instagram Reel Embed */}
      <div className="relative z-10 w-full max-w-md mx-auto scene-fade" style={{ animationDelay: '0.2s' }}>
        <div className="glass rounded-2xl p-4 sm:p-5">
          <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-white/60 text-sm">Video yükleniyor...</p>
                </div>
              </div>
            )}
            <iframe
              src={REEL_URL}
              className="absolute inset-0 w-full h-full rounded-xl"
              frameBorder="0"
              scrolling="no"
              allowTransparency="true"
              allowFullScreen={true}
              onLoad={() => setLoaded(true)}
              style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
            />
          </div>
        </div>
      </div>

      {/* Devam et butonu */}
      <button
        onClick={onComplete}
        className="mt-8 sm:mt-10 px-8 py-4 glass rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer hover:bg-white/15 relative z-10 scene-fade"
        style={{ animationDelay: '0.8s' }}
      >
        Devam et →
      </button>
    </div>
  )
}
