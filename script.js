// Mobile menu toggle
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('show');
});

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const navHeight = document.querySelector('.navbar').offsetHeight;
    const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;

    window.scrollTo({ top: y, behavior: 'smooth' });
    document.getElementById('nav-links').classList.remove('show');
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

// Shrink navbar on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
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
