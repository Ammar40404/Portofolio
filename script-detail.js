// Dark/Light Mode Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle || !themeIcon) return;
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Slider Functionality for Detail Pages
function initSlider() {
    const sliderTrack = document.getElementById('slider-track');
    const sliderDots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (!sliderTrack || sliderDots.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.slide').length;
    
    // Update slider position
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        sliderDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = currentSlide === 0;
            prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentSlide === 0 ? 'not-allowed' : 'pointer';
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentSlide === totalSlides - 1;
            nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
            nextBtn.style.cursor = currentSlide === totalSlides - 1 ? 'not-allowed' : 'pointer';
        }
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    // Next slide
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    }
    
    // Event listeners for dots
    sliderDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    
    // Event listeners for buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/swipe support for mobile
    if (sliderTrack) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    }
    
    // Initialize
    updateSlider();
}

// Mobile Navigation Toggle
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (!mobileToggle || !navLinks) return;
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon based on menu state
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        });
    });
}

// Simple scroll to top functionality
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (!scrollTopBtn) return;
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Set current year in footer
function setCurrentYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize slider if exists
    if (document.getElementById('slider-track')) {
        initSlider();
    }
    
    // Set current year
    setCurrentYear();
    
    // Initialize scroll to top
    initScrollToTop();
});

