/* Mobile menu toggle */
document.getElementById('hamburger')?.addEventListener('click', () => {
  document.getElementById('nav-links')?.classList.toggle('show');
});

/* Smooth scroll with forced navbar reveal + lock */
let navLocked = false;

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const navbar = document.querySelector('.navbar');
    const navMenu = document.getElementById('nav-links');

    // Force navbar visible & lock it
    navLocked = true;
    navbar?.classList.remove('hide');

    // Close mobile menu
    navMenu?.classList.remove('show');

    requestAnimationFrame(() => {
      const navHeight = navbar?.offsetHeight || 0;

      const y =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    });

    // Unlock navbar after scroll finishes
    setTimeout(() => {
      navLocked = false;
    }, 700);
  });
});

/* Slider (fade) */
const slides = document.querySelectorAll('.slider img');
let index = 0;
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

function showSlide(nextIndex) {
  if (!slides.length) return;
  slides[index].classList.remove('active');
  index = (nextIndex + slides.length) % slides.length;
  slides[index].classList.add('active');
}

if (nextBtn && prevBtn && slides.length) {
  nextBtn.addEventListener('click', () => showSlide(index + 1));
  prevBtn.addEventListener('click', () => showSlide(index - 1));
}

/* Sticky CTA hide (hero + contact) */
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

/* Auto-close mobile nav on link click */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links')?.classList.remove('show');
  });
});

/* Scroll to top when clicking nav title */
const navTitle = document.getElementById('navTitle');
navTitle?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* Navbar behaviour on scroll (shrink + hide/show) */
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');
const topBar = document.querySelector('.top-bar');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Shrink navbar
  if (currentScrollY > 40) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  // Hide/show on scroll direction (mobile + desktop), respect navLocked
  if (!navLocked) {
    const scrollingDown = currentScrollY > lastScrollY;
    const pastThreshold = currentScrollY > 100;

    if (scrollingDown && pastThreshold) {
      navbar?.classList.add('hide');
      // Top bar only exists on desktop (mobile usually hidden via CSS)
      if (window.innerWidth > 760) topBar?.classList.add('hide');
    } else {
      navbar?.classList.remove('hide');
      topBar?.classList.remove('hide');
    }
  } else {
    // If locked, keep visible
    navbar?.classList.remove('hide');
    topBar?.classList.remove('hide');
  }

  lastScrollY = currentScrollY;
});
