// Toggle Mobile Navigation
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme or prefer-color-scheme
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Sticky photo scroll functionality
    handleStickyPhotoScroll();
});

// Function to handle sticky photo scroll behavior
function handleStickyPhotoScroll() {
    const aboutSection = document.getElementById('about');
    const skillsSection = document.getElementById('skills-section');
    const stickyPhoto = document.getElementById('sticky-photo');
    
    if (!aboutSection || !skillsSection || !stickyPhoto) return;
    
    const aboutRect = aboutSection.getBoundingClientRect();
    const skillsRect = skillsSection.getBoundingClientRect();
    
    // Check if we're in the about section
    if (aboutRect.top <= 100) {
        // Calculate when to stop scrolling (when skills section reaches near bottom)
        const stopScrollPoint = skillsRect.bottom - window.innerHeight + 150;
        
        if (aboutRect.bottom > stopScrollPoint) {
            // Photo follows scroll
            stickyPhoto.style.position = 'sticky';
            stickyPhoto.style.top = '90px';
            stickyPhoto.style.transform = 'translateY(0)';
        } else {
            // Reached the end, photo stops
            stickyPhoto.style.position = 'absolute';
            stickyPhoto.style.top = 'auto';
            stickyPhoto.style.bottom = '0';
            stickyPhoto.style.transform = 'translateY(0)';
        }
    } else {
        // Not in about section
        stickyPhoto.style.position = 'relative';
        stickyPhoto.style.top = 'auto';
    }
}

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Project Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectLinks = document.querySelectorAll('.project-link');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide projects based on category
            projectLinks.forEach(project => {
                const projectCategory = project.getAttribute('data-category');
                
                if (category === 'all' || projectCategory === category) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                    }, 10);
                } else {
                    project.style.opacity = '0';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize photo scroll on load
    handleStickyPhotoScroll();
    
    // Listen for resize to recalculate sticky photo
    window.addEventListener('resize', handleStickyPhotoScroll);
});

// Add hover effect to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translate(-3px, -3px)';
        this.style.boxShadow = '4px 4px 0px var(--border)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
        this.style.boxShadow = 'none';
    });
});