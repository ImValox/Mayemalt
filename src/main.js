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

// Add to main.js or a script tag
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');
  
  // Show button when scrolling down 100px
  window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
          backToTop.style.display = 'flex';
      } else {
          backToTop.style.display = 'none';
      }
  });

  // Smooth scroll to top
  backToTop.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});