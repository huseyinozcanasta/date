import { useState } from 'react'
import { Calendar, Clock, Send, Coffee, Sparkles } from 'lucide-react'

// Burayı kendi telefon numaranızla değiştirin (ülke kodu ile)
const MY_PHONE_NUMBER = '905428468162'

export default function Scheduler({ onComplete }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Tarihi Türkçe formatına çevir
    const dateObj = new Date(`${date}T${time}`)
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
    ]

    const dayName = days[dateObj.getDay()]
    const monthName = months[dateObj.getMonth()]
    const dayNum = dateObj.getDate()
    const hours = String(dateObj.getHours()).padStart(2, '0')
    const minutes = String(dateObj.getMinutes()).padStart(2, '0')

    const message =
      `Merhaba! ☕ Kahve randevumuz için tarih belirledim:\n\n` +
      `📅 ${dayNum} ${monthName} ${dateObj.getFullYear()}, ${dayName}\n` +
      `🕐 Saat ${hours}:${minutes}\n\n` +
      `Seni sabırsızlıkla bekliyorum, çok heyecanlıyım! 💕`

    const encodedText = encodeURIComponent(message)
    const url = `https://wa.me/${MY_PHONE_NUMBER}?text=${encodedText}`

    window.open(url, '_blank')

    // Ana bileşene bildir
    onComplete?.()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-rose-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Coffee className="w-8 h-8 text-amber-300" />
            <Sparkles className="w-7 h-7 text-yellow-300" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Randevu Planla</h1>
          <p className="text-amber-100">
            Kahvemizi ne zaman içelim? Tarih ve saat seç, WhatsApp'tan haber ver! ☕
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="flex items-center gap-2 text-sm font-semibold text-amber-200 mb-2"
            >
              <Calendar className="w-4 h-4" />
              Tarih
            </label>
            <input
              type="date"
              id="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all cursor-pointer [color-scheme:dark]"
            />
          </div>

          {/* Time */}
          <div>
            <label
              htmlFor="time"
              className="flex items-center gap-2 text-sm font-semibold text-amber-200 mb-2"
            >
              <Clock className="w-4 h-4" />
              Saat
            </label>
            <input
              type="time"
              id="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all cursor-pointer [color-scheme:dark]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-5 h-5" />
            WhatsApp'tan Gönder
          </button>
        </form>

        <p className="text-center text-xs text-amber-200/60 mt-5">
          Gönder butonuna bastığında WhatsApp açılacak ve mesaj otomatik doldurulacak 💬
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
      `}</style>
    </div>
  )
}
