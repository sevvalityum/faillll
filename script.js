// script.js

// Sayfa yüklendiğinde çalışan fonksiyonlar
window.addEventListener("DOMContentLoaded", () => {
  renderAlphabetList();
  setupThisWeekSteps();
  setupFoodSteps();
  renderCalendar();
});

// 1. A-Z Uzaktan Aktiviteler
const alphabetList = {
  A: "Art exchange: Birbirinize çizimler veya dijital sanatlar gönderin.",
  B: "Book club: Aynı kitabı okuyup tartışın.",
  C: "Chess Date: Sonucu belli bir satranç maçı yapalım sevgilim.",
  D: "Deep questions: Anlamlı sorularla birbirinizi daha iyi tanıyın.",
  E: "Emoji story: Sadece emoji kullanarak hikaye anlatın ve tahmin edin.",
  F: "Film night: Aynı filmi eş zamanlı izleyin.",
  G: "GeoGuessr: Online dünya haritasında yer tahmini oyunu oynayın.",
  H: "Handwritten letters: El yazısı mektuplar gönderin.",
  I: "Inside jokes: Kendi aranızda özel espriler yapın.",
  J: "Journaling: Ortak günlük tutup duygularınızı yazın.",
  K: "Karaoke: Online karaoke yapıp şarkı söyleyin.",
  L: "Learn together: Yeni bir şey öğrenin (dil, hobi vb.).",
  M: "Make a mixtape: Birbiriniz için özel çalma listeleri hazırlayın.",
  N: "Night sky: Yıldızları izleyip fotoğraf paylaşın.",
  O: "Origami: Birlikte origami yapın ve sonucu gösterin.",
  P: "Playlist swap: Favori şarkılarınızı değiş tokuş edin.",
  Q: "Quizzes: Eğlenceli testler yapıp sonuçları karşılaştırın.",
  R: "Random acts of kindness: Küçük sürprizler yapın, hediyeler gönderin.",
  S: "Stargazing: Sanal olarak birlikte yıldızları inceleyin.",
  T: "Tarot card reading: Birbirinize tarot falı bakın.",
  U: "Online Uno date: İnternetten Uno veya başka kart oyunları oynayın.",
  V: "Virtual tours: Sanal müzeler veya şehir turları yapın.",
  W: "Workout: Beraber online egzersiz yapın.",
  X: "XOXO letters: Sevgili dolu mesajlar, resimler paylaşın.",
  Y: "YouTube binge: Aynı anda YouTube videoları izleyin.",
  Z: "Zen time: Birlikte meditasyon veya rahatlama yapın."
};

function renderAlphabetList() {
  const list = document.querySelector(".alphabet-list");
  Object.entries(alphabetList).forEach(([letter, activity]) => {
    const li = document.createElement("li");
    li.textContent = `${letter} – ${activity}`;
    list.appendChild(li);
  });
}

// 2. Bu Hafta Ne Yapıyoruz (Gövde hazırlanıyor, detaylar sonra eklenebilir)
function setupThisWeekSteps() {
  const container = document.getElementById("interactive-steps");
  container.innerHTML = `<p>Yakında burada sorularla buluşma planlayıcısı olacak 🎯</p>`;
}

// 3. Ne Yesek
function setupFoodSteps() {
  const container = document.getElementById("food-steps");
  container.innerHTML = `<p>Yemek seçim alanı hazırlanıyor 🍕🍲</p>`;
}

// 4. Takvim (placeholder)
function renderCalendar() {
  const cal = document.getElementById("calendar-container");
  cal.innerHTML = `<p>Takvim yakında buraya gelecek 🗓️</p>`;
}
