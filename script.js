const images = document.querySelectorAll('.gallery-track img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;
let startX = 0;

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    openLightbox();
  });
});

function openLightbox() {
  lightboxImg.src = images[currentIndex].src;
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  openLightbox();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  openLightbox();
}

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

/* Swipe */
lightbox.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    diff > 0 ? nextImage() : prevImage();
  }
});
document.addEventListener('contextmenu', e => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});


