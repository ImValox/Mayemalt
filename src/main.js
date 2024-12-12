const ANIMATION_DURATION = 600;
const SCROLL_THRESHOLD = 100;
const LOADER_DELAY = 2000;
const FADE_DURATION = 500;
const IMAGE_INTERVAL = 3000;

const swiperConfig = {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 1, spaceBetween: 30 }
    }
};

const swiper = new Swiper('.swiper-container', swiperConfig);

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    const elements = {
        backToTop: document.getElementById('backToTop'),
        loader: document.querySelector('.loader-container'),
        hamburger: document.querySelector('.hamburger'),
        navMenu: document.querySelector('.nav-menu'),
        images: document.querySelectorAll('.bieres-anim')
    };

    initializeLoader(elements.loader);
    initializeNavigation(elements.hamburger, elements.navMenu);
    initializeScrollToTop(elements.backToTop);
    initializeImageAnimation(elements.images);
}

function initializeLoader(loader) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', FADE_DURATION);
        }, LOADER_DELAY);
    });
}

function initializeNavigation(hamburger, navMenu) {
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function initializeScrollToTop(backToTop) {
    if (!backToTop) return;

    let isScrolling = false;
    const throttleScroll = () => {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                backToTop.classList.toggle('visible', window.scrollY > SCROLL_THRESHOLD);
                isScrolling = false;
            });
            isScrolling = true;
        }
    };

    window.addEventListener('scroll', throttleScroll, { passive: true });
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToTop();
    });
}

function smoothScrollToTop() {
    const start = window.pageYOffset;
    const startTime = performance.now();

    const easeInOutCubic = t => t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    function animate(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / ANIMATION_DURATION, 1);

        window.scrollTo(0, start * (1 - easeInOutCubic(progress)));

        if (timeElapsed < ANIMATION_DURATION) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function initializeImageAnimation(images) {
    if (!images.length) return;

    const imageSources = [
        'src/images/biere-vide.png',
        'src/images/biere-remplissage.png',
        'src/images/biere-pleine.png'
    ];
    
    let currentIndex = 0;

    setInterval(() => {
        images.forEach(image => {
            image.src = imageSources[currentIndex];
        });
        currentIndex = (currentIndex + 1) % imageSources.length;
    }, IMAGE_INTERVAL);
}