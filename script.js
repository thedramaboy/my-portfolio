// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    console.log("🚀 Portfolio initialized with GSAP!");

    // Initialize all features
    initializeNavigation();
    initializeDarkMode();
    initializeRevealAnimationsGSAP();
    initializeParallaxGSAP();
    initializeBackToTop();
    initializeProjectFilters();
    initializeTestimonials();
    initializeContactForm();
    initializeTypingEffect();
    initializeSmoothScroll();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
        });

        mobileNav.addEventListener('click', function (e) {
            if (e.target === mobileNav) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        if (scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// Dark mode
function initializeDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }

    darkModeToggle.addEventListener('click', function () {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateDarkModeIcon(isDarkMode);
    });

    function updateDarkModeIcon(isDark) {
        const icon = darkModeToggle.querySelector('.material-icons');
        icon.textContent = isDark ? 'light_mode' : 'dark_mode';
    }
}

// Reveal animation
function initializeRevealAnimationsGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.section-header, .about-content, .skill-card, .portfolio-card, .contact-card, .testimonial-card')
        .forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
}

function initializeParallaxGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax shapes in Hero
    gsap.utils.toArray('.shape').forEach((shape, i) => {
        gsap.to(shape, {
            y: (i + 1) * 50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                scrub: true
            }
        });
    });

    // Parallax image in About section
    gsap.to('.about-image img', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}


// Back to top button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Project filter
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    if (!filterButtons.length || !portfolioCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            portfolioCards.forEach(card => {
                const tags = card.querySelectorAll('.tag');
                const hasTag = Array.from(tags).some(tag => tag.textContent === filter);
                if (filter === 'all' || hasTag) {
                    card.classList.remove('hidden');
                    gsap.to(card, { autoAlpha: 1, scale: 1, duration: 0.3 });
                } else {
                    gsap.to(card, {
                        autoAlpha: 0,
                        scale: 0.8,
                        duration: 0.3,
                        onComplete: () => card.classList.add('hidden')
                    });
                }
            });
        });
    });
}

// Testimonial carousel
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    let interval;

    if (!testimonials.length || !dots.length) return;

    const show = (index) => {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        current = index;
    };

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            show(i);
            reset();
        });
    });

    const next = () => {
        show((current + 1) % testimonials.length);
    };

    const start = () => {
        interval = setInterval(next, 5000);
    };

    const reset = () => {
        clearInterval(interval);
        start();
    };

    start();

    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', start);

    show(0);
}

// Contact form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = {
            name: this.name.value,
            email: this.email.value,
            message: this.message.value
        };

        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><span class="material-icons">hourglass_empty</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 2000);
    });

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="material-icons">${type === 'success' ? 'check_circle' : 'error'}</span>
            <span>${message}</span>
        `;
        notification.style.cssText = `
            position: fixed; top: 100px; right: 20px;
            background: ${type === 'success' ? '#10B981' : '#EF4444'};
            color: white; padding: 16px 24px;
            border-radius: 8px; display: flex; align-items: center;
            gap: 12px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transform: translateX(400px);
            transition: transform 0.3s ease; z-index: 1000;
        `;

        document.body.appendChild(notification);
        setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 10);
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Typing effect
function initializeTypingEffect() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;

    const words = ['experiences', 'solutions', 'interfaces', 'websites'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

// Smooth scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;

            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    });
}
