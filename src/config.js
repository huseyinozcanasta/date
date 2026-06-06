// ============================================
// MERKEZİ YAPILANDIRMA DOSYASI
// Tüm linkleri/URL'leri buradan yönetebilirsiniz.
// Bir şeyi değiştirmek istediğinde sadece burayı değiştir!
// ============================================

export const config = {
  // WhatsApp telefon numarası (ülke kodu ile, başında + olmadan)
  phoneNumber: '905428468162',

  // Instagram Reel URL'leri
  reels: {
    // Meme sayfasında gösterilen reel
    memeReel: 'https://www.instagram.com/reel/DV9keSdjZZy/embed',

    // Quiz arasında gösterilen reeller (sırayla)
    quizReels: [
      'https://www.instagram.com/reel/DVwDjXPjJ1E/embed',
      'https://www.instagram.com/reel/DWUKe4PhuCr/embed',
    ],
  },

  // Quiz: Hangi sorulardan sonra reel gösterilecek (0-based index)
  reelAfterQuestions: [1, 3],
}
