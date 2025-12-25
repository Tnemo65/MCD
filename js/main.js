/* ========================================
   LOVE CONFESSION WEBSITE - MAIN JAVASCRIPT
   ======================================== */

// ===== STATE MANAGEMENT =====
const state = {
    currentPage: 0,
    totalPages: 7,
    isTransitioning: false,
    audioPlaying: false,
    heartsInterval: null
};

// ===== DOM ELEMENTS =====
const elements = {
    pagesContainer: document.getElementById('pages-container'),
    pages: document.querySelectorAll('.page'),
    heartsContainer: document.getElementById('hearts-container'),
    sparklesContainer: document.getElementById('sparkles-container'),
    glowCursor: document.getElementById('glow-cursor'),
    audioToggle: document.getElementById('audio-toggle'),
    bgMusic: document.getElementById('bg-music'),
    
    // Menu
    menuToggle: document.getElementById('menu-toggle'),
    menuClose: document.getElementById('menu-close'),
    navMenu: document.getElementById('nav-menu'),
    menuOverlay: document.getElementById('menu-overlay'),
    menuItems: document.querySelectorAll('.nav-menu-item'),
    
    // Buttons
    btnStart: document.getElementById('btn-start'),
    btnToGallery: document.getElementById('btn-to-gallery'),
    btnToCouple: document.getElementById('btn-to-couple'),
    btnToConfession: document.getElementById('btn-to-confession'),
    btnYes: document.getElementById('btn-yes'),
    btnNo: document.getElementById('btn-no'),
    btnMessenger: document.getElementById('btn-messenger'),
    
    // Content elements
    introTitle: document.getElementById('intro-title'),
    introText: document.getElementById('intro-text'),
    confessionTitle: document.getElementById('confession-title'),
    confessionText: document.getElementById('confession-text'),
    finalTitle: document.getElementById('final-title'),
    finalText: document.getElementById('final-text'),
    finalDesc: document.getElementById('final-desc'),
    
    // Containers
    timeline: document.getElementById('timeline'),
    gallery: document.getElementById('gallery'),
    confettiContainer: document.getElementById('confetti-container')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initConfig();
    initMenu();
    initNavigation();
    initButtons();
    initAudio();
    initLoveScene(); // Initialize Love Scene here instead of separate listener
    startFloatingHearts();
    initScrollAnimations();
    initSparkles();
    initGlowCursor();
    initTypewriter();
});

// ===== CONFIG INITIALIZATION =====
function initConfig() {
    // Initialize carousel DOM refs first
    initCarouselDOMReferences();
    
    // If CONFIG loaded successfully, apply all config settings
    if (typeof CONFIG !== 'undefined') {
        // Apply config to elements
        if (CONFIG.introTitle && elements.introTitle) {
            elements.introTitle.textContent = CONFIG.introTitle;
        }
        if (CONFIG.introDesc && elements.introText) {
            elements.introText.innerHTML = CONFIG.introDesc.replace(/\n/g, '<br>');
        }
        
        // Apply confession title and description
        if (CONFIG.title && elements.confessionTitle) {
            elements.confessionTitle.textContent = CONFIG.title;
        }
        if (CONFIG.desc && elements.confessionText) {
            elements.confessionText.innerHTML = CONFIG.desc.replace(/\n/g, '<br>');
        }
        
        if (CONFIG.question && elements.confessionText) {
            const strongText = elements.confessionText.querySelector('strong');
            if (strongText) strongText.textContent = CONFIG.question;
        }
        if (CONFIG.mess && elements.finalTitle) {
            elements.finalTitle.textContent = CONFIG.mess;
        }
        if (CONFIG.messDesc && elements.finalDesc) {
            elements.finalDesc.textContent = CONFIG.messDesc;
        }
        if (CONFIG.messLink && elements.btnMessenger) {
            elements.btnMessenger.href = CONFIG.messLink;
        }
        if (CONFIG.btnYes && elements.btnYes) {
            elements.btnYes.textContent = CONFIG.btnYes;
        }
        if (CONFIG.btnNo && elements.btnNo) {
            elements.btnNo.textContent = CONFIG.btnNo;
        }
        
        // Apply timeline if exists
        if (CONFIG.timeline && elements.timeline) {
            renderTimeline(CONFIG.timeline);
        }
    }
    
    // ALWAYS initialize gallery (with fallback if CONFIG not loaded)
    const galleryData = (typeof CONFIG !== 'undefined' && CONFIG.gallery) 
        ? CONFIG.gallery 
        : defaultGallery;
    
    if (galleryData && carouselElements.carousel) {
        renderGallery(galleryData);
        console.log('🎠 Gallery initialized with', galleryData.length, 'images');
    }
    
    // Initialize couple gallery
    renderCoupleGallery();
}

// Default gallery fallback (for when CONFIG doesn't load)
const defaultGallery = [
    {
        src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=500&fit=crop',
        caption: 'Kỷ niệm đầu tiên 💕'
    },
    {
        src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=500&fit=crop',
        caption: 'Bên nhau mãi mãi 💗'
    },
    {
        src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&h=500&fit=crop',
        caption: 'Những nụ cười 😊'
    },
    {
        src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=500&fit=crop',
        caption: 'Hạnh phúc bên em 🥰'
    },
    {
        src: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=500&fit=crop',
        caption: 'Khoảnh khắc ngọt ngào 💖'
    },
    {
        src: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=400&h=500&fit=crop',
        caption: 'Yêu em nhiều lắm 💝'
    }
];

// ===== MENU SYSTEM =====
function initMenu() {
    if (!elements.menuToggle || !elements.navMenu) return;
    
    // Open menu
    elements.menuToggle.addEventListener('click', () => {
        elements.navMenu.classList.add('active');
        elements.menuOverlay.classList.add('active');
    });
    
    // Close menu
    const closeMenu = () => {
        elements.navMenu.classList.remove('active');
        elements.menuOverlay.classList.remove('active');
    };
    
    elements.menuClose.addEventListener('click', closeMenu);
    elements.menuOverlay.addEventListener('click', closeMenu);
    
    // Menu item click
    elements.menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageIndex = parseInt(item.dataset.page);
            
            // Update active state
            elements.menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
            
            // Navigate
            navigateToPage(pageIndex);
            
            // Close menu
            closeMenu();
        });
    });
}

// ===== NAVIGATION SYSTEM =====
function initNavigation() {
    // Keyboard navigation - DISABLED to allow free scrolling
    // document.addEventListener('keydown', handleKeyNavigation);
    
    // Touch/Swipe support - DISABLED to allow free scrolling
    /*
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0 && state.currentPage < state.totalPages - 1) {
                navigateToPage(state.currentPage + 1);
            } else if (diff < 0 && state.currentPage > 0) {
                navigateToPage(state.currentPage - 1);
            }
        }
    }, { passive: true });
    */
}

function handleKeyNavigation(e) {
    // DISABLED - arrow keys no longer change pages
    /*
    if (state.isTransitioning) return;
    
    switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
            if (state.currentPage < state.totalPages - 1) {
                navigateToPage(state.currentPage + 1);
            }
            break;
        case 'ArrowUp':
        case 'ArrowLeft':
            if (state.currentPage > 0) {
                navigateToPage(state.currentPage - 1);
            }
            break;
    }
    */
}

// FIXED Issue D: Debounce navigation to prevent double load
let navigationDebounceTimer = null;

function navigateToPage(pageIndex) {
    // Clear any pending navigation
    if (navigationDebounceTimer) {
        clearTimeout(navigationDebounceTimer);
    }
    
    // Debounce with 100ms delay
    navigationDebounceTimer = setTimeout(() => {
        _navigateToPageInternal(pageIndex);
    }, 100);
}

function _navigateToPageInternal(pageIndex) {
    if (state.isTransitioning || pageIndex === state.currentPage) return;
    if (pageIndex < 0 || pageIndex >= state.totalPages) return;
    
    state.isTransitioning = true;
    
    const currentPageEl = elements.pages[state.currentPage];
    const nextPageEl = elements.pages[pageIndex];
    
    // Use simple fade transition for smoothness
    const transitionType = 'transition';
    
    // Clear any existing transition classes
    currentPageEl.classList.remove('transition-in', 'transition-out', 
        'clip-transition-in', 'clip-transition-out',
        'morph-transition-in', 'morph-transition-out',
        'slide-rotate-in', 'slide-rotate-out');
    nextPageEl.classList.remove('transition-in', 'transition-out',
        'clip-transition-in', 'clip-transition-out', 
        'morph-transition-in', 'morph-transition-out',
        'slide-rotate-in', 'slide-rotate-out');
    
    // Apply exit animation to current page
    currentPageEl.classList.add(`${transitionType}-out`);
    currentPageEl.classList.remove('active');
    
    // Prepare and animate next page
    nextPageEl.style.visibility = 'visible';
    nextPageEl.classList.add(`${transitionType}-in`);
    
    // Update menu items with animation
    if (elements.menuItems && elements.menuItems.length > 0) {
        elements.menuItems.forEach(item => item.classList.remove('active'));
        if (elements.menuItems[pageIndex]) {
            elements.menuItems[pageIndex].classList.add('active');
        }
    }
    
    // After animation, update states
    setTimeout(() => {
        currentPageEl.classList.remove(`${transitionType}-out`);
        currentPageEl.style.visibility = 'hidden';
        
        nextPageEl.classList.remove(`${transitionType}-in`);
        nextPageEl.classList.add('active');
        
        state.currentPage = pageIndex;
        state.isTransitioning = false;
        
        // Trigger page-specific animations
        triggerPageAnimations(pageIndex);
    }, 600); // Reduced from 800ms for snappier feel
}

function triggerPageAnimations(pageIndex) {
    switch (pageIndex) {
        case 1: // Timeline page
            animateTimeline();
            break;
        case 2: // Gallery page
            animateGallery();
            break;
        case 3: // Couple gallery page
            animateCoupleGallery();
            break;
        case 6: // Final page is now index 6 (after adding couple page)
            startConfetti();
            break;
    }
}

// ===== BUTTON HANDLERS =====
let buttonsInitialized = false; // Flag to prevent duplicate initialization

function initButtons() {
    // Prevent duplicate initialization
    if (buttonsInitialized) {
        console.log('⚠️ Buttons already initialized, skipping...');
        return;
    }
    
    console.log('✓ Initializing buttons...');
    
    // Start button
    if (elements.btnStart) {
        elements.btnStart.addEventListener('click', () => {
            playSound('sound/tick.mp3');
            navigateToPage(1);
        });
    }
    
    // Gallery button
    if (elements.btnToGallery) {
        elements.btnToGallery.addEventListener('click', () => {
            playSound('sound/tick.mp3');
            navigateToPage(2);
        });
    }
    
    // Couple button
    if (elements.btnToCouple) {
        elements.btnToCouple.addEventListener('click', () => {
            playSound('sound/tick.mp3');
            navigateToPage(3);
        });
    }
    
    // Confession button
    if (elements.btnToConfession) {
        elements.btnToConfession.addEventListener('click', () => {
            playSound('sound/tick.mp3');
            navigateToPage(4);
        });
    }
    
    // Yes button
    if (elements.btnYes) {
        elements.btnYes.addEventListener('click', handleYesClick);
    }
    
    // No button (running away!)
    if (elements.btnNo) {
        initRunningButton();
    }
    
    // Mark as initialized
    buttonsInitialized = true;
    console.log('✓ Buttons initialized successfully');
}

function handleYesClick() {
    playSound('sound/tick.mp3');
    
    // Create heart burst effect
    createHeartBurst();
    
    // Navigate to Love Scene (page 5), then Final (page 6)
    setTimeout(() => {
        navigateToPage(5); // Love Scene is now page 5
    }, 800);
}

// ===== RUNNING BUTTON (No Button) =====
function initRunningButton() {
    let runCount = 0;
    
    const runAway = () => {
        runCount++;
        
        if (runCount <= 2) {
            // First few times: switch positions
            playSound('sound/Swish1.mp3');
            switchButtonPositions();
        } else {
            // After that: run randomly
            playSound('sound/duck.mp3');
            moveToRandomPosition();
        }
    };
    
    // Desktop: mouseover
    elements.btnNo.addEventListener('mouseenter', runAway);
    
    // Mobile: touch
    elements.btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        runAway();
    });
    
    // Click handler (just in case they somehow click it)
    elements.btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        runAway();
    });
}

function switchButtonPositions() {
    const yesBtn = elements.btnYes;
    const noBtn = elements.btnNo;
    
    // Get current positions
    const yesRect = yesBtn.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();
    
    // Swap order in DOM (simple approach)
    const parent = noBtn.parentNode;
    if (noBtn.previousElementSibling === yesBtn) {
        parent.insertBefore(noBtn, yesBtn);
    } else {
        parent.insertBefore(yesBtn, noBtn);
    }
}

function moveToRandomPosition() {
    const noBtn = elements.btnNo;
    const container = noBtn.closest('.confession-box') || noBtn.parentNode;
    const containerRect = container.getBoundingClientRect();
    
    // Make button position absolute if not already
    noBtn.style.position = 'absolute';
    
    // Calculate random position within container
    const maxX = containerRect.width - noBtn.offsetWidth - 20;
    const maxY = containerRect.height - noBtn.offsetHeight - 20;
    
    const randomX = Math.max(10, Math.random() * maxX);
    const randomY = Math.max(10, Math.random() * maxY);
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// ===== FLOATING HEARTS =====
function startFloatingHearts() {
    const hearts = ['💕', '💗', '💖', '💝', '💓', '❤️', '🩷', '💘'];
    
    const createHeart = () => {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Random properties
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 16) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        elements.heartsContainer.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 10000);
    };
    
    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 500);
    }
    
    // Continue creating hearts
    state.heartsInterval = setInterval(createHeart, 2000);
}

function createHeartBurst() {
    const burst = 20;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < burst; i++) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = '💕';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.position = 'fixed';
        heart.style.zIndex = '1000';
        
        // Burst animation
        const angle = (i / burst) * Math.PI * 2;
        const distance = Math.random() * 200 + 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        heart.style.transition = 'all 0.8s ease-out';
        elements.heartsContainer.appendChild(heart);
        
        requestAnimationFrame(() => {
            heart.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
            heart.style.opacity = '0';
        });
        
        setTimeout(() => heart.remove(), 1000);
    }
}

// ===== CONFETTI =====
function startConfetti() {
    const colors = ['#ff6b9d', '#ff8fab', '#ffc0cb', '#fac6ce', '#f6cbd2', '#ffeb3b', '#4caf50'];
    const shapes = ['square', 'circle'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)] === 'circle' ? '50%' : '0';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            elements.confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Timeline items observer
    const timelineItems = document.querySelectorAll('.timeline-item');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Make first items visible initially (when on that page)
    timelineItems.forEach(item => item.classList.add('visible'));
    galleryItems.forEach(item => item.classList.add('visible'));
}

function animateTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
        item.classList.remove('visible');
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 200);
    });
}

function animateGallery() {
    // Re-render carousel to trigger entry animation
    if (carouselElements.carousel && carouselState.totalItems > 0) {
        // Reset to first item when entering gallery page
        carouselState.currentIndex = 0;
        renderCarousel();
    }
}

// ===== AUDIO CONTROLS =====
function initAudio() {
    if (!elements.audioToggle || !elements.bgMusic) return;
    
    elements.audioToggle.addEventListener('click', toggleAudio);
    
    // Try to autoplay (may be blocked by browser)
    elements.bgMusic.volume = 0.5;
    
    // Enable audio on first user interaction
    document.addEventListener('click', enableAudioOnInteraction, { once: true });
    document.addEventListener('touchstart', enableAudioOnInteraction, { once: true });
}

function enableAudioOnInteraction() {
    if (!state.audioPlaying) {
        elements.bgMusic.play().then(() => {
            state.audioPlaying = true;
            elements.audioToggle.classList.add('playing');
        }).catch(() => {
            // Audio blocked, user needs to click audio button
        });
    }
}

function toggleAudio() {
    if (state.audioPlaying) {
        elements.bgMusic.pause();
        state.audioPlaying = false;
        elements.audioToggle.classList.remove('playing');
    } else {
        elements.bgMusic.play().then(() => {
            state.audioPlaying = true;
            elements.audioToggle.classList.add('playing');
        }).catch(console.error);
    }
}

function playSound(src) {
    try {
        const audio = new Audio(src);
        audio.volume = 0.5;
        audio.play().catch(() => {});
    } catch (e) {
        // Sound not available
    }
}

// ===== DYNAMIC CONTENT RENDERERS =====
function renderTimeline(timelineData) {
    if (!Array.isArray(timelineData) || !elements.timeline) return;
    
    elements.timeline.innerHTML = '';
    
    timelineData.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        const imageHtml = item.image ? `
            <div class="timeline-image">
                <img src="${item.image}" alt="${item.title || 'Kỷ niệm'}" 
                     onerror="this.src='https://placehold.co/400x250/ffc0cb/fff?text=📸+Kỷ+niệm'">
            </div>
        ` : '';
        timelineItem.innerHTML = `
            <div class="timeline-icon">${item.icon || '💕'}</div>
            <div class="timeline-content">
                <div class="timeline-text">
                    <span class="timeline-date">${item.date || ''}</span>
                    <h3>${item.title || ''}</h3>
                    <p>${item.description || ''}</p>
                </div>
                ${imageHtml}
            </div>
        `;
        elements.timeline.appendChild(timelineItem);
    });
}

/**
 * Render Couple Gallery - Flip Card Design
 */
function renderCoupleGallery() {
    const coupleGallery = document.getElementById('couple-gallery');
    if (!coupleGallery) return;
    
    // Get couple data from CONFIG
    const coupleData = (typeof CONFIG !== 'undefined' && CONFIG.coupleGallery) 
        ? CONFIG.coupleGallery 
        : [];
    
    if (!coupleData.length) {
        console.warn('No couple gallery data found');
        return;
    }
    
    coupleGallery.innerHTML = '';
    
    coupleData.forEach((pair, index) => {
        // Create flip card container
        const flipCard = document.createElement('div');
        flipCard.className = 'couple-flip-card';
        flipCard.dataset.index = index;
        
        flipCard.innerHTML = `
            <div class="couple-flip-card-inner">
                <!-- Front Face (First Image) -->
                <div class="couple-flip-card-front">
                    <img src="${pair.left}" alt="${pair.caption || 'Khoảnh khắc bên nhau'} - Ảnh 1" 
                         onerror="this.src='https://placehold.co/300x400/ffc0cb/fff?text=💕'">
                    <div class="flip-indicator">🔄</div>
                </div>
                
                <!-- Back Face (Second Image) -->
                <div class="couple-flip-card-back">
                    <img src="${pair.right}" alt="${pair.caption || 'Khoảnh khắc bên nhau'} - Ảnh 2" 
                         onerror="this.src='https://placehold.co/300x400/ffc0cb/fff?text=💕'">
                    <div class="flip-indicator">🔄</div>
                </div>
            </div>
        `;
        
        // Add click event to flip the card
        flipCard.addEventListener('click', function() {
            this.classList.toggle('flipped');
            // Play sound effect
            playSound('sound/Swish1.mp3');
        });
        
        // Add touch support for mobile
        flipCard.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.classList.toggle('flipped');
            playSound('sound/Swish1.mp3');
        });
        
        coupleGallery.appendChild(flipCard);
    });
    
    console.log('🎴 Couple gallery rendered with', coupleData.length, 'flip cards');
}

/**
 * Animate couple gallery on page load
 */
function animateCoupleGallery() {
    // Cards will use CSS animation on load
    // We can add additional JS animations here if needed
    const cards = document.querySelectorAll('.couple-flip-card');
    cards.forEach((card, index) => {
        // Reset any flipped cards when page is visited
        card.classList.remove('flipped');
    });
}

/**
 * ====================================================
 * 3D CAROUSEL SYSTEM
 * ====================================================
 * Professional-grade 3D carousel implementation
 * with state management, smooth animations, and
 * keyboard/touch support
 * ====================================================
 */

// 3D Carousel State
const carouselState = {
    currentIndex: 0,
    totalItems: 0,
    isAnimating: false,
    translateZ: 500, // Larger circle to space out images
    animationDuration: 600
};

// 3D Carousel DOM References
const carouselElements = {
    carousel: null,
    indicators: null,
    prevBtn: null,
    nextBtn: null,
    items: [],
    dots: []
};

/**
 * Initialize 3D Carousel DOM References
 */
function initCarouselDOMReferences() {
    carouselElements.carousel = document.getElementById('carousel3d');
    carouselElements.indicators = document.getElementById('carouselIndicators');
    carouselElements.prevBtn = document.getElementById('carouselPrev');
    carouselElements.nextBtn = document.getElementById('carouselNext');
}

/**
 * Calculate rotation angle for each carousel item
 * @param {number} index - Item index
 * @returns {number} Rotation angle in degrees
 */
function calculateCarouselAngle(index) {
    const angleStep = 360 / carouselState.totalItems;
    return angleStep * index;
}

/**
 * Render 3D carousel items
 * @param {Array} galleryData - Array of gallery items
 */
function renderGallery(galleryData) {
    // Initialize DOM references
    initCarouselDOMReferences();
    
    if (!Array.isArray(galleryData) || !carouselElements.carousel) return;
    
    // Update state
    carouselState.totalItems = galleryData.length;
    carouselState.currentIndex = 0;
    
    // Clear existing content
    carouselElements.carousel.innerHTML = '';
    if (carouselElements.indicators) {
        carouselElements.indicators.innerHTML = '';
    }
    
    // Create carousel items
    const fragment = document.createDocumentFragment();
    
    galleryData.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        carouselItem.dataset.index = index;
        carouselItem.dataset.title = item.caption || ''; // For CSS ::after overlay
        
        // Create image element
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.caption || 'Kỷ niệm';
        img.loading = 'lazy';
        img.onerror = function() {
            this.src = 'https://placehold.co/300x400/ffc0cb/fff?text=💕';
        };
        
        carouselItem.appendChild(img);
        
        // Position each item in 3D space
        const angle = calculateCarouselAngle(index);
        carouselItem.style.transform = `rotateY(${angle}deg) translateZ(${carouselState.translateZ}px)`;
        
        fragment.appendChild(carouselItem);
    });
    
    carouselElements.carousel.appendChild(fragment);
    carouselElements.items = Array.from(carouselElements.carousel.querySelectorAll('.carousel-item'));
    
    // Create indicator dots
    renderCarouselIndicators();
    
    // Setup event listeners
    setupCarouselEventListeners();
    
    // Initial render
    renderCarousel();
    
    console.log('🎠 3D Carousel initialized with', carouselState.totalItems, 'items');
}

/**
 * Render carousel indicators
 */
function renderCarouselIndicators() {
    if (!carouselElements.indicators) return;
    
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < carouselState.totalItems; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-indicator';
        dot.dataset.index = i;
        dot.setAttribute('aria-label', `Xem ảnh ${i + 1}`);
        fragment.appendChild(dot);
    }
    
    carouselElements.indicators.appendChild(fragment);
    carouselElements.dots = Array.from(carouselElements.indicators.querySelectorAll('.carousel-indicator'));
}

/**
 * Main render function - updates carousel based on current state
 * Each item is rotated individually so the focused item always faces straight (rotateY(0deg))
 */
function renderCarousel() {
    if (!carouselElements.carousel || carouselState.totalItems === 0) return;
    
    const angleStep = 360 / carouselState.totalItems;
    
    // Update each item's transform individually
    // This ensures the focused item always has rotateY(0deg) - facing straight at viewer
    carouselElements.items.forEach((item, index) => {
        const isFocused = index === carouselState.currentIndex;
        
        // Calculate relative angle from current index
        // Focused item = 0deg, others rotate around it
        const relativeIndex = index - carouselState.currentIndex;
        const angle = relativeIndex * angleStep;
        
        // Apply transform: focused item faces straight (0deg), others rotate around
        item.style.transform = `rotateY(${angle}deg) translateZ(${carouselState.translateZ}px)`;
        
        // Update focused class and aria
        item.classList.toggle('focused', isFocused);
        item.setAttribute('aria-current', isFocused ? 'true' : 'false');
    });
    
    // Update indicators
    carouselElements.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === carouselState.currentIndex);
    });
}

/**
 * Navigate to specific carousel index
 * @param {number} index - Target index
 */
function goToCarouselIndex(index) {
    // Prevent navigation during animation
    if (carouselState.isAnimating) return;
    
    // Normalize index (wrap around)
    let newIndex = index % carouselState.totalItems;
    if (newIndex < 0) newIndex += carouselState.totalItems;
    
    // Set animating flag
    carouselState.isAnimating = true;
    
    // Update state and render
    carouselState.currentIndex = newIndex;
    renderCarousel();
    
    // Play sound effect
    playSound('sound/tick.mp3');
    
    // Reset animating flag after transition
    setTimeout(() => {
        carouselState.isAnimating = false;
    }, carouselState.animationDuration);
}

/**
 * Navigate to next carousel image
 */
function goToNextCarouselItem() {
    goToCarouselIndex(carouselState.currentIndex + 1);
}

/**
 * Navigate to previous carousel image
 */
function goToPrevCarouselItem() {
    goToCarouselIndex(carouselState.currentIndex - 1);
}

/**
 * Handle carousel item click
 * @param {Event} event - Click event
 */
function handleCarouselItemClick(event) {
    const item = event.target.closest('.carousel-item');
    if (!item) return;
    
    const index = parseInt(item.dataset.index, 10);
    goToCarouselIndex(index);
}

/**
 * Handle carousel indicator click
 * @param {Event} event - Click event
 */
function handleCarouselIndicatorClick(event) {
    const dot = event.target.closest('.carousel-indicator');
    if (!dot) return;
    
    const index = parseInt(dot.dataset.index, 10);
    goToCarouselIndex(index);
}

/**
 * Handle keyboard navigation for carousel
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleCarouselKeyDown(event) {
    // Only handle when on gallery page
    if (state.currentPage !== 2) return;
    
    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            goToPrevCarouselItem();
            break;
        case 'ArrowRight':
            event.preventDefault();
            goToNextCarouselItem();
            break;
        // Number keys 1-9 for direct navigation
        case '1': case '2': case '3': case '4': case '5':
        case '6': case '7': case '8': case '9':
            const targetIndex = parseInt(event.key, 10) - 1;
            if (targetIndex < carouselState.totalItems) {
                goToCarouselIndex(targetIndex);
            }
            break;
    }
}

/**
 * Setup touch swipe support for carousel
 */
function setupCarouselTouchSupport() {
    if (!carouselElements.carousel) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;
    
    carouselElements.carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselElements.carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const distance = touchEndX - touchStartX;
        
        if (Math.abs(distance) < minSwipeDistance) return;
        
        if (distance > 0) {
            goToPrevCarouselItem(); // Swipe right = previous
        } else {
            goToNextCarouselItem(); // Swipe left = next
        }
    }, { passive: true });
}

/**
 * Setup all carousel event listeners
 */
function setupCarouselEventListeners() {
    // Navigation buttons
    if (carouselElements.prevBtn) {
        carouselElements.prevBtn.addEventListener('click', goToPrevCarouselItem);
    }
    if (carouselElements.nextBtn) {
        carouselElements.nextBtn.addEventListener('click', goToNextCarouselItem);
    }
    
    // Carousel item clicks (event delegation)
    if (carouselElements.carousel) {
        carouselElements.carousel.addEventListener('click', handleCarouselItemClick);
    }
    
    // Indicator clicks (event delegation)
    if (carouselElements.indicators) {
        carouselElements.indicators.addEventListener('click', handleCarouselIndicatorClick);
    }
    
    // Keyboard navigation (added globally, checks page state)
    document.addEventListener('keydown', handleCarouselKeyDown);
    
    // Touch swipe support
    setupCarouselTouchSupport();
}

// ===== UTILITIES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== SPARKLE PARTICLES =====
function initSparkles() {
    if (!elements.sparklesContainer) return;
    
    const createSparkle = () => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random position
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        elements.sparklesContainer.appendChild(sparkle);
        
        // Remove after animation
        setTimeout(() => sparkle.remove(), 5000);
    };
    
    // Create initial sparkles
    for (let i = 0; i < 15; i++) {
        setTimeout(createSparkle, i * 200);
    }
    
    // Continue creating sparkles
    setInterval(createSparkle, 500);
}

// ===== GLOW CURSOR EFFECT =====
function initGlowCursor() {
    if (!elements.glowCursor) return;
    
    // Only on desktop
    if (window.innerWidth < 768) {
        elements.glowCursor.style.display = 'none';
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth follow animation
    function animateCursor() {
        const speed = 0.1;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        elements.glowCursor.style.left = cursorX + 'px';
        elements.glowCursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
    if (!elements.introTitle) return;
    
    const originalText = elements.introTitle.textContent;
    elements.introTitle.textContent = '';
    elements.introTitle.style.opacity = '1';
    
    let charIndex = 0;
    
    function typeChar() {
        if (charIndex < originalText.length) {
            elements.introTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 100);
        } else {
            // Add blinking cursor at end
            elements.introTitle.classList.add('typewriter-done');
        }
    }
    
    // Start after a short delay
    setTimeout(typeChar, 500);
}

// ===== RIPPLE EFFECT FOR BUTTONS =====
document.addEventListener('click', (e) => {
    const button = e.target.closest('.btn-primary, .btn-yes');
    if (!button) return;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});

/* ========================================
   LOVE SCENE MODULE
   Chat Panel with Typing Effect → Love Letter
   ======================================== */

// Love Scene State
const loveSceneState = {
    isStarted: false,
    isTyping: false,
    currentMessageIndex: 0,
    typingSpeed: 50, // ms per character
    messageDelay: 800, // delay between messages
    messages: []
};

// Love Scene DOM Elements
const loveSceneElements = {
    startBtn: null,
    chatPanel: null,
    chatMessages: null,
    loveLetter: null,
    letterContent: null
};

// Default messages (can be overridden by config)
const defaultLoveMessages = [
    { type: 'sent', text: 'Em ơi...' },
    { type: 'received', text: 'Gì vậy anh?' },
    { type: 'sent', text: 'Anh có điều muốn nói với em...' },
    { type: 'received', text: 'Nói đi anh 😊' },
    { type: 'sent', text: 'Từ lần đầu gặp em, anh đã biết em là người đặc biệt' },
    { type: 'sent', text: 'Mỗi ngày trôi qua, cảm xúc ấy càng lớn hơn...' },
    { type: 'received', text: '...' },
    { type: 'sent', text: 'Em khiến anh muốn trở thành người tốt hơn 💕' },
    { type: 'sent', text: 'Anh không giỏi nói lời hoa mỹ...' },
    { type: 'sent', text: 'Nhưng anh muốn em biết rằng...' },
    { type: 'sent', text: 'Trái tim anh, từ lâu đã thuộc về em rồi 💝' },
    { type: 'received', text: 'Anh... 🥺💕' }
];

// Default love letter content
const defaultLoveLetter = [
    'Em yêu ơi,',
    'Anh viết những dòng này với trái tim đầy yêu thương.',
    'Từ lần đầu gặp em, anh đã biết em là người đặc biệt.',
    'Mỗi ngày trôi qua, cảm xúc ấy càng lớn hơn.',
    'Em khiến anh muốn trở thành người tốt hơn.',
    'Anh không giỏi nói lời hoa mỹ, nhưng anh muốn em biết...',
    'Trái tim anh, từ lâu đã thuộc về em rồi.',
    '',
    'Anh yêu em nhiều lắm 💕'
];

/**
 * Initialize Love Scene DOM References
 */
function initLoveSceneDOMReferences() {
    loveSceneElements.startBtn = document.getElementById('love-scene-start');
    loveSceneElements.chatPanel = document.getElementById('chat-panel');
    loveSceneElements.chatMessages = document.getElementById('chat-messages');
    loveSceneElements.loveLetter = document.getElementById('love-letter'); // Now points to letter-paper
    loveSceneElements.letterContent = document.getElementById('letter-content');
}

/**
 * Initialize Love Scene
 */
function initLoveScene() {
    initLoveSceneDOMReferences();
    
    if (!loveSceneElements.startBtn) return;
    
    // Load messages from config or use defaults
    loveSceneState.messages = (typeof CONFIG !== 'undefined' && CONFIG.loveScene?.messages)
        ? CONFIG.loveScene.messages
        : defaultLoveMessages;
    
    // Add click listener to start button
    loveSceneElements.startBtn.addEventListener('click', startLoveScene);
    
    console.log('💌 Love Scene initialized with', loveSceneState.messages.length, 'messages');
}

/**
 * Start the Love Scene
 */
function startLoveScene() {
    if (loveSceneState.isStarted) return;
    loveSceneState.isStarted = true;
    
    // Hide start button completely
    loveSceneElements.startBtn.classList.add('hidden');
    loveSceneElements.startBtn.style.display = 'none';
    
    // Show love letter directly with typewriter effect (skip chat)
    setTimeout(() => {
        showLoveLetterDirect();
    }, 500);
}

/**
 * Show the next message with typing effect
 */
function showNextMessage() {
    if (loveSceneState.currentMessageIndex >= loveSceneState.messages.length) {
        // All messages done - transform to love letter
        setTimeout(transformToLoveLetter, 1500);
        return;
    }
    
    const message = loveSceneState.messages[loveSceneState.currentMessageIndex];
    
    // Show typing indicator for received messages
    if (message.type === 'received') {
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            displayMessage(message);
        }, 1000 + Math.random() * 500);
    } else {
        // For sent messages, just show with slight delay
        setTimeout(() => {
            displayMessage(message);
        }, 300);
    }
}

/**
 * Display a message with typing effect
 */
function displayMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${message.type}`;
    
    // Create text span for typing effect
    const textSpan = document.createElement('span');
    textSpan.className = 'message-text';
    messageEl.appendChild(textSpan);
    
    // Add cursor for typing effect
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    messageEl.appendChild(cursor);
    
    loveSceneElements.chatMessages.appendChild(messageEl);
    
    // Auto-scroll to bottom
    scrollChatToBottom();
    
    // Type out the message
    typeText(textSpan, message.text, () => {
        // Remove cursor after typing done
        cursor.remove();
        
        // Move to next message
        loveSceneState.currentMessageIndex++;
        setTimeout(showNextMessage, loveSceneState.messageDelay);
    });
}

/**
 * Type text character by character
 */
function typeText(element, text, callback) {
    let index = 0;
    loveSceneState.isTyping = true;
    
    function typeChar() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            scrollChatToBottom();
            setTimeout(typeChar, loveSceneState.typingSpeed);
        } else {
            loveSceneState.isTyping = false;
            if (callback) callback();
        }
    }
    
    typeChar();
}

/**
 * Show typing indicator (bouncing dots)
 */
function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    loveSceneElements.chatMessages.appendChild(indicator);
    scrollChatToBottom();
}

/**
 * Remove typing indicator
 */
function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

/**
 * Scroll chat to bottom
 */
function scrollChatToBottom() {
    if (loveSceneElements.chatMessages) {
        loveSceneElements.chatMessages.scrollTop = loveSceneElements.chatMessages.scrollHeight;
    }
}

/**
 * Show love letter directly with typewriter effect (skip chat)
 */
function showLoveLetterDirect() {
    // Get letter content from config or defaults
    const letterLines = (typeof CONFIG !== 'undefined' && CONFIG.loveScene?.loveLetter)
        ? CONFIG.loveScene.loveLetter
        : defaultLoveLetter;
    
    // Clear letter content
    loveSceneElements.letterContent.innerHTML = '';
    
    // Show love letter container
    loveSceneElements.loveLetter.style.display = 'block';
    loveSceneElements.loveLetter.classList.add('visible');
    
    // Add each line as a paragraph and apply typewriter effect
    let cumulativeDelay = 300; // Start delay
    
    letterLines.forEach((line, index) => {
        const p = document.createElement('p');
        p.style.opacity = '0';
        p.textContent = ''; // Start empty for typewriter
        loveSceneElements.letterContent.appendChild(p);
        
        // Apply typewriter effect with cumulative delay
        setTimeout(() => {
            typewriterEffect(p, line, 30); // 30ms per character
        }, cumulativeDelay);
        
        // Calculate next delay: current line length * speed + pause between lines
        const lineDelay = line.length > 0 ? (line.length * 30) + 400 : 200;
        cumulativeDelay += lineDelay;
    });
    
    // Heart burst effect after some content appears
    setTimeout(createHeartBurst, 1500);
}

/**
 * Typewriter effect for individual element
 * @param {HTMLElement} element - Element to apply effect to
 * @param {string} text - Text to type out
 * @param {number} speed - Speed in ms per character
 */
function typewriterEffect(element, text, speed = 50) {
    let index = 0;
    element.style.opacity = '1';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/**
 * Transform chat panel to love letter
 */
function transformToLoveLetter() {
    // Fade out chat panel
    loveSceneElements.chatPanel.classList.add('fade-out');
    
    // Get letter content from config or defaults
    const letterLines = (typeof CONFIG !== 'undefined' && CONFIG.loveScene?.loveLetter)
        ? CONFIG.loveScene.loveLetter
        : defaultLoveLetter;
    
    // Build letter content
    loveSceneElements.letterContent.innerHTML = '';
    letterLines.forEach((line, index) => {
        const p = document.createElement('p');
        p.textContent = line;
        p.style.animationDelay = `${index * 2}s`; // Increased to 2s per paragraph
        loveSceneElements.letterContent.appendChild(p);
    });
    
    // Show love letter after chat fades
    setTimeout(() => {
        loveSceneElements.chatPanel.style.display = 'none';
        
        // Explicitly show love letter
        loveSceneElements.loveLetter.style.display = 'block';
        loveSceneElements.loveLetter.classList.add('visible');
        
        // Create heart burst effect
        createHeartBurst();
    }, 600);
}

/**
 * Reset Love Scene (for replay)
 */
function resetLoveScene() {
    loveSceneState.isStarted = false;
    loveSceneState.currentMessageIndex = 0;
    loveSceneState.isTyping = false;
    
    // Reset UI
    if (loveSceneElements.startBtn) {
        loveSceneElements.startBtn.classList.remove('hidden');
    }
    if (loveSceneElements.chatPanel) {
        loveSceneElements.chatPanel.classList.remove('active', 'fade-out');
        loveSceneElements.chatPanel.style.display = '';
    }
    if (loveSceneElements.chatMessages) {
        loveSceneElements.chatMessages.innerHTML = '';
    }
    if (loveSceneElements.loveLetter) {
        loveSceneElements.loveLetter.classList.remove('visible');
    }
}
