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
      "Dünyanın en lüks restoranı",
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
    memeText: "Uyumak mı? O da ne? 🦉 Gece 3'te debug yapan insanlarız biz! Doğru cevap Stack Overflow'du!"
  },
  {
    id: 4,
    question: "En büyük korkum nedir?",
    options: [
      "Örümcekler",
      "Production'da bug çıkması",
      "Karanlık"
    ],
    correctAnswer: 1,
    memeText: "Örümcek mi? Hayır canım... 🕷️ Ama production bug'ı gerçekten korkutucu! Deploy butonuna basarken elim titriyor..."
  },
  {
    id: 5,
    question: "Hafta sonu planım nedir?",
    options: [
      "Dışarı çıkıp sosyalleşmek",
      "Yeni bir framework öğrenmek",
      "12 saat uyumak"
    ],
    correctAnswer: 1,
    memeText: "Sosyalleşmek mi? O da ne? 🤖 Hafta sonu = yeni technology öğrenme günü! Ama 12 saat uyumak da fena değil..."
  }
]

export default function Quiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showMeme, setShowMeme] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [answeredCorrectly, setAnsweredCorrectly] = useState([])
  // Soru gecis animasyonu icin key
  const [animKey, setAnimKey] = useState(0)

  const question = questions[currentQuestion]

  const handleAnswer = (index) => {
    if (showMeme && !isCorrect) return

    setSelectedAnswer(index)

    if (index === question.correctAnswer) {
      setIsCorrect(true)
      setAnsweredCorrectly([...answeredCorrectly, question.id])

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
          setIsCorrect(false)
          // Animasyon key'ini degistir (yeni slide-in tetikler)
          setAnimKey((k) => k + 1)
        } else {
          onComplete?.()
        }
      }, 1500)
    } else {
      setShowMeme(true)
      setIsCorrect(false)
    }
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

        {/* Soru karti - glassmorphism + slide-in animasyonu */}
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
                  {currentQuestion < questions.length - 1
                    ? 'Sonraki soruya geçiliyor...'
                    : 'Son soruyu da bildin! Tebrikler! 🏆'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
