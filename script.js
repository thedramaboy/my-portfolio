
// Hero background
const heroBg = document.getElementById('hero-bg');
const heroSection = document.querySelector('.hero');

let targetX = 50, targetY = 50;
let currentX = 50, currentY = 50;

heroSection.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = heroSection.getBoundingClientRect();
  targetX = ((e.clientX - left) / width) * 100;
  targetY = ((e.clientY - top) / height) * 100;
});

function animateGradient() {
  currentX += (targetX - currentX) * 0.1;
  currentY += (targetY - currentY) * 0.1;

  heroBg.style.background = `radial-gradient(circle at ${currentX}% ${currentY}%, rgba(168,85,247,0.25), transparent 70%)`;

  requestAnimationFrame(animateGradient);
}

animateGradient();

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// Testimonial slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  testimonialCards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });

  testimonialDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentSlide = index;
}

function startSlider() {
  slideInterval = setInterval(() => {
    const next = (currentSlide + 1) % testimonialCards.length;
    showSlide(next);
  }, 6000);
}

function stopSlider() {
  clearInterval(slideInterval);
}

testimonialDots.forEach(dot => {
  dot.addEventListener('click', () => {
    stopSlider();
    const index = parseInt(dot.dataset.slide);
    showSlide(index);
    startSlider();
  });
});

showSlide(0);
startSlider();


// Portfolio filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {

    filterButtons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');

    const filter = button.dataset.filter.toLowerCase();

    portfolioCards.forEach(card => {
      const categories = card.dataset.category.toLowerCase();
      const shouldShow = filter === 'all' || categories.includes(filter);

      if (shouldShow) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


// Mobile Nav toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.querySelectorAll('.mobile-nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');

    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});


// Back to top
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
