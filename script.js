// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Typing animation for hero
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach((el, index) => {
        const text = el.getAttribute('data-type');
        el.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                el.style.borderRight = 'none';
            }
        }
        
        setTimeout(() => {
            typeWriter();
        }, index * 500);
    });
}

// Hero parallax effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Enhanced staggered reveal with delays
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
   
    document.querySelectorAll('.section, .skill-category, .project-card, .achievement-item, .education-card, .stagger-1, .stagger-2').forEach(el => {
        el.classList.add('reveal', 'staggerIn');
        observer.observe(el);
    });
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
    
    // Demo skill progress animation (add progress bars in HTML for real use)
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        const rect = category.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            const progress = category.querySelector('.skill-progress-fill');
            if (progress) {
                progress.style.setProperty('--progress-width', (80 + index * 5) + '%');
            }
        }
    });
});

function initParticles() {
    const canvas = document.querySelector('.particles');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particlesArray = [];
    const numberOfParticles = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = Math.random() * 40 + 5;
        }
        
        draw() {
            ctx.fillStyle = 'rgba(66, 165, 245, 0.6)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        update() {
            this.baseX = this.x;
            this.baseY = this.y;
            
            let amplitude = 30;
            let frequency = 0.002;
            
            this.x = this.baseX + Math.cos(window.scrollY * frequency) * amplitude;
            this.y = this.baseY + Math.sin(window.scrollY * frequency) * amplitude;
        }
    }
    
    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}

// Already updated above with staggered support

function initActiveNav() {
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollReveal();
    initActiveNav();
    initTypingAnimation();
    initParallax();
    
    // Add pulse class to buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.classList.add('pulse-btn');
    });
    
    setTimeout(() => {
        document.querySelector('#home').classList.add('active');
    }, 100);
});

if ('IntersectionObserver' in window === false) {
    
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                el.classList.add('active');
            }
        });
    });
}

if ('IntersectionObserver' in window === false) {
    
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                el.classList.add('active');
            }
        });
    });
}
