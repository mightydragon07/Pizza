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

// Pizza Rain Effect
function createPizzaRain() {
    const pizzaRain = document.getElementById('pizzaRain');
    const pizzaEmojis = ['🍕', '🍅', '🧀', '🌿', '🫒', '🍄'];
    
    function createPizzaDrop() {
        const drop = document.createElement('div');
        drop.className = 'pizza-drop';
        drop.textContent = pizzaEmojis[Math.floor(Math.random() * pizzaEmojis.length)];
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 3 + 2) + 's';
        drop.style.opacity = Math.random() * 0.3 + 0.1;
        
        pizzaRain.appendChild(drop);
        
        setTimeout(() => {
            drop.remove();
        }, 5000);
    }
    
    // Create pizza drops periodically
    setInterval(createPizzaDrop, 500);
}

// Initialize pizza rain
createPizzaRain();

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}));

// Smooth Scrolling for Navigation Links
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

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Animated Counter for Stats
const animateCounter = (element, target, duration = 2000) => {
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

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
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
                    numericTarget = parseInt(target.replace('k+', ''));
                } else if (target.includes('+')) {
                    numericTarget = parseInt(target.replace('+', ''));
                } else if (target.includes('%')) {
                    numericTarget = parseInt(target.replace('%', ''));
                }
                
                entry.target.textContent = '0';
                animateCounter(entry.target, numericTarget);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.pizza-card, .stat-number, .chef-illustration').forEach(el => {
    observer.observe(el);
});

// Enhanced Pizza Card Effects
document.querySelectorAll('.pizza-card').forEach(card => {
    // Mouse move tilt effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
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

// Order Button Click Effect
document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
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
        }, 600);
        
        // Show order confirmation
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✅</span> Added to Cart!';
        btn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--accent-color))';
        }, 2000);
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;
    
    // Loading state
    submitBtn.innerHTML = '<span class="submit-pizza">🍕</span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        submitBtn.innerHTML = '<span>✅</span> Message Sent!';
        submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        
        // Reset form
        contactForm.reset();
        
        // Create success pizza animation
        createSuccessPizzas();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--accent-color))';
        }, 3000);
        
        console.log('Form submitted:', formObject);
        
    }, 2000);
});

// Success Pizza Animation
function createSuccessPizzas() {
    const form = document.querySelector('.contact-form');
    const rect = form.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const pizza = document.createElement('div');
        pizza.textContent = '🍕';
        pizza.style.position = 'fixed';
        pizza.style.left = rect.left + (rect.width / 2) + 'px';
        pizza.style.top = rect.top + (rect.height / 2) + 'px';
        pizza.style.fontSize = '2rem';
        pizza.style.zIndex = '9999';
        pizza.style.pointerEvents = 'none';
        
        document.body.appendChild(pizza);
        
        // Animate pizza explosion
        const angle = (i / 5) * Math.PI * 2;
        const distance = 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        pizza.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => pizza.remove();
    }
}

// CTA Button Enhanced Effect
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', (e) => {
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
    }, 600);
    
    // Scroll to menu
    document.getElementById('menu').scrollIntoView({
        behavior: 'smooth'
    });
});

// Advanced Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Floating ingredients parallax
    document.querySelectorAll('.floating-ingredient').forEach((ingredient, index) => {
        const speed = 0.2 + (index * 0.1);
        ingredient.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
    
    // Hero pizza animation
    const heroPizza = document.querySelector('.spinning-pizza');
    if (heroPizza) {
        heroPizza.style.transform = `rotate(${scrolled * 0.5}deg) scale(${1 + scrolled * 0.001})`;
    }
    
    // Background pizza slices
    document.querySelectorAll('.pizza-slice').forEach((slice, index) => {
        const speed = 0.1 + (index * 0.05);
        slice.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.2}deg)`;
    });
});

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
                
                // Animate section pizzas
                const sectionPizzas = entry.target.querySelectorAll('.title-pizza, .logo-pizza');
                sectionPizzas.forEach((pizza, index) => {
                    setTimeout(() => {
                        pizza.style.animation = 'none';
                        pizza.offsetHeight; // Trigger reflow
                        pizza.style.animation = 'wiggle 2s ease-in-out infinite';
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
}

createSectionObserver();

// Pizza Cursor Trail (Desktop only)
if (!('ontouchstart' in window)) {
    let trail = [];
    const trailLength = 5;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Remove old trail elements
        document.querySelectorAll('.pizza-trail').forEach(el => el.remove());
        
        // Create new trail
        trail.forEach((point, index) => {
            const trailPizza = document.createElement('div');
            trailPizza.className = 'pizza-trail';
            trailPizza.textContent = '🍕';
            trailPizza.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                font-size: ${0.5 + (index / trailLength)}rem;
                opacity: ${index / trailLength};
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(trailPizza);
            
            setTimeout(() => trailPizza.remove(), 500);
        });
    });
}

// Enhanced Mobile Experience
function enhanceMobileExperience() {
    const isMobile = window.innerWidth <= 768;
    
    if ('ontouchstart' in window) {
        // Add touch feedback
        document.querySelectorAll('.pizza-card, .cta-button, .submit-btn, .order-btn').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
        // Disable cursor trail on mobile
        document.querySelectorAll('.pizza-trail').forEach(el => el.remove());
    }
    
    if (isMobile) {
        // Reduce animation complexity
        document.querySelectorAll('.floating-ingredient').forEach(ingredient => {
            ingredient.style.fontSize = '2rem';
        });
        
        // Simplify parallax on mobile
        window.removeEventListener('scroll', arguments.callee);
    }
}

enhanceMobileExperience();
window.addEventListener('resize', enhanceMobileExperience);

// Easter Egg: Pizza Party Mode
let clickCount = 0;
document.querySelector('.logo-pizza').addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 5) {
        pizzaPartyMode();
        clickCount = 0;
    }
});

function pizzaPartyMode() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    // Create pizza explosion
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const pizza = document.createElement('div');
            pizza.textContent = '🍕';
            pizza.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                font-size: 3rem;
                z-index: 9999;
                pointer-events: none;
                animation: partyPizza 3s ease-out forwards;
            `;
            
            document.body.appendChild(pizza);
            setTimeout(() => pizza.remove(), 3000);
        }, i * 100);
    }
    
    // Reset after party
    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);
}

// Add rainbow keyframes for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    @keyframes partyPizza {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Dynamic Pizza Menu Filtering (Advanced Feature)
function createMenuFilter() {
    const menuSection = document.querySelector('.menu-section .container');
    const filterContainer = document.createElement('div');
    filterContainer.className = 'menu-filters';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">🍕 All Pizzas</button>
            <button class="filter-btn" data-filter="classic">🇮🇹 Classic</button>
            <button class="filter-btn" data-filter="premium">👑 Premium</button>
            <button class="filter-btn" data-filter="veggie">🥬 Vegetarian</button>
        </div>
    `;
    
    const sectionTitle = menuSection.querySelector('.section-title');
    sectionTitle.after(filterContainer);
    
    // Add filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const pizzaCards = document.querySelectorAll('.pizza-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            pizzaCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    const cardType = card.dataset.pizza;
                    const shouldShow = 
                        (filter === 'classic' && ['margherita', 'pepperoni'].includes(cardType)) ||
                        (filter === 'premium' && ['truffle', 'quattro', 'meat'].includes(cardType)) ||
                        (filter === 'veggie' && ['veggie', 'margherita'].includes(cardType));
                    
                    if (shouldShow) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        card.style.animation = 'fadeOut 0.3s ease-out';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Add filter styles
const filterStyles = document.createElement('style');
filterStyles.textContent = `
    .menu-filters {
        margin-bottom: 40px;
        text-align: center;
    }
    .filter-buttons {
        display: flex;
        justify-content: center;
        gap: 15px;
        flex-wrap: wrap;
    }
    .filter-btn {
        background: rgba(255,255,255,0.1);
        border: 2px solid var(--primary-color);
        color: var(--primary-color);
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }
    .filter-btn:hover,
    .filter-btn.active {
        background: var(--primary-color);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(212, 20, 42, 0.3);
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
    @media (max-width: 768px) {
        .filter-buttons {
            flex-direction: column;
            align-items: center;
        }
        .filter-btn {
            width: 200px;
        }
    }
`;
document.head.appendChild(filterStyles);

// Initialize menu filter
createMenuFilter();

// Pizza Size Selector for Cards
document.querySelectorAll('.pizza-card').forEach(card => {
    const sizeSelector = document.createElement('div');
    sizeSelector.className = 'size-selector';
    sizeSelector.innerHTML = `
        <div class="size-options">
            <button class="size-btn active" data-size="small" data-price="0">
                <span class="size-pizza">🍕</span>
                <span>Small</span>
            </button>
            <button class="size-btn" data-size="medium" data-price="4">
                <span class="size-pizza">🍕</span>
                <span>Medium (+$4)</span>
            </button>
            <button class="size-btn" data-size="large" data-price="8">
                <span class="size-pizza">🍕</span>
                <span>Large (+$8)</span>
            </button>
        </div>
    `;
    
    const priceElement = card.querySelector('.price');
    priceElement.after(sizeSelector);
    
    // Add size selector functionality
    const sizeButtons = sizeSelector.querySelectorAll('.size-btn');
    const basePrice = parseInt(priceElement.textContent.replace(', ''));
    
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Update active button
            sizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update price
            const additionalPrice = parseInt(btn.dataset.price);
            const newPrice = basePrice + additionalPrice;
            priceElement.textContent = ' + ' + newPrice.toLocaleString();
            
            // Pizza size animation
            const sizePizza = btn.querySelector('.size-pizza');
            sizePizza.style.transform = 'scale(1.2)';
            setTimeout(() => {
                sizePizza.style.transform = 'scale(1)';
            }, 200);
        });
    });
});

// Add size selector styles
const sizeStyles = document.createElement('style');
sizeStyles.textContent = `
    .size-selector {
        margin: 15px 0;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
    }
    .pizza-card:hover .size-selector {
        opacity: 1;
        transform: translateY(0);
    }
    .size-options {
        display: flex;
        justify-content: center;
        gap: 8px;
    }
    .size-btn {
        background: rgba(212, 20, 42, 0.1);
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
        padding: 5px 10px;
        border-radius: 15px;
        cursor: pointer;
        font-size: 0.8rem;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
    }
    .size-btn:hover,
    .size-btn.active {
        background: var(--primary-color);
        color: white;
    }
    .size-pizza {
        font-size: 1rem;
        transition: transform 0.2s ease;
    }
`;
document.head.appendChild(sizeStyles);

// Shopping Cart Functionality
let cart = [];

function createShoppingCart() {
    const cartIcon = document.createElement('div');
    cartIcon.className = 'cart-icon';
    cartIcon.innerHTML = `
        <div class="cart-button">
            🛒 <span class="cart-count">0</span>
        </div>
        <div class="cart-dropdown">
            <h3>Your Order 🍕</h3>
            <div class="cart-items"></div>
            <div class="cart-total">Total: $0</div>
            <button class="checkout-btn">Checkout</button>
        </div>
    `;
    
    document.body.appendChild(cartIcon);
    
    // Cart toggle functionality
    const cartButton = cartIcon.querySelector('.cart-button');
    const cartDropdown = cartIcon.querySelector('.cart-dropdown');
    
    cartButton.addEventListener('click', () => {
        cartDropdown.classList.toggle('show');
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartIcon.contains(e.target)) {
            cartDropdown.classList.remove('show');
        }
    });
}

function updateCart() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty 😢</p>';
        cartTotal.textContent = 'Total: $0';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name} (${item.size})</span>
            <span>${item.price}</span>
            <button class="remove-item" data-index="${index}">❌</button>
        `;
        
        cartItems.appendChild(itemElement);
        total += item.price;
    });
    
    cartTotal.textContent = `Total: ${total}`;
    
    // Add remove functionality
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Add cart styles
const cartStyles = document.createElement('style');
cartStyles.textContent = `
    .cart-icon {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
    }
    .cart-button {
        background: var(--primary-color);
        color: white;
        padding: 10px 15px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(212, 20, 42, 0.3);
        transition: all 0.3s ease;
    }
    .cart-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(212, 20, 42, 0.4);
    }
    .cart-count {
        background: white;
        color: var(--primary-color);
        border-radius: 50%;
        padding: 2px 6px;
        margin-left: 5px;
        font-size: 0.8rem;
    }
    .cart-dropdown {
        position: absolute;
        top: 60px;
        right: 0;
        width: 300px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        padding: 20px;
        opacity: 0;
        transform: translateY(-10px);
        visibility: hidden;
        transition: all 0.3s ease;
        border: 2px solid var(--primary-color);
    }
    .cart-dropdown.show {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
    }
    .cart-dropdown h3 {
        margin-bottom: 15px;
        color: var(--primary-color);
        text-align: center;
    }
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #eee;
    }
    .remove-item {
        background: none;
        border: none;
        cursor: pointer;
        padding: 2px;
    }
    .cart-total {
        font-weight: bold;
        font-size: 1.2rem;
        text-align: center;
        margin: 15px 0;
        color: var(--primary-color);
    }
    .checkout-btn {
        width: 100%;
        background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
        color: white;
        border: none;
        padding: 12px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    .checkout-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(212, 20, 42, 0.3);
    }
    @media (max-width: 768px) {
        .cart-dropdown {
            width: 280px;
            right: -10px;
        }
    }
`;
document.head.appendChild(cartStyles);

// Initialize cart
createShoppingCart();
updateCart();

// Update order button functionality to add to cart
document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const card = btn.closest('.pizza-card');
        const name = card.querySelector('h3').textContent;
        const price = parseInt(card.querySelector('.price').textContent.replace(', ''));
        const activeSize = card.querySelector('.size-btn.active');
        const size = activeSize ? activeSize.dataset.size : 'small';
        
        // Add to cart
        cart.push({ name, price, size });
        updateCart();
        
        // Visual feedback
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>✅</span> Added to Cart!';
        btn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--accent-color))';
        }, 1500);
        
        // Cart bounce animation
        const cartButton = document.querySelector('.cart-button');
        cartButton.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            cartButton.style.animation = '';
        }, 500);
    });
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // Escape key closes cart
    if (e.key === 'Escape') {
        document.querySelector('.cart-dropdown').classList.remove('show');
        
        // Close mobile menu
        document.querySelector('.nav-menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    }
    
    // Space or Enter on CTA button
    if ((e.key === ' ' || e.key === 'Enter') && e.target === ctaButton) {
        e.preventDefault();
        ctaButton.click();
    }
});

// Performance Optimization
function optimizePerformance() {
    // Lazy load pizza images
    const pizzaImages = document.querySelectorAll('.pizza-photo');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.onload = () => {
                    img.style.transition = 'opacity 0.3s ease';
                    img.style.opacity = '1';
                };
                imageObserver.unobserve(img);
            }
        });
    });
    
    pizzaImages.forEach(img => imageObserver.observe(img));
    
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.querySelectorAll('.floating-ingredient').forEach(ingredient => {
            ingredient.style.animationDuration = '10s';
        });
    }
}

optimizePerformance();

// Final initialization message
console.log('🍕 Enhanced Bella Pizza website loaded successfully!');
console.log('🎉 Features loaded:');
console.log('- Pizza rain animation');
console.log('- Interactive shopping cart');
console.log('- Menu filtering system');
console.log('- Size selection');
console.log('- Easter egg pizza party mode');
console.log('- Mobile optimizations');
console.log('- Accessibility features');
console.log('- Performance optimizations');

// Add final touch - welcome message
setTimeout(() => {
    if (!sessionStorage.getItem('welcomeShown')) {
        const welcome = document.createElement('div');
        welcome.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                z-index: 10000;
                text-align: center;
                border: 3px solid var(--primary-color);
                animation: fadeInUp 0.5s ease;
            ">
                <h2 style="color: var(--primary-color); margin-bottom: 15px;">
                    🍕 Welcome to Bella Pizza! 🍕
                </h2>
                <p style="margin-bottom: 20px; color: #666;">
                    Click the logo 5 times for a surprise! 🎉
                </p>
                <button onclick="this.parentElement.parentElement.remove(); sessionStorage.setItem('welcomeShown', 'true');" 
                        style="
                            background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 25px;
                            cursor: pointer;
                            font-weight: bold;
                        ">
                    Let's Order! 🍕
                </button>
            </div>
        `;
        document.body.appendChild(welcome);
    }
}, 2000);