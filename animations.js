// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    // Create loader if it doesn't exist
    if (!document.querySelector('.loader')) {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = '<div class="loader-pizza">🍕</div>';
        document.body.appendChild(loader);
    }
});

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Enhanced Pizza Rain Effect
function createPizzaRain() {
    const pizzaRain = document.getElementById('pizzaRain');
    const pizzaEmojis = ['🍕', '🍅', '🧀', '🌿', '🫒', '🍄', '🥓', '🌶️'];
    
    function createPizzaDrop() {
        const drop = document.createElement('div');
        drop.className = 'pizza-drop';
        drop.textContent = pizzaEmojis[Math.floor(Math.random() * pizzaEmojis.length)];
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 4 + 3) + 's';
        drop.style.opacity = Math.random() * 0.4 + 0.1;
        drop.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
        
        pizzaRain.appendChild(drop);
        
        setTimeout(() => {
            if (drop.parentNode) {
                drop.remove();
            }
        }, 7000);
    }
    
    // Create pizza drops periodically
    setInterval(createPizzaDrop, 300);
}

// Initialize pizza rain
createPizzaRain();

// Mobile Navigation Toggle with Enhanced Animation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Add body scroll lock for mobile menu
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(15, 15, 15, 0.98)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.boxShadow = '0 5px 25px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = 'none';
    }
    
    // Parallax effects
    parallaxEffects(scrolled);
});

// Enhanced Parallax Effects
function parallaxEffects(scrolled) {
    // Floating ingredients parallax
    document.querySelectorAll('.floating-ingredient').forEach((ingredient, index) => {
        const speed = 0.3 + (index * 0.1);
        const rotation = scrolled * 0.2;
        ingredient.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
    });
    
    // Hero pizza animation
    const heroPizza = document.querySelector('.spinning-pizza');
    if (heroPizza) {
        heroPizza.style.transform = `rotate(${scrolled * 0.8}deg) scale(${1 + scrolled * 0.0008})`;
    }
    
    // Background pizza slices
    document.querySelectorAll('.pizza-slice').forEach((slice, index) => {
        const speed = 0.15 + (index * 0.03);
        const rotation = scrolled * 0.1;
        slice.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
    });
}

// Animated Counter for Stats
const animateCounter = (element, target, duration = 2500) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = () => {
        start += increment;
        if (start < target) {
            if (element.dataset.target.includes('+')) {
                element.textContent = Math.floor(start) + '+';
            } else if (element.dataset.target.includes('%')) {
                element.textContent = Math.floor(start) + '%';
            } else if (element.dataset.target.includes('k')) {
                element.textContent = Math.floor(start) + 'k+';
            } else {
                element.textContent = Math.floor(start);
            }
            requestAnimationFrame(counter);
        } else {
            element.textContent = element.dataset.target;
        }
    };
    counter();
};

// Enhanced Intersection Observer for Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate stats counters
            if (entry.target.classList.contains('stat-number')) {
                const target = entry.target.textContent;
                entry.target.dataset.target = target;
                let numericTarget;
                
                if (target.includes('k+')) {
                    numericTarget = parseInt(target.replace('k+', '')) * 1000;
                } else if (target.includes('+')) {
                    numericTarget = parseInt(target.replace('+', ''));
                } else if (target.includes('%')) {
                    numericTarget = parseInt(target.replace('%', ''));
                } else {
                    numericTarget = parseInt(target);
                }
                
                entry.target.textContent = '0';
                animateCounter(entry.target, numericTarget);
            }
            
            // Add staggered animation for pizza cards
            if (entry.target.classList.contains('pizza-card')) {
                const cards = document.querySelectorAll('.pizza-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.pizza-card, .stat-number, .chef-illustration, .contact-item').forEach(el => {
    observer.observe(el);
});

// Enhanced Pizza Card Effects
document.querySelectorAll('.pizza-card').forEach(card => {
    // Initial state for animation
    card.style.opacity = '0.3';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
    
    // Mouse move tilt effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
    
    // Pizza rotation pause on hover
    card.addEventListener('mouseenter', () => {
        const pizzaEmoji = card.querySelector('.pizza-emoji');
        if (pizzaEmoji) {
            pizzaEmoji.style.animationPlayState = 'paused';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const pizzaEmoji = card.querySelector('.pizza-emoji');
        if (pizzaEmoji) {
            pizzaEmoji.style.animationPlayState = 'running';
        }
    });
});

// Enhanced Order Button Click Effect
document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        btn.appendChild(ripple);
        
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
        
        // Show order confirmation with enhanced animation
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✅</span> Added to Cart!';
        btn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        btn.style.transform = 'scale(1.1)';
        
        // Create success pizza burst
        createSuccessPizzaBurst(btn);
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--accent-color))';
            btn.style.transform = 'scale(1)';
        }, 2500);
    });
});

// Success Pizza Burst Animation
function createSuccessPizzaBurst(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const pizza = document.createElement('div');
        pizza.textContent = '🍕';
        pizza.style.position = 'fixed';
        pizza.style.left = centerX + 'px';
        pizza.style.top = centerY + 'px';
        pizza.style.fontSize = '1.5rem';
        pizza.style.zIndex = '9999';
        pizza.style.pointerEvents = 'none';
        
        document.body.appendChild(pizza);
        
        // Animate pizza explosion
        const angle = (i / 8) * Math.PI * 2;
        const distance = 150;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        pizza.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translate(${x - 50}px, ${y - 50}px) scale(1.2) rotate(360deg)`, 
                opacity: 0 
            }
        ], {
            duration: 1200,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => pizza.remove();
    }
}

// Enhanced Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;
    
    // Loading state with animation
    submitBtn.innerHTML = '<span class="submit-pizza">🍕</span> Sending...';
    submitBtn.disabled = true;
    submitBtn.style.transform = 'scale(0.95)';
    
    // Simulate API call delay
    setTimeout(() => {
        submitBtn.innerHTML = '<span>✅</span> Message Sent!';
        submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        submitBtn.style.transform = 'scale(1.05)';
        
        // Reset form with animation
        contactForm.reset();
        
        // Create success pizza celebration
        createFormSuccessCelebration();
        
        // Reset button after 4 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--accent-color))';
            submitBtn.style.transform = 'scale(1)';
        }, 4000);
        
        console.log('Form submitted:', formObject);
        
    }, 2000);
});

// Form Success Celebration
function createFormSuccessCelebration() {
    const form = document.querySelector('.contact-form');
    const rect = form.getBoundingClientRect();
    
    for (let i = 0; i < 12; i++) {
        const pizza = document.createElement('div');
        pizza.textContent = '🍕';
        pizza.style.position = 'fixed';
        pizza.style.left = rect.left + (rect.width / 2) + 'px';
        pizza.style.top = rect.top + (rect.height / 2) + 'px';
        pizza.style.fontSize = '2rem';
        pizza.style.zIndex = '9999';
        pizza.style.pointerEvents = 'none';
        
        document.body.appendChild(pizza);
        
        // Animate pizza celebration
        const angle = (i / 12) * Math.PI * 2;
        const distance = 200;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        pizza.animate([
            { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(1.5) rotate(720deg)`, opacity: 0 }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => pizza.remove();
    }
}

// Enhanced CTA Button Effect
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ctaButton.appendChild(ripple);
    
    const rect = ctaButton.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
    
    // Create pizza trail effect
    createPizzaTrail(e.clientX, e.clientY);
    
    // Smooth scroll to menu with offset
    const menuSection = document.getElementById('menu');
    const offsetTop = menuSection.offsetTop - 80;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
});

// Pizza Trail Effect for CTA Button
function createPizzaTrail(startX, startY) {
    for (let i = 0; i < 6; i++) {
        const pizza = document.createElement('div');
        pizza.textContent = '🍕';
        pizza.style.position = 'fixed';
        pizza.style.left = startX + 'px';
        pizza.style.top = startY + 'px';
        pizza.style.fontSize = '1.5rem';
        pizza.style.zIndex = '9999';
        pizza.style.pointerEvents = 'none';
        
        document.body.appendChild(pizza);
        
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 200;
        
        pizza.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translate(${randomX}px, ${randomY}px) scale(1) rotate(360deg)`, 
                opacity: 0 
            }
        ], {
            duration: 1000 + (i * 100),
            easing: 'ease-out',
            delay: i * 100
        }).onfinish = () => pizza.remove();
    }
}

// Scroll Progress Indicator
function createScrollProgress() {
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        const progressBar = document.querySelector('.scroll-progress');
        progressBar.style.width = scrollPercent + '%';
    });
}

createScrollProgress();

// Enhanced Section Reveal Animation
function createSectionObserver() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate section pizzas with stagger
                const sectionPizzas = entry.target.querySelectorAll('.title-pizza, .logo-pizza');
                sectionPizzas.forEach((pizza, index) => {
                    setTimeout(() => {
                        pizza.style.animation = 'none';
                        pizza.offsetHeight; // Trigger reflow
                        pizza.style.animation = 'wiggle 3s ease-in-out infinite';
                    }, index * 300);
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(80px)';
        section.style.transition = 'opacity 1s ease, transform 1s ease';
        sectionObserver.observe(section);
    });
}

createSectionObserver();

// Enhanced Pizza Cursor Trail (Desktop only)
if (!('ontouchstart' in window) && window.innerWidth > 768) {
    let trail = [];
    const trailLength = 8;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Remove old trail elements
        document.querySelectorAll('.pizza-trail').forEach(el => {
            if (Date.now() - parseInt(el.dataset.time) > 1000) {
                el.remove();
            }
        });
        
        // Create new trail with enhanced effects
        trail.forEach((point, index) => {
            if (index % 2 === 0) { // Reduce density
                const trailPizza = document.createElement('div');
                trailPizza.className = 'pizza-trail';
                trailPizza.textContent = '🍕';
                trailPizza.dataset.time = Date.now();
                trailPizza.style.cssText = `
                    position: fixed;
                    left: ${point.x}px;
                    top: ${point.y}px;
                    font-size: ${0.8 + (index / trailLength) * 0.5}rem;
                    opacity: ${(index / trailLength) * 0.6};
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%) rotate(${index * 45}deg);
                    transition: opacity 0.3s ease;
                `;
                
                document.body.appendChild(trailPizza);
                
                setTimeout(() => {
                    if (trailPizza.parentNode) {
                        trailPizza.remove();
                    }
                }, 800);
            }
        });
    });
}

// Enhanced Mobile Experience
function enhanceMobileExperience() {
    const isMobile = window.innerWidth <= 768;
    
    if ('ontouchstart' in window) {
        // Add enhanced touch feedback
        document.querySelectorAll('.pizza-card, .cta-button, .submit-btn, .order-btn').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.transition = 'transform 0.3s ease';
                }, 100);
            });
        });
        
        // Disable cursor trail on mobile
        document.querySelectorAll('.pizza-trail').forEach(el => el.remove());
    }
    
    if (isMobile) {
        // Optimize animations for mobile performance
        document.querySelectorAll('.floating-ingredient').forEach(ingredient => {
            ingredient.style.fontSize = '2.5rem';
            ingredient.style.animationDuration = '8s';
        });
        
        // Reduce pizza rain frequency on mobile
        const pizzaDrops = document.querySelectorAll('.pizza-drop');
        pizzaDrops.forEach((drop, index) => {
            if (index % 3 !== 0) {
                drop.remove();
            }
        });
    }
}

enhanceMobileExperience();
window.addEventListener('resize', enhanceMobileExperience);

// Easter Egg: Pizza Party Mode
let logoClickCount = 0;
document.querySelector('.logo-pizza').addEventListener('click', () => {
    logoClickCount++;
    if (logoClickCount >= 5) {
        pizzaPartyMode();
        logoClickCount = 0;
    }
});

function pizzaPartyMode() {
    // Add rainbow effect to body
    document.body.style.animation = 'rainbow 3s linear infinite';
    
    // Create mega pizza explosion
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const pizza = document.createElement('div');
            pizza.textContent = ['🍕', '🍅', '🧀', '🌿', '🍄'][Math.floor(Math.random() * 5)];
            pizza.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                font-size: ${2 + Math.random() * 3}rem;
                z-index: 9999;
                pointer-events: none;
                animation: partyPizza 4s ease-out forwards;
            `;
            
            document.body.appendChild(pizza);
            setTimeout(() => {
                if (pizza.parentNode) {
                    pizza.remove();
                }
            }, 4000);
        }, i * 80);
    }
    
    // Show party message
    showPartyMessage();
    
    // Reset after party
    setTimeout(() => {
        document.body.style.animation = '';
    }, 4000);
}

function showPartyMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
            color: white;
            padding: 30px 50px;
            border-radius: 25px;
            font-size: 2rem;
            font-weight: bold;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            animation: partyMessage 4s ease-in-out forwards;
        ">
            🎉 PIZZA PARTY MODE! 🎉<br>
            <span style="font-size: 1rem;">You found the secret!</span>
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 4000);
}

// Add keyframes for party mode
const partyStyles = document.createElement('style');
partyStyles.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg) saturate(1.2); }
        100% { filter: hue-rotate(360deg) saturate(1.2); }
    }
    @keyframes partyPizza {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.8) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0.5) rotate(360deg);
            opacity: 0;
        }
    }
    @keyframes partyMessage {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        20% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
        80% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(partyStyles);

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // Escape key functionality
    if (e.key === 'Escape') {
        // Close mobile menu
        document.querySelector('.nav-menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Space or Enter on focused CTA button
    if ((e.key === ' ' || e.key === 'Enter') && document.activeElement === ctaButton) {
        e.preventDefault();
        ctaButton.click();
    }
    
    // Arrow key navigation for menu items
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const focusableElements = document.querySelectorAll('.nav-link, .cta-button, .order-btn, .submit-btn');
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
        
        if (currentIndex !== -1) {
            e.preventDefault();
            let nextIndex;
            
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % focusableElements.length;
            } else {
                nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
            }
            
            focusableElements[nextIndex].focus();
        }
    }
});

// Performance Optimization
function optimizePerformance() {
    // Lazy load images with intersection observer
    const images = document.querySelectorAll('.pizza-photo');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                // Simulate loading effect
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 200);
                
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.querySelectorAll('.floating-ingredient, .pizza-slice').forEach(element => {
            element.style.animationDuration = '12s';
        });
        
        // Reduce pizza rain frequency
        const drops = document.querySelectorAll('.pizza-drop');
        drops.forEach((drop, index) => {
            if (index % 2 === 0) {
                drop.remove();
            }
        });
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        if (document.hidden) {
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });
}

optimizePerformance();

// Initialize welcome message
setTimeout(() => {
    if (!localStorage.getItem('welcomeShown')) {
        showWelcomeMessage();
    }
}, 2500);

function showWelcomeMessage() {
    const welcome = document.createElement('div');
    welcome.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--card-dark);
            color: var(--light-color);
            padding: 40px;
            border-radius: 25px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            z-index: 10000;
            text-align: center;
            border: 2px solid var(--primary-color);
            animation: fadeInUp 0.6s ease;
            max-width: 90vw;
            width: 400px;
        ">
            <h2 style="color: var(--primary-color); margin-bottom: 20px; font-size: 1.8rem;">
                🍕 Welcome to Orca Pizza! 🍕
            </h2>
            <p style="margin-bottom: 25px; color: var(--text-muted); line-height: 1.6;">
                Experience artisan pizza perfection with interactive features and delightful animations!
            </p>
            <p style="margin-bottom: 25px; font-size: 0.9rem; color: var(--text-muted);">
                💡 Tip: Click the logo 5 times for a surprise!
            </p>
            <button onclick="this.parentElement.parentElement.remove(); localStorage.setItem('welcomeShown', 'true');" 
                    style="
                        background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                    "
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(212, 20, 42, 0.4)';"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                Let's Order! 🍕
            </button>
        </div>
    `;
    document.body.appendChild(welcome);
}

// Console welcome message
console.log(`
🍕 Enhanced Orca Pizza Website Loaded Successfully! 🍕

✨ Features Activated:
• Interactive pizza animations throughout the page
• Mobile-responsive hamburger navigation
• Smooth scrolling and parallax effects
• Enhanced order button with success animations
• Pizza rain background effect
• Touch-optimized mobile experience
• Keyboard navigation support
• Performance optimizations
• Easter egg pizza party mode (click logo 5 times!)
• Accessibility improvements

🚀 Ready to serve delicious digital experiences!
`);

// Add custom cursor for desktop
if (!('ontouchstart' in window) && window.innerWidth > 768) {
    document.body.style.cursor = 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\'%3e%3ctext y=\'16\' font-size=\'16\'%3e🍕%3c/text%3e%3c/svg%3e"), auto';
}