import { useState } from 'react'
import { RotateCcw, CheckCircle, XCircle, Sparkles } from 'lucide-react'

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

  const question = questions[currentQuestion]

  const handleAnswer = (index) => {
    if (showMeme && !isCorrect) return // Locked on wrong answer

    setSelectedAnswer(index)
    
    if (index === question.correctAnswer) {
      setIsCorrect(true)
      setAnsweredCorrectly([...answeredCorrectly, question.id])
      
      // Move to next question after delay
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
          setIsCorrect(false)
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl font-bold">Beni Tanıyor musun?</h1>
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-gray-300">Eğlenceli quiz zamanı! 🎉</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Soru {currentQuestion + 1} / {questions.length}</span>
            <span>{answeredCorrectly.length} doğru</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700 shadow-2xl animate-fade-in">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
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
                    w-full min-h-12 px-5 py-4 rounded-xl text-left font-medium
                    transition-all duration-200 transform
                    ${showCorrect 
                      ? 'bg-green-600 border-green-400 scale-105' 
                      : showWrong
                      ? 'bg-red-600 border-red-400 scale-95 opacity-75'
                      : 'bg-gray-700/50 hover:bg-gray-700 border-gray-600 hover:scale-102 active:scale-98'
                    }
                    border-2 cursor-pointer disabled:cursor-not-allowed
                    flex items-center justify-between gap-3
                  `}
                >
                  <span>{option}</span>
                  {showCorrect && <CheckCircle className="w-6 h-6 text-green-200 flex-shrink-0" />}
                  {showWrong && <XCircle className="w-6 h-6 text-red-200 flex-shrink-0" />}
                </button>
              )
            })}
          </div>

          {/* Meme Display */}
          {showMeme && !isCorrect && (
            <div className="mt-6 animate-fade-in">
              <div className="bg-red-900/40 border-2 border-red-500/50 rounded-xl p-5 text-center">
                <div className="text-4xl mb-3">😂</div>
                <p className="text-gray-200 text-lg leading-relaxed mb-4">
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

          {/* Success Message */}
          {isCorrect && (
            <div className="mt-6 animate-fade-in">
              <div className="bg-green-900/40 border-2 border-green-500/50 rounded-xl p-5 text-center">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-green-200 text-lg font-semibold">
                  Harika! Doğru cevap!
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  {currentQuestion < questions.length - 1 
                    ? 'Sonraki soruya geçiliyor...' 
                    : 'Son soruyu da bildin! Tebrikler! 🏆'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}
