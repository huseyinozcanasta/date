import { useState } from 'react'
import { Rocket, Heart, Zap, Play, Coffee, CheckCircle } from 'lucide-react'
import Quiz from './components/Quiz'
import Proposal from './components/Proposal'
import Scheduler from './components/Scheduler'

function App() {
  const [count, setCount] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [scheduled, setScheduled] = useState(false)

  const handleQuizComplete = () => {
    setQuizCompleted(true)
    setShowQuiz(false)
  }

  const handleStartQuiz = () => {
    setShowQuiz(true)
    setQuizCompleted(false)
    setAccepted(false)
    setScheduled(false)
  }

  const handleAccept = () => {
    setAccepted(true)
  }

  const handleScheduled = () => {
    setScheduled(true)
  }

  // Quiz is active
  if (showQuiz && !quizCompleted) {
    return <Quiz onComplete={handleQuizComplete} />
  }

  // Proposal screen after quiz
  if (quizCompleted && !accepted) {
    return <Proposal onAccept={handleAccept} />
  }

  // Scheduler screen after accepting proposal
  if (accepted && !scheduled) {
    return <Scheduler onComplete={handleScheduled} />
  }

  // Final success screen after WhatsApp redirect
  if (scheduled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-800 via-rose-800 to-red-800 text-white flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="text-center max-w-2xl">
          <div className="relative inline-block mb-6">
            <CheckCircle className="w-28 h-28 text-green-400 mx-auto animate-bounce" />
            <Heart className="w-10 h-10 text-red-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Plan Gönderildi!
          </h1>
          <p className="text-2xl text-pink-100 mb-4">
            Sabırsızlıkla bekliyorum! ❤️
          </p>
          <p className="text-lg text-pink-200 mb-8">
            WhatsApp'tan mesajın gönderildi. Kahve zamanı yaklaşıyor... ☕
          </p>
          <div className="flex items-center justify-center gap-3 text-5xl mb-8">
            <Coffee /> <Heart className="text-red-400 animate-pulse" /> <Coffee />
          </div>
          <button
            onClick={() => {
              setQuizCompleted(false)
              setAccepted(false)
              setScheduled(false)
            }}
            className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/30"
          >
            Baştan Başla
          </button>
        </div>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out; }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Rocket className="w-10 h-10 text-purple-400" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Vite + React
          </h1>
          <Zap className="w-10 h-10 text-yellow-400" />
        </div>

        <p className="text-gray-300 text-lg mb-8">
          Modern, fast, and lightweight React project with Tailwind CSS & Lucide Icons
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Heart className="w-5 h-5" />
            Count is {count}
          </button>

          <button
            onClick={handleStartQuiz}
            className="px-6 py-3 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5" />
            Quiz'e Başla
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-400">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="font-semibold text-white mb-1">Vite</p>
            <p>Lightning-fast HMR</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="font-semibold text-white mb-1">Tailwind CSS</p>
            <p>Utility-first styling</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="font-semibold text-white mb-1">Lucide Icons</p>
            <p>Beautiful SVG icons</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
