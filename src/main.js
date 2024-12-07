import './style.css'

const swiper = new Swiper('.swiper-container', {
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
    
    effect: 'slide',
    
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 30
      }
    }
  });

document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('backToTop');
    let isScrolling = false;

    // Throttle scroll event
    const throttleScroll = () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 100) {
                    backToTop?.classList.add('visible');
                } else {
                    backToTop?.classList.remove('visible');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    };

    const smoothScrollToTop = () => {
        const duration = 600;
        const start = window.pageYOffset;
        const startTime = performance.now();

        const easeInOutCubic = t => t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const animation = currentTime => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const currentPosition = start * (1 - easeInOutCubic(progress));

            window.scrollTo(0, currentPosition);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    // Event Listeners
    window.addEventListener('scroll', throttleScroll, { passive: true });
    backToTop?.addEventListener('click', e => {
        e.preventDefault();
        smoothScrollToTop();
    });

    // Cleanup
    return () => {
        window.removeEventListener('scroll', throttleScroll);
        backToTop?.removeEventListener('click', smoothScrollToTop);
    };
});

const images = document.querySelectorAll('.bieres-anim');
const imageSources = [
  'src/images/biere-vide.png',
  'src/images/biere-remplissage.png',
  'src/images/biere-pleine.png'
];

let currentIndex = 0;

const changeImageSource = () => {
  images.forEach(image => {
    image.src = imageSources[currentIndex];
  });
  currentIndex = (currentIndex + 1) % imageSources.length;
};

setInterval(changeImageSource, 3000);