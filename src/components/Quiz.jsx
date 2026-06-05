import { useState } from 'react'
import { RotateCcw, CheckCircle, XCircle, Sparkles } from 'lucide-react'

// Mevcut quiz sorulari korunuyor
const questions = [
  {
    id: 1,
    question: "Benimle ilgili bilmen gereken en önemli şey nedir?",
    options: [
      "Çay bağımlısı olmam",
      "Geceleri aniden kod yazmaya başlamam",
      "Sabahları uyanamamam"
    ],
    correctAnswer: 1,
    memeText: "Yaaaa bence de çay ama yanlış cevap! Doğru cevap kod yazmak, beni hiç tanımamışsın... 💔 (Yıkıldım caps'i)"
  },
  {
    id: 2,
    question: "İlk buluşmada nereye gidiyoruz?",
    options: [
      "Yemekkk",
      "Mis gibi bir üçüncü nesil kahveci",
      "Sanayi sitesinde tostçu"
    ],
    correctAnswer: 1,
    memeText: "Sanayi tostçusu mu? Yapma yanarız... 🔥 Doğru cevap kahveciydi! Ama sanayi tostunun yeri ayrı..."
  },
  {
    id: 3,
    question: "Gece saat 3'te ne yapıyorum?",
    options: [
      "Mışıl mışıl uyuyorum",
      "Netflix'te dizi izliyorum",
      "Stack Overflow'da çözüm arıyorum"
    ],
    correctAnswer: 2,
    memeText: "Uyumak mı? O da ne? (Keşke😓) 🦉 Gece 3'te debug yapan insanlarız biz! Doğru cevap Stack Overflow'du!"
  },
  {
    id: 4,
    question: "En büyük korkum nedir?",
    options: [
      "Örümcekler",
      "Yılanlar",
      "Karanlık"
    ],
    correctAnswer: 1,
    memeText: "Örümcek mi? Hayır canım... 🕷️ Ama Yılanlar 🐍 gerçekten korkutucu! Düşünürken titriyorum 😱..."
  },
  {
    id: 5,
    question: "Hafta sonu planım nedir?",
    options: [
      "OSCE",
      "Yüzmek",
      "12 saat uyumak"
    ],
    correctAnswer: 1,
    memeText: "OSCE mi? O da ne? 🏫 Hafta sonu = 🏊‍♀️ Ama 12 saat uyumak da fena değil..."
  }
]

// Reel gosterilecek soru indekslerinden sonra (0-based)
// Soru 2 (index 1) ve Soru 4 (index 3) sonrasinda reel gosterilir
const REEL_AFTER_QUESTIONS = [1, 3]
const REEL_URLS = [
  "https://www.instagram.com/reel/DZNLlphNXCC/embed",
  "https://www.instagram.com/reel/DXHqPr3EtBS/embed",
]

// Instagram Reel embed bileseni
function ReelInterlude({ onContinue, reelUrl }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="scene-fade">
      <div className="text-center mb-6">
        <p className="text-white/60 text-sm">Mola zamanı ~ videoyu izle, sonra devam et</p>
      </div>
      <div className="w-full max-w-md mx-auto">
        <div className="glass rounded-2xl p-4 sm:p-5">
          <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-white/60 text-sm">Video yükleniyor...</p>
                </div>
              </div>
            )}
            <iframe
              src={reelUrl}
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
      <div className="text-center mt-6">
        <button
          onClick={onContinue}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          Devam et →
        </button>
      </div>
    </div>
  )
}

export default function Quiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showMeme, setShowMeme] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [answeredCorrectly, setAnsweredCorrectly] = useState([])
  // Soru gecis animasyonu icin key
  const [animKey, setAnimKey] = useState(0)
  // Reel molasi gosterilsin mi
  const [showReel, setShowReel] = useState(false)
  // Hangi reel gosterilecek (interlude sirasina gore)
  const [reelIndex, setReelIndex] = useState(0)

  const question = questions[currentQuestion]

  const advanceToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsCorrect(false)
      setAnimKey((k) => k + 1)
    } else {
      onComplete?.()
    }
  }

  const handleAnswer = (index) => {
    if (showMeme && !isCorrect) return

    setSelectedAnswer(index)

    if (index === question.correctAnswer) {
      setIsCorrect(true)
      setAnsweredCorrectly([...answeredCorrectly, question.id])

      setTimeout(() => {
        // Bu sorudan sonra reel gosterilmeli mi?
        if (REEL_AFTER_QUESTIONS.includes(currentQuestion)) {
          const idx = REEL_AFTER_QUESTIONS.indexOf(currentQuestion)
          setReelIndex(idx % REEL_URLS.length)
          setShowReel(true)
        } else {
          advanceToNext()
        }
      }, 1500)
    } else {
      setShowMeme(true)
      setIsCorrect(false)
    }
  }

  const handleReelContinue = () => {
    setShowReel(false)
    advanceToNext()
  }

  const handleRetry = () => {
    setShowMeme(false)
    setSelectedAnswer(null)
    setIsCorrect(false)
  }

  const progress = (answeredCorrectly.length / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Arka plan isiklari */}
      <div className="orb w-64 h-64 bg-purple-600 -top-16 -right-16" />
      <div className="orb w-48 h-48 bg-pink-600 bottom-10 -left-10" style={{ animationDelay: '8s' }} />

      <div className="w-full max-w-2xl relative z-10">
        {/* Baslik */}
        <div className="text-center mb-8 scene-fade">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-amber-300" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Beni Tanıyor musun?</h1>
            <Sparkles className="w-8 h-8 text-amber-300" />
          </div>
          <p className="text-white/60">Eğlenceli quiz zamanı! Bakalım beni ne kadar tanıyorsun 🎉</p>
        </div>

        {/* Ilerleme cubugu - gradient ve glow efektli */}
        <div className="mb-6 scene-fade" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span>Soru {currentQuestion + 1} / {questions.length}</span>
            <span>{answeredCorrectly.length} doğru</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #4ade80, #22d3ee)',
                boxShadow: '0 0 12px rgba(74, 222, 128, 0.5)',
              }}
            />
          </div>
        </div>

        {/* Reel molasi */}
        {showReel ? (
          <ReelInterlude onContinue={handleReelContinue} reelUrl={REEL_URLS[reelIndex]} />
        ) : (
          /* Soru karti - glassmorphism + slide-in animasyonu */
          <div
            key={animKey}
            className="glass rounded-2xl p-6 sm:p-8 shadow-xl slide-in"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center leading-relaxed">
              {question.question}
            </h2>

            {/* Secenekler */}
            <div className="space-y-4">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const showCorrect = isCorrect && isSelected
                const showWrong = showMeme && isSelected && !isCorrect

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showMeme && !isCorrect}
                    className={`
                      w-full min-h-12 px-5 py-4 rounded-xl text-left font-medium text-base
                      transition-all duration-300 transform
                      ${showCorrect
                        ? 'bg-green-600/80 border-green-400 scale-105 shadow-lg shadow-green-500/30'
                        : showWrong
                        ? 'bg-red-600/80 border-red-400 scale-[0.98] opacity-75'
                        : 'bg-white/10 hover:bg-white/20 border-white/20 hover:scale-[1.02] active:scale-[0.98]'
                      }
                      border-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
                      flex items-center justify-between gap-3
                    `}
                  >
                    <span>{option}</span>
                    {showCorrect && <CheckCircle className="w-6 h-6 text-green-200 flex-shrink-0 check-pop" />}
                    {showWrong && <XCircle className="w-6 h-6 text-red-200 flex-shrink-0" />}
                  </button>
                )
              })}
            </div>

            {/* Yanlis cevap - meme gosterimi */}
            {showMeme && !isCorrect && (
              <div className="mt-6 scene-fade">
                <div className="bg-red-900/30 border-2 border-red-500/40 rounded-xl p-5 text-center">
                  <div className="text-4xl mb-3">😂</div>
                  <p className="text-white/90 text-lg leading-relaxed mb-4">
                    {question.memeText}
                  </p>
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Tekrar Dene
                  </button>
                </div>
              </div>
            )}

            {/* Dogru cevap - basari mesaji */}
            {isCorrect && (
              <div className="mt-6 scene-fade">
                <div className="bg-green-900/30 border-2 border-green-500/40 rounded-xl p-5 text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="text-green-200 text-lg font-semibold">
                    Harika! Doğru cevap!
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    {REEL_AFTER_QUESTIONS.includes(currentQuestion)
                      ? 'Video molasına geçiliyor...'
                      : currentQuestion < questions.length - 1
                        ? 'Sonraki soruya geçiliyor...'
                        : 'Son soruyu da bildin! Tebrikler! 🏆'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
