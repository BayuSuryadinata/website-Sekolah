// Ambil elemen
const sliderWrapper = document.getElementById('sliderWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterButtons = document.querySelectorAll('.filter-btn');

// Clone kartu pertama & terakhir untuk looping
const firstCard = sliderWrapper.children[0].cloneNode(true);
const lastCard = sliderWrapper.children[sliderWrapper.children.length - 1].cloneNode(true);

sliderWrapper.appendChild(firstCard);
sliderWrapper.insertBefore(lastCard, sliderWrapper.firstChild);

// Variabel tracking
let currentIndex = 1; // Mulai dari kartu asli pertama (bukan clone)
const cardWidth = 270; // lebar card + gap
const totalCards = sliderWrapper.children.length;

// Fungsi update slider
function updateSlider() {
    const offset = -currentIndex * cardWidth;
    sliderWrapper.style.transform = `translateX(${offset}px)`;
    sliderWrapper.style.transition = 'transform 0.8s ease-in-out'; // Geser pelan & halus
}

// Fungsi geser ke kiri
function slideLeft() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    } else {
        // Jika di awal, lompat ke clone terakhir (looping)
        setTimeout(() => {
            sliderWrapper.style.transition = 'none';
            currentIndex = totalCards - 2;
            updateSlider();
        }, 500);
    }
}

// Fungsi geser ke kanan
function slideRight() {
    if (currentIndex < totalCards - 1) {
        currentIndex++;
        updateSlider();
    } else {
        // Jika di akhir, lompat ke clone pertama (looping)
        setTimeout(() => {
            sliderWrapper.style.transition = 'none';
            currentIndex = 1;
            updateSlider();
        }, 500);
    }
}

// Tombol panah
prevBtn.addEventListener('click', slideLeft);
nextBtn.addEventListener('click', slideRight);

// Filter button
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Auto slide setiap 4 detik (lebih pelan)
let autoSlideInterval = setInterval(() => {
    slideRight();
}, 4000);

// Stop auto slide saat hover
sliderWrapper.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

sliderWrapper.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        slideRight();
    }, 4000);
});

// Statistik animasi count-up
const stats = document.querySelectorAll('.stat-card');

// Fungsi untuk animasi count-up
function animateCount(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 16ms per frame ~60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Animasi masuk saat scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Ambil angka target dari data-count
            const countElement = entry.target.querySelector('.stat-number');
            const target = parseInt(entry.target.dataset.count);
            animateCount(countElement, target);
        }
    });
}, { threshold: 0.1 });

// Observasi setiap card
stats.forEach(card => {
    observer.observe(card);
});
// Smooth scroll untuk anchor link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // -80 agar tidak tertutup navbar
                behavior: 'smooth'
            });
        }
    });
});
// Form Kotak Saran - Efek "Pesan Terkirim"
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Tampilkan alert
    alert('Pesan Anda telah terkirim! 🎉\nTerima kasih atas masukannya.');
    
    // Reset form
    this.reset();
});