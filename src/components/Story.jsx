import { useState, useEffect } from 'react'

// Her sahne iki parcali metin icerir: once ana cumle, sonra alt metin
// Otomatik gecis 3 saniye sonra, tiklayarak da atlanabilir
const scenes = [
  {
    id: 1,
    main: 'Eğer bu sayfayı görüyorsan...',
    sub: '...merak ettin demektir. Güzel.',
  },
  {
    id: 2,
    main: 'Sana bir soru sormak istiyorum.',
    sub: 'Ama hemen değil.',
  },
  {
    id: 3,
    main: 'Önce beni biraz tanımanı istiyorum.',
    sub: 'Küçük bir test var.',
  },
  {
    id: 4,
    main: 'Yine de devam ettiğine göre...',
    sub: 'umut var. 😏',
  },
]

export default function Story({ onComplete }) {
  const [currentScene, setCurrentScene] = useState(0)
  // Alt metin gorunur mu (sinematik gecis icin)
  const [showSub, setShowSub] = useState(false)
  // Sahne gecisi animasyonu
  const [fading, setFading] = useState(false)

  // Sonraki sahneye gec veya tamamla
  const goNext = () => {
    if (currentScene < scenes.length - 1) {
      setFading(true)
      setTimeout(() => {
        setCurrentScene((c) => c + 1)
        setShowSub(false)
        setFading(false)
      }, 400)
    } else {
      onComplete?.()
    }
  }

  // Otomatik ilerleme: 1.2s sonra alt metin, 3.5s sonra sonraki sahne
  useEffect(() => {
    const subTimer = setTimeout(() => setShowSub(true), 1200)
    const sceneTimer = setTimeout(() => goNext(), 3500)

    return () => {
      clearTimeout(subTimer)
      clearTimeout(sceneTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScene])

  // Tiklayarak atla
  const handleClick = () => {
    if (!showSub) {
      // Alt metin henuz gorunmediyse goster
      setShowSub(true)
    } else {
      goNext()
    }
  }

  const scene = scenes[currentScene]

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col items-center justify-center p-6 cursor-pointer select-none relative overflow-hidden"
      onClick={handleClick}
    >
      {/* Arka plan yavas hareket eden isiklar */}
      <div className="orb w-64 h-64 bg-purple-500 top-1/4 left-1/4" />
      <div className="orb w-48 h-48 bg-pink-500 bottom-1/4 right-1/4" style={{ animationDelay: '5s' }} />
      <div className="orb w-32 h-32 bg-blue-500 top-1/2 right-1/3" style={{ animationDelay: '10s' }} />

      {/* Ilerleme gostergesi */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
        {scenes.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              i <= currentScene ? 'bg-white scale-100' : 'bg-white/30 scale-75'
            }`}
          />
        ))}
      </div>

      {/* Ana icerik */}
      <div
        className={`text-center max-w-xl transition-all duration-500 ${
          fading ? 'opacity-0 translate-y-4 blur-sm' : 'opacity-100 translate-y-0 blur-0'
        }`}
      >
        {/* Ana metin */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 tracking-tight scene-fade">
          {scene.main}
        </h1>

        {/* Alt metin - gecikmeli gorunur */}
        <p
          className={`text-lg sm:text-xl text-white/70 transition-all duration-700 ${
            showSub ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {scene.sub}
        </p>
      </div>

      {/* Alt ipucu */}
      <p className="absolute bottom-8 text-white/45 text-sm animate-pulse">
        {currentScene < scenes.length - 1 ? 'devam etmek için tıkla' : ''}
      </p>
    </div>
  )
}
