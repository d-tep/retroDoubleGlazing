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
    navbar.classList.remove('hide');

    // Close mobile menu
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

    // Unlock navbar after scroll finishes
    setTimeout(() => {
      navLocked = false;
    }, 600);
  });
});


/* Slider (fade) */
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

if (navTitle) {
  navTitle.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


/* Nav title cross-fade helper */
function swapNavTitle(text) {
  if (!navTitle || navTitle.textContent === text) return;

  navTitle.classList.add('fade-out');

  setTimeout(() => {
    navTitle.textContent = text;
    navTitle.classList.remove('fade-out');
  }, 180);
}


/* Navbar scroll behaviour
   - shrink
   - title swap
   - mobile hide/show */
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Shrink navbar + swap title
  if (currentScrollY > 40) {
    navbar.classList.add('scrolled');
    swapNavTitle(navTitle?.dataset.short);
  } else {
    navbar.classList.remove('scrolled');
    swapNavTitle(navTitle?.dataset.full);
  }

  // Mobile hide-on-scroll (respect lock)
  if (window.innerWidth <= 760 && !navLocked) {
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.classList.add('hide');
    } else {
      navbar.classList.remove('hide');
    }
  } else {
    navbar.classList.remove('hide');
  }

  lastScrollY = currentScrollY;
});
