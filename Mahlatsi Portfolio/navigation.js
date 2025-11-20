// Complete Navigation System for Multi-Page Portfolio
class Navigation {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        return path.split('/').pop() || 'index.html';
    }

    init() {
        this.highlightCurrentPage();
        this.handleMobileMenu();
        this.handleSmoothScrolling();
        this.handleThemeToggle();
        this.handleNavbarScroll();
    }

    highlightCurrentPage() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === this.currentPage) {
                link.classList.add('active');
                // Also update page title in navbar if it exists
                const navTitle = document.querySelector('.nav-logo .name');
                if (navTitle && href !== 'index.html') {
                    const pageName = this.getPageName(href);
                    navTitle.textContent = pageName;
                }
            } else {
                link.classList.remove('active');
            }
        });
    }

    getPageName(filename) {
        const names = {
            'index.html': 'Mahlatsi Mashifane',
            'about.html': 'About Me',
            'projects.html': 'My Projects',
            'experience.html': 'Experience',
            'contact.html': 'Contact'
        };
        return names[filename] || 'Mahlatsi Mashifane';
    }

    handleMobileMenu() {
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;

        if (mobileBtn && navLinks) {
            mobileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navLinks.classList.toggle('active');
                mobileBtn.classList.toggle('active');
                body.classList.toggle('menu-open');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileBtn.classList.remove('active');
                    body.classList.remove('menu-open');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileBtn.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            });

            // Handle escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    navLinks.classList.remove('active');
                    mobileBtn.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            });
        }
    }

    handleSmoothScrolling() {
        // Smooth scrolling for anchor links within the same page
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Only handle same-page anchors (not links to other pages)
                if (href !== '#' && !href.includes('.html')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        // Update URL without page reload
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }

    handleThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // Get stored theme or default to dark
        const currentTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        this.updateThemeToggle(currentTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeToggle(newTheme);
        });
    }

    updateThemeToggle(theme) {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
        }
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            // Add background when scrolled
            if (window.scrollY > 100) {
                navbar.style.background = 'var(--glass)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'transparent';
                navbar.style.backdropFilter = 'none';
            }

            // Hide/show navbar on scroll
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = window.scrollY;
        });
    }

    // Handle page transitions
    handlePageTransitions() {
        document.addEventListener('DOMContentLoaded', () => {
            // Add fade-in effect to page content
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease-in-out';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Add loading state for links
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.hostname === window.location.hostname && !link.hash) {
                    document.body.style.opacity = '0.7';
                    document.body.style.transition = 'opacity 0.2s ease';
                }
            });
        });
    }
}

// Enhanced script.js integration
class PortfolioApp {
    constructor() {
        this.navigation = new Navigation();
        this.init();
    }

    init() {
        this.handleAnimations();
        this.handleCounters();
        this.handleFAQs();
        this.handleContactForm();
        this.handleImageFallbacks();
        this.addHoverEffects();
        this.navigation.handlePageTransitions();
    }

    handleAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate progress bars
                    if (entry.target.classList.contains('skill-level')) {
                        const level = entry.target.getAttribute('data-level');
                        setTimeout(() => {
                            entry.target.style.width = level + '%';
                        }, 300);
                    }
                    
                    // Animate counters
                    if (entry.target.classList.contains('stat-number') && !entry.target.classList.contains('animated')) {
                        this.animateCounter(entry.target);
                        entry.target.classList.add('animated');
                    }
                }
            });
        }, observerOptions);

        // Observe all animate-able elements
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.scroll-animate').forEach(el => {
                observer.observe(el);
            });
            
            document.querySelectorAll('.skill-level').forEach(el => {
                observer.observe(el);
            });
            
            document.querySelectorAll('.stat-number').forEach(el => {
                observer.observe(el);
            });
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    handleCounters() {
        // Counter functionality is now handled in handleAnimations
    }

    handleFAQs() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }

    handleContactForm() {
        const contactForm = document.getElementById('contactForm');
        const formSuccess = document.getElementById('formSuccess');

        if (contactForm && formSuccess) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };
                
                // Show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // In a real implementation, you would send the form data to a server
                console.log('Form submitted:', formData);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                }, 5000);
            });
        }
    }

    handleImageFallbacks() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                this.style.display = 'none';
            });
        });
    }

    addHoverEffects() {
        // Add hover effects to cards
        document.querySelectorAll('.project-card, .cert-card, .language-card, .safety-project-card, .highlight-card').forEach(card => {
            card.classList.add('hover-lift');
        });

        // Add grow effect to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.add('hover-grow');
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Handle external links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.getAttribute('href').includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// Handle back to top functionality
document.addEventListener('DOMContentLoaded', () => {
    const backToTopLinks = document.querySelectorAll('a[href="#home"], a[href="#top"]');
    backToTopLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});