
const UNLOCK_DATE = new Date("2026-11-21T00:00:00-05:00");

const intro = document.getElementById("intro");
const gift = document.getElementById("gift");
const openGiftBtn = document.getElementById("openGiftBtn");
const lockMessage = document.getElementById("lockMessage");
const tinyNote = document.getElementById("tinyNote");
const countdown = document.getElementById("countdown");
const mainContent = document.getElementById("main-content");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let countdownInterval;

// CUENTA REGRESIVA

function updateCountdown() {
  const remaining = UNLOCK_DATE.getTime() - Date.now();

  if (remaining <= 0) {
    countdown.hidden = true;
    lockMessage.textContent = "¡Llegó el momento! Tu regalo está listo ♡";
    openGiftBtn.disabled = false;
    tinyNote.textContent = "Este pequeño mundo está hecho para ti.";

    return false;
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

  openGiftBtn.disabled = true;

  return true;
}

if (updateCountdown()) {
  countdownInterval = setInterval(() => {
    if (!updateCountdown()) {
      clearInterval(countdownInterval);
    }
  }, 1000);
}

// ABRIR REGALO

function openGift() {
  if (Date.now() < UNLOCK_DATE.getTime()) {
    return;
  }

  gift.classList.add("open");
  openGiftBtn.disabled = true;

  setTimeout(() => {
    intro.hidden = true;
    mainContent.hidden = false;
    musicBtn.hidden = false;

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, 850);
}

// MÚSICA

function toggleMusic() {
  if (music.paused) {
    music.play()
      .then(() => {
        musicBtn.textContent = "♫ PAUSAR MÚSICA";
      })
      .catch(() => {
        musicBtn.textContent = "♫ TOCA PARA ACTIVAR";
      });
  } else {
    music.pause();
    musicBtn.textContent = "♫ ACTIVAR MÚSICA";
  }
}

// CARTA

function toggleLetter() {
  const envelope = document.getElementById("envelope");
  const letter = document.getElementById("letter");

  envelope.classList.toggle("open");
  letter.hidden = !letter.hidden;
}

// VISOR DE FOTOGRAFÍAS

const lightbox = document.createElement("div");

lightbox.className = "photo-lightbox";

lightbox.innerHTML = `
  <button class="lightbox-close" type="button" aria-label="Cerrar fotografía">
    &times;
  </button>
  <img src="" alt="Fotografía ampliada">
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const closeButton = lightbox.querySelector(".lightbox-close");

function openPhoto(image) {
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt || "Fotografía ampliada";

  lightbox.classList.add("active");
  document.body.classList.add("lightbox-open");
}

function closePhoto() {
  lightbox.classList.remove("active");
  document.body.classList.remove("lightbox-open");

  setTimeout(() => {
    if (!lightbox.classList.contains("active")) {
      lightboxImage.src = "";
    }
  }, 300);
}

document.querySelectorAll(".photo-card img, .birthday-photo").forEach(image => {
  image.addEventListener("click", () => {
    openPhoto(image);
  });
});

closeButton.addEventListener("click", closePhoto);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closePhoto();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closePhoto();
  }
});

// EVENTOS

openGiftBtn.addEventListener("click", openGift);
musicBtn.addEventListener("click", toggleMusic);

document.getElementById("envelope").addEventListener(
  "click",
  toggleLetter
);
