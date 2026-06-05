import { useState, useRef, useMemo } from 'react'

// Ozgun Turkce mizah kartlari - telifli icerik yok
const MEME_CARDS = [
  {
    id: 1,
    emoji: '😎',
    title: 'Mesajı atmadan önce',
    before: '"Rahatım yerinde, cool takılıyorum."',
    after: 'Mesajı attıktan sonra: 📱👀 Her bildirimde kalp krizi.',
  },
  {
    id: 2,
    emoji: '👁️',
    title: 'Mesaj görüldü...',
    before: '"Kader yükleniyor..."',
    after: 'Yazıyor... Yazmıyor... Yazıyor... Yazmıyor... Ben: 💀',
  },
  {
    id: 3,
    emoji: '🟢',
    title: 'Online oldu',
    before: '"Aa online oldu, kesin bana yazacak!"',
    after: '5 dakika sonra: Hâlâ yazmıyor. Hayaller: 🫠',
  },
  {
    id: 4,
    emoji: '🫣',
    title: 'Arkadaşlarım:',
    before: '"At gitsin, ne bekliyorsun?"',
    after: 'Ben: "Ya reddederse?"\nArkadaşlarım: 🤦‍♂️',
  },
  {
    id: 5,
    emoji: '🧠',
    title: 'Bu siteyi yaparken',
    before: '"Basit bir web sitesi olur herhalde."',
    after: '3 saat sonra: Neden hâlâ CSS debug ediyorum?! 😭',
  },
]

// Diziyi rastgele karistir (sadece ilk render'da)
function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function MemeGallery({ onComplete }) {
  // Kartlari rastgele sirala (ilk render'da sabit)
  const shuffledCards = useMemo(() => shuffleArray(MEME_CARDS), [])

  // Hover edilmis kart (after metnini goster)
  const [flippedId, setFlippedId] = useState(null)

  // 3D tilt efekti icin ref
  const cardRefs = useRef({})

  // Mouse hareketine gore 3D tilt hesapla
  const handleMouseMove = (e, cardId) => {
    const card = cardRefs.current[cardId]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
  }

  // Mouse cikinca tilt sifirla
  const handleMouseLeave = (cardId) => {
    const card = cardRefs.current[cardId]
    if (card) {
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
    setFlippedId(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Arka plan isiklari */}
      <div className="orb w-72 h-72 bg-indigo-500 -top-20 -left-20" />
      <div className="orb w-56 h-56 bg-fuchsia-500 bottom-10 right-10" style={{ animationDelay: '7s' }} />

      {/* Baslik */}
      <div className="text-center mb-8 sm:mb-10 scene-fade relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">Biraz Gerçekçi Olalım</h1>
        <p className="text-white/60">Bu kartlar %100 gerçektir. Kaynak: Ben.</p>
      </div>

      {/* Kart grid'i */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl w-full relative z-10">
        {shuffledCards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[card.id] = el)}
            onMouseMove={(e) => handleMouseMove(e, card.id)}
            onMouseEnter={() => setFlippedId(card.id)}
            onMouseLeave={() => handleMouseLeave(card.id)}
            onClick={() => setFlippedId(flippedId === card.id ? null : card.id)}
            className="glass rounded-2xl p-5 cursor-pointer select-none scene-fade transition-shadow duration-300 hover:shadow-xl hover:shadow-purple-500/20"
            style={{
              animationDelay: `${i * 0.12}s`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
            }}
          >
            {/* Emoji */}
            <div className="text-4xl mb-4">{card.emoji}</div>

            {/* Baslik */}
            <h3 className="text-base font-semibold mb-2">{card.title}</h3>

            {/* Once/sonra metinleri */}
            <p className="text-white/70 text-sm leading-relaxed mb-2">{card.before}</p>

            {/* After metni - hover/tiklayinca gorunur */}
            <p
              className={`text-sm leading-relaxed text-fuchsia-200 transition-all duration-500 ${
                flippedId === card.id
                  ? 'opacity-100 max-h-40 mt-1'
                  : 'opacity-0 max-h-0 overflow-hidden'
              }`}
            >
              {card.after}
            </p>
          </div>
        ))}
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
