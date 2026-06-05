import { useState, useMemo } from 'react'
import { Heart, Coffee, CheckCircle } from 'lucide-react'
import Story from './components/Story'
import MemeGallery from './components/MemeGallery'
import Quiz from './components/Quiz'
import Proposal from './components/Proposal'
import Scheduler from './components/Scheduler'

// ============================================
// RASTGELE EĞLENCELİ MESAJLAR (30+)
// Her sayfa yenilemesinde farkli bir mesaj gosterilir
// Eglenceli ton, romantik degil
// ============================================
const FUN_MESSAGES = [
  'Bu site %99 gereksiz efor içerir.',
  'Kodlar çalıştı. Şimdi sıra kahvede.',
  'Normalde bu kadar uğraşmam. Sen özelsin... değil mi?',
  'Bu sayfayı kapatırsan butonlar üzülüyor.',
  'Yapay zeka bile bu kadar efor sarf etmezdi.',
  'Bu siteyi yaparken 47 kez "son kez" dedim.',
  'CSS debug etmek > ilk mesaj atmak.',
  'Kahve içmeyi sever misin? Bu site bunun için var.',
  'Bu sayfa responsive. Tıpkı benim duygularım gibi.',
  'Buraya kadar okuduysan zaten kazandın.',
  'Deploy ederken elim titredi, umarım beğenirsin.',
  'Bu sitede cookie yok. Sadece umut var.',
  'Git push --force yaptım, geri dönüş yok.',
  '404: Red cevabı bulunamadı.',
  'Bu kahve daveti değil, UX case study.',
  'npm install confidence --save',
  'Bu sitenin backend\'i: cesaret.',
  'Kahve = sıvı motivasyon.',
  'Evet butonu daha büyük. Bu bir işaret.',
  'Hayır butonu kaçıyor çünkü utanıyor.',
  'Bu sayfayı görmek bile bir ilk adım.',
  'İstatistiklere göre %87 kişi evet diyor. Geriye kalan %13 hâlâ arıyor.',
  'Bu site mobilde de çalışır. Aşk her cihazda güzel.',
  'console.log("umarım gülümsedin")',
  'Bu projenin scrum master\'ı: kalbim.',
  'Kahve siparişi: bir büyük cesaret lütfen.',
  'Sprint review: site hazır, kahve bekleniyor.',
  'Bu site open-source değil. Sadece sana özel.',
  'Bug bounty programı: bir gülümseme.',
  'Bu mesajlar rastgele. Ama site değil.',
  'Test coverage: %100. Özgüven: %47.',
  'Evet dersen bu site emekliye ayrılır. Misyon tamamlanır.',
]


// Confetti parcasi olusturucu (saf CSS animasyonu)
function ConfettiPieces() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        // Deterministik pozisyonlar (render sirasinda sabit)
        left: (i * 2.5) % 100,
        delay: (i * 0.15) % 3,
        duration: 2 + (i * 0.3) % 3,
        color: ['#f472b6', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#fb923c'][i % 6],
        size: 6 + (i % 6),
      })),
    []
  )

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            borderRadius: p.id % 3 === 0 ? '50%' : '2px',
          }}
        />
      ))}
    </>
  )
}

// Yüksen kalpler (kutlama ekraninda)
function RisingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: 10 + (i * 9) % 80,
        delay: (i * 0.5) % 4,
        size: 16 + (i * 3) % 20,
      })),
    []
  )

  return (
    <>
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className="absolute text-pink-400/60"
          style={{
            left: `${h.left}%`,
            bottom: '-20px',
            width: `${h.size}px`,
            height: `${h.size}px`,
            animation: `heart-rise 3s ease-out ${h.delay}s infinite`,
          }}
        />
      ))}
    </>
  )
}

// ============================================
// ANA BİLEŞEN - sahne orkestratörü
// ============================================
function App() {
  // Mevcut sahne: opening | story | memes | quiz | proposal | scheduler | celebration
  const [scene, setScene] = useState('opening')

  // Rastgele eglenceli mesaj (her yenilemede farkli)
  // useState initializer ile hesaplanir (render sirasinda saf)
  const [randomMessage] = useState(
    () => FUN_MESSAGES[Math.floor(Math.random() * FUN_MESSAGES.length)]
  )

  // Sahne gecisleri
  const goScene = (nextScene) => setScene(nextScene)

  // ============================================
  // AÇILIŞ EKRANI
  // ============================================
  if (scene === 'opening') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Yavas hareket eden gradient orblar */}
        <div className="orb w-80 h-80 bg-purple-600 top-1/4 left-1/4" />
        <div className="orb w-60 h-60 bg-blue-600 bottom-1/4 right-1/4" style={{ animationDelay: '5s' }} />
        <div className="orb w-40 h-40 bg-pink-600 top-1/2 right-1/3" style={{ animationDelay: '10s' }} />

        {/* Ana kart - glassmorphism */}
        <div className="relative z-10 max-w-lg w-full glass rounded-3xl p-8 sm:p-10 text-center scene-fade">
          {/* Kucuk kalp animasyonlari */}
          <div className="absolute -top-3 -right-3">
            <Heart className="w-6 h-6 text-pink-400/40 float-slow" />
          </div>
          <div className="absolute -bottom-2 -left-2">
            <Heart className="w-5 h-5 text-pink-400/30 float-slow" style={{ animationDelay: '2s' }} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight tracking-tight">
            Normal insanlar mesaj atıyor.
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-2">
            Ben ise küçük bir web sitesi yaptım.
          </p>
          <p className="text-xs sm:text-sm text-white/50 mb-8">
            Bu biraz gereksiz miydi? Evet.
          </p>

          <button
            onClick={() => goScene('story')}
            className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-purple-500/30 attention-pulse"
          >
            Başlayalım →
          </button>
        </div>

        {/* Rastgele eglenceli mesaj - alt kısımda toast */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 glass rounded-xl px-5 py-3 text-sm text-white/50 max-w-sm text-center"
          style={{ animation: 'toast-in 0.6s ease-out 1s both' }}
        >
          {randomMessage}
        </div>
      </div>
    )
  }

  // ============================================
  // HİKAYE SAHNESİ
  // ============================================
  if (scene === 'story') {
    return <Story onComplete={() => goScene('memes')} />
  }

  // ============================================
  // MEME BÖLÜMÜ
  // ============================================
  if (scene === 'memes') {
    return <MemeGallery onComplete={() => goScene('quiz')} />
  }

  // ============================================
  // QUIZ
  // ============================================
  if (scene === 'quiz') {
    return <Quiz onComplete={() => goScene('proposal')} />
  }

  // ============================================
  // TEKLİF EKRANI
  // ============================================
  if (scene === 'proposal') {
    return <Proposal onAccept={() => goScene('scheduler')} />
  }

  // ============================================
  // TAKVİM / PLANLAMA
  // ============================================
  if (scene === 'scheduler') {
    return <Scheduler onComplete={() => goScene('celebration')} />
  }

  // ============================================
  // KUTLAMA EKRANI
  // ============================================
  if (scene === 'celebration') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-800 to-red-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Confetti */}
        <ConfettiPieces />

        {/* Yukselen kalpler */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <RisingHearts />
        </div>

        {/* Arka plan isiklari */}
        <div className="orb w-72 h-72 bg-pink-500 top-1/3 left-1/4" />
        <div className="orb w-56 h-56 bg-purple-500 bottom-1/4 right-1/4" style={{ animationDelay: '4s' }} />

        {/* Ana icerik - blur gecis efekti */}
        <div className="relative z-10 text-center max-w-2xl scene-fade" style={{ animation: 'blur-in 1s ease-out' }}>
          <div className="relative inline-block mb-6">
            <CheckCircle className="w-28 h-28 text-green-400 mx-auto" />
            <Heart className="w-10 h-10 text-red-400 absolute -top-2 -right-2 float-slow" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight tracking-tight">
            Harika!
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 mb-3">
            Görev başarıyla tamamlandı. 🎉
          </p>
          <p className="text-base sm:text-lg text-white/60 mb-8">
            Şimdi bu web sitesini yaparken harcadığım süreyi kahve içerken anlatabilirim. 😄
          </p>

          <div className="flex items-center justify-center gap-4 text-5xl mb-8">
            <Coffee /> <Heart className="text-red-400 float-slow" /> <Coffee />
          </div>

          <button
            onClick={() => setScene('opening')}
            className="px-8 py-4 glass hover:bg-white/15 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Baştan Başla
          </button>
        </div>
      </div>
    )
  }

  // Fallback (olmamali)
  return null
}

export default App
