document.addEventListener("DOMContentLoaded", () => {
  // *** GENEL AYARLAR & DEĞİŞKENLER ***

  const menuButtons = {
    uzaktanBtn: document.getElementById("uzaktanBtn"),
    haftaBtn: document.getElementById("haftaBtn"),
    yesekBtn: document.getElementById("yesekBtn"),
    takvimBtn: document.getElementById("takvimBtn"),
    dogumGunuBtn: document.getElementById("dogumGunuBtn"),
  };

  const contentSections = {
    uzaktanContent: document.getElementById("uzaktanContent"),
    haftaContent: document.getElementById("haftaContent"),
    yesekContent: document.getElementById("yesekContent"),
    takvimContent: document.getElementById("takvimContent"),
  };

  // Fade efekt fonksiyonu
  function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = "block";
    let op = 0;
    const timer = setInterval(() => {
      if (op >= 1) clearInterval(timer);
      element.style.opacity = op;
      op += 0.1;
    }, 30);
  }
  function fadeOut(element) {
    let op = 1;
    const timer = setInterval(() => {
      if (op <= 0) {
        clearInterval(timer);
        element.style.display = "none";
      }
      element.style.opacity = op;
      op -= 0.1;
    }, 30);
  }
  // Tüm içerikleri kapat
  function hideAllContents() {
    for (const key in contentSections) {
      fadeOut(contentSections[key]);
    }
  }
  // Menü butonlarına tıklandığında içerik gösterimi
  menuButtons.uzaktanBtn.addEventListener("click", () => {
    hideAllContents();
    setTimeout(() => fadeIn(contentSections.uzaktanContent), 350);
  });
  menuButtons.haftaBtn.addEventListener("click", () => {
    hideAllContents();
    setTimeout(() => fadeIn(contentSections.haftaContent), 350);
  });
  menuButtons.yesekBtn.addEventListener("click", () => {
    hideAllContents();
    setTimeout(() => fadeIn(contentSections.yesekContent), 350);
  });
  menuButtons.takvimBtn.addEventListener("click", () => {
    hideAllContents();
    setTimeout(() => fadeIn(contentSections.takvimContent), 350);
  });
  // Doğum Günü butonu yeni sekmede açma
  menuButtons.dogumGunuBtn.addEventListener("click", () => {
    window.open("https://sherryuser.github.io/cake-blow/", "_blank");
  });

  // *** TAKVİM İŞLEMLERİ ***

  const calendarContainer = document.getElementById("calendarContainer");
  const monthYearLabel = document.getElementById("monthYearLabel");
  const prevMonthBtn = document.getElementById("prevMonthBtn");
  const nextMonthBtn = document.getElementById("nextMonthBtn");
  const addEventBtn = document.getElementById("addEventBtn");
  const eventModal = document.getElementById("eventModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const eventDateLabel = document.getElementById("eventDateLabel");
  const eventTextInput = document.getElementById("eventText");
  const saveEventBtn = document.getElementById("saveEventBtn");

  // Başlangıç tarihleri
  let currentYear = 2025;
  let currentMonth = 7; // Ağustos, JS ayları 0 tabanlı, Ağustos=7
  const minDate = new Date(2025, 7, 1); // 1 Ağustos 2025
  const maxDate = new Date(2026, 9, 31); // 31 Ekim 2026

  // Müsaitlik ve özel tarihler verisi (color kodları dahil)
  let availability = {
    // Genel müsaitlik
    utku: [], // Günlük müsaitlik tarihleri
    sevval: [],

    // Özel etkinlikler
    utkuEvents: [
      { start: "2025-10-20", end: "2025-10-24", label: "Atış Haftası", color: "orange" },
      { start: "2025-11-03", end: "2025-11-07", label: "Vize Sınavı", color: "red" },
      { start: "2025-12-29", end: "2026-01-02", label: "Finaller", color: "red" },
      { start: "2026-01-12", end: "2026-01-23", label: "İzin", color: "green" },
      { start: "2026-03-09", end: "2026-03-13", label: "Bahar Dönemi Vizeleri", color: "red" },
      { start: "2026-03-30", end: "2026-04-03", label: "Atış", color: "orange" },
      { start: "2026-05-11", end: "2026-05-22", label: "Bahar Finalleri", color: "red" },
      { start: "2026-06-01", end: "2026-06-22", label: "İzin", color: "green" },
    ],
    sevvalEvents: [
      { start: "2025-11-17", end: "2025-11-22", label: "Vize", color: "#d94242" },
      { start: "2026-01-12", end: "2026-01-22", label: "Finaller", color: "#c53030" },
      { start: "2026-04-13", end: "2026-04-18", label: "Vize Bahar", color: "#b12424" },
      { start: "2026-06-15", end: "2026-06-25", label: "Final Haftası", color: "#a31a1a" },
    ],

    events: {}, // Günlük etkinlikler { "2025-08-15": ["Etkinlik 1", "Etkinlik 2"], ... }
  };

  // Takvim çizimi
  function drawCalendar(year, month) {
    calendarContainer.innerHTML = ""; // Temizle
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startWeekDay = firstDay.getDay(); // Pazar=0, Pazartesi=1 ...
    const weekdays = ["Pzt", "Salı", "Çarş", "Per", "Cum", "Cmt", "Paz"];

    // Ay ve Yıl yazısı
    const monthNames = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
    monthYearLabel.textContent = `${monthNames[month]} ${year}`;

    // Gün başlıkları
    const headerRow = document.createElement("div");
    headerRow.className = "calendar-row calendar-header";
    weekdays.forEach((day) => {
      const dayEl = document.createElement("div");
      dayEl.className = "calendar-cell header-cell";
      dayEl.textContent = day;
      headerRow.appendChild(dayEl);
    });
    calendarContainer.appendChild(headerRow);

    // Boş hücreler (Pazar 0 olduğundan Pzt 1 için 1 hücre boş)
    // Burada haftanın başlangıcı Pzt olduğundan düzeltiyoruz
    let blankStart = (startWeekDay + 6) % 7; 

    // Toplam hücre sayısı hesapla (tam hafta sayısı)
    const totalCells = Math.ceil((blankStart + daysInMonth) / 7) * 7;

    // Günler oluşturuluyor
    for(let i=0; i<totalCells; i++){
      const cell = document.createElement("div");
      cell.className = "calendar-cell day-cell";

      if(i >= blankStart && i < blankStart + daysInMonth){
        let dayNumber = i - blankStart + 1;
        cell.textContent = dayNumber;

        // Tarihi stringe çevir (yyyy-mm-dd)
        let dateStr = `${
