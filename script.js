function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    // Check theme settings
    const darkModeSaved = localStorage.getItem('darkMode') === 'true';
    if (darkModeSaved) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<span class="material-icons">light_mode</span>';
    }
    
    // Button event listener
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        darkModeToggle.innerHTML = isDarkMode 
            ? '<span class="material-icons">light_mode</span>' 
            : '<span class="material-icons">dark_mode</span>';
    });
}

function initRevealAnimation() {
    const sections = document.querySelectorAll('.section-header, .skill-card, .project-card, .about-content, .contact-card');

    sections.forEach(section => {
        section.classList.add('reveal');
    })

    function checkScroll() {
        sections.forEach(section => {
            
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8;

            if (sectionTop < triggerPoint) {
                section.classList.add('active');
            }

        });
    }

    checkScroll();

    window.addEventListener('scroll', checkScroll);

}

function initBackToTop () {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if(!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {

            filterButtons.forEach(btn => btn.classList.remove('active'));

            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const tags =card.querySelectorAll('.tag');
                    let hasTag = false;

                    tags.forEach(tag => {
                        if (tag.textContent === filter) {
                            hasTag = true;
                        }
                    });

                    if (hasTag) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
}

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Welcome to my portfolio!");
    
    // Sticky header
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Alert when submitted the form.
            alert('Thanks for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Dark mode
    initDarkMode();

    // Reveal animation
    initRevealAnimation();

    // Back to the top
    initBackToTop ();

    // Project filters
    initProjectFilters();
});