// Mobile menu toggle
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('show');
});

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const navbar = document.querySelector('.navbar');
    const navMenu = document.getElementById('nav-links');

    navbar.classList.remove('hide');

    if (navMenu) navMenu.classList.remove('show');

    requestAnimationFrame(() => {
      const navHeight = navbar.offsetHeight;

      const y =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    });
  });
});


// Slider fade
const slides = document.querySelectorAll('.slider img');
let index = 0;
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

function showSlide(nextIndex) {
  slides[index].classList.remove('active');
  index = (nextIndex + slides.length) % slides.length;
  slides[index].classList.add('active');
}

if (nextBtn && prevBtn && slides.length) {
  nextBtn.addEventListener('click', () => showSlide(index + 1));
  prevBtn.addEventListener('click', () => showSlide(index - 1));
}

// Hide sticky CTA when contact is visible
const sticky = document.getElementById('stickyCta');
const contact = document.getElementById('contact');
const hero = document.querySelector('.hero');

if (sticky && hero && contact) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sticky.classList.add('hidden');
      } else {
        sticky.classList.remove('hidden');
      }
    });
  }, { threshold: 0.35 });

  observer.observe(hero);
  observer.observe(contact);
}

// Auto-close mobile nav when link is clicked
const navLinks = document.querySelectorAll('.nav-links a');
const navMenu = document.getElementById('nav-links');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });
});


// Scroll to top when clicking nav title
const navTitle = document.getElementById('navTitle');

if (navTitle) {
  navTitle.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Hide navbar on scroll down (mobile only), show on scroll up
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const navbar = document.querySelector('.navbar');

  // Only apply on mobile
  if (window.innerWidth <= 760) {
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down
      navbar.classList.add('hide');
    } else {
      // Scrolling up
      navbar.classList.remove('hide');
    }
  } else {
    // Ensure navbar is always visible on desktop
    navbar.classList.remove('hide');
  }

  lastScrollY = currentScrollY;
});
