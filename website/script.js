// DOTClaw Website Animations

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initScrollReveal();
    initCounters();
    initParallax();
    initSmoothScroll();
    initNavbarScroll();
});

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.feature-card, .protocol-item, .demo-header, .section-header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// Counter Animation for Stats
function initCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const hasPlus = text.includes('+');
                const numericValue = parseInt(text.replace(/\D/g, ''));
                
                animateCounter(target, 0, numericValue, 2000, hasPlus);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, start, end, duration, addPlus) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (addPlus ? '+' : '');
    }, 16);
}

// Parallax Effect for Background
function initParallax() {
    const bgGlow = document.querySelector('.bg-glow');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (bgGlow) {
            bgGlow.style.transform = `translateX(-50%) translateY(${rate}px)`;
        }
    });
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar Background on Scroll
function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(3, 3, 5, 0.95)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(3, 3, 5, 0.8)';
            nav.style.boxShadow = 'none';
        }
    });
}

// Mouse Move Effect for Cards
function initMouseMoveEffect() {
    const cards = document.querySelectorAll('.feature-card, .protocol-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Terminal Typing Effect
function initTerminalTyping() {
    const terminal = document.querySelector('.terminal');
    const lines = terminal?.querySelectorAll('.line');
    
    if (!lines) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lines.forEach((line, index) => {
                    line.style.opacity = '0';
                    setTimeout(() => {
                        line.style.opacity = '1';
                        line.style.animation = 'fadeInUp 0.3s ease forwards';
                    }, index * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(terminal);
}

// Initialize mouse move effect
initMouseMoveEffect();
initTerminalTyping();

// Add CSS keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes glow {
        0%, 100% {
            filter: drop-shadow(0 0 20px rgba(230, 0, 122, 0.3));
        }
        50% {
            filter: drop-shadow(0 0 40px rgba(0, 212, 255, 0.3));
        }
    }
`;
document.head.appendChild(style);