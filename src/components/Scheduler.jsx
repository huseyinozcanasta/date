import { useState } from 'react'
import { Calendar, Clock, Send, Coffee, Sparkles } from 'lucide-react'

// Burayi kendi telefon numaranizla degistiriniz (ulke kodu ile)
const MY_PHONE_NUMBER = '905428468162'

export default function Scheduler({ onComplete }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Tarihi Turkce formatina cevir
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
      `Sabırsızlıkla bekliyorum! 💕`

    const encodedText = encodeURIComponent(message)
    const url = `https://wa.me/${MY_PHONE_NUMBER}?text=${encodedText}`

    window.open(url, '_blank')
    onComplete?.()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-rose-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Arka plan yavas hareket eden isiklar */}
      <div className="orb w-72 h-72 bg-amber-500 -top-20 -right-20" />
      <div className="orb w-56 h-56 bg-rose-500 bottom-10 -left-16" style={{ animationDelay: '6s' }} />

      {/* Ana kart - premium glassmorphism */}
      <div className="w-full max-w-md glass rounded-3xl p-8 shadow-2xl scene-fade relative z-10">
        {/* Baslik */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Coffee className="w-8 h-8 text-amber-300" />
            <Sparkles className="w-7 h-7 text-yellow-300" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Son Adım!</h1>
          <p className="text-white/60">
            Kahvemizi ne zaman içelim? Tarih ve saat seç, WhatsApp'tan haber ver ☕
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Tarih */}
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
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all cursor-pointer [color-scheme:dark]"
            />
          </div>

          {/* Saat */}
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
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all cursor-pointer [color-scheme:dark]"
            />
          </div>

          {/* Gonder butonu */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-5 h-5" />
            WhatsApp'tan Gönder
          </button>
        </form>

        <p className="text-center text-xs text-white/40 mt-5">
          Gönder butonuna bastığında WhatsApp açılacak ve mesaj otomatik doldurulacak 💬
        </p>
      </div>
    </div>
  )
}
