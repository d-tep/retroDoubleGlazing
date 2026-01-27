/* Mobile menu toggle */
document.getElementById('hamburger')?.addEventListener('click', () => {
  document.getElementById('nav-links')?.classList.toggle('show');
});

/* Smooth scroll with forced navbar reveal + lock */
let navLocked = false;

document.querySelectorAll('a[href^="#"]').forEach((link) => {
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
        target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    });

    // Unlock navbar after scroll finishes
    setTimeout(() => {
      navLocked = false;
    }, 700);
  });
});

/* Sliders (fade) + Gallery grid  */
document.addEventListener('DOMContentLoaded', () => {
  // Before & After slider images
  const beforeAfterSlider = document.querySelector(
    '.slider[data-slider="before-after"]',
  );
  if (beforeAfterSlider) {
    const BA_IMAGES = [
      'images/baAssets/general-building-before.jpg',
      'images/baAssets/general-building-after.jpg',
      'images/baAssets/steamworks-before.jpg',
      'images/baAssets/steamworks-after.jpg',
      'images/baAssets/rot-stage0.jpg',
      'images/baAssets/rot-stage1.jpg',
      'images/baAssets/rot-stage2.jpg',
      'images/baAssets/wide-kitchen-before.jpg',
      'images/baAssets/wide-kitchen-after.jpg',
    ];
    const nextBtn = beforeAfterSlider.querySelector('.next');
    const prevBtn = beforeAfterSlider.querySelector('.prev');
    const firstBtn = prevBtn || nextBtn;

    // Clear any pre-existing images
    beforeAfterSlider.querySelectorAll('img').forEach((img) => img.remove());

    BA_IMAGES.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.loading = 'lazy';
      img.alt = (src.split('/').pop() || 'before after')
        .replace(/[-_]/g, ' ')
        .replace(/\.[^.]+$/, '');
      if (i === 0) img.classList.add('active');
      if (firstBtn) {
        beforeAfterSlider.insertBefore(img, firstBtn);
      } else {
        beforeAfterSlider.appendChild(img);
      }
    });
  }

  // Support multiple sliders
  document.querySelectorAll('.slider').forEach((slider) => {
    const slides = slider.querySelectorAll('img');
    let index = 0;
    const nextBtn = slider.querySelector('.next');
    const prevBtn = slider.querySelector('.prev');

    function showSlide(nextIndex) {
      if (!slides.length) return;
      slides[index]?.classList.remove('active');
      index = (nextIndex + slides.length) % slides.length;
      slides[index]?.classList.add('active');
    }

    if (nextBtn && prevBtn && slides.length) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(index + 1);
      });
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(index - 1);
      });
    }
  });

  // Gallery grid
  const galleryGrid = document.getElementById('galleryGrid');
  const prevPageBtn = document.querySelector('.gallery-prev');
  const nextPageBtn = document.querySelector('.gallery-next');
  const statusEl = document.querySelector('.gallery-status');

  if (galleryGrid && prevPageBtn && nextPageBtn && statusEl) {
    const IMAGES = [
      'images/service-retrofit.jpg',
      'images/service-joinery.png',
      'images/service-shower.jpg',
      'images/service-aluminium-frame.jpg',
      'images/service-balustrade.jpg',
      'images/gallery/aluminium-frame.jpg',
      'images/gallery/cat-flap.jpg',
      'images/gallery/checkerlight.jpg',
      'images/gallery/diningroom-doublehung.jpg',
      'images/gallery/doublehung.jpg',
      'images/gallery/empty-framing.jpg',
      'images/gallery/external-french.jpg',
      'images/gallery/frameless-balustrade.jpg',
      'images/gallery/hallway.jpg',
      'images/gallery/industrial-aluminium.jpg',
      'images/gallery/large-porch.jpg',
      'images/gallery/leadlight-doubleglaze.jpg',
      'images/gallery/modern-kitchen.jpg',
      'images/gallery/porch-triplet.jpg',
      'images/gallery/retrofit.jpg',
      'images/gallery/roller-shower.jpg',
      'images/gallery/rot-repair.jpg',
      'images/gallery/shower.jpg',
      'images/gallery/single-glazed.jpg',
      'images/gallery/skylight.jpg',
      'images/gallery/stair-balustrade-ext.jpeg',
      'images/gallery/stair-balustrade-int.jpg',
      'images/gallery/steamworks-building.jpg',
      'images/gallery/sunroom-pano.jpg',
      'images/gallery/the-one-and-only-glazier.jpg',
    ];

    const PER_PAGE = 12;
    let page = 0;
    const totalPages = Math.max(1, Math.ceil(IMAGES.length / PER_PAGE));

    function renderPage() {
      const start = page * PER_PAGE;
      const end = Math.min(start + PER_PAGE, IMAGES.length);
      const slice = IMAGES.slice(start, end);

      galleryGrid.innerHTML = slice
        .map((src, i) => {
          const alt =
            src
              .split('/')
              .pop()
              ?.replace(/[-_]/g, ' ')
              .replace(/\.[^.]+$/, '') || 'Gallery image';
          return `
          <button class="gallery-item" type="button" data-index="${start + i}" aria-label="Open image ${alt}">
            <img src="${src}" alt="${alt}" loading="lazy" />
          </button>
        `;
        })
        .join('');

      statusEl.textContent = `Page ${page + 1} of ${totalPages}`;
      prevPageBtn.disabled = page === 0;
      nextPageBtn.disabled = page >= totalPages - 1;
    }

    prevPageBtn.addEventListener('click', () => {
      if (page > 0) {
        page -= 1;
        renderPage();
      }
    });

    nextPageBtn.addEventListener('click', () => {
      if (page < totalPages - 1) {
        page += 1;
        renderPage();
      }
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    function openLightbox(index) {
      const src = IMAGES[index];
      const alt =
        src
          .split('/')
          .pop()
          ?.replace(/[-_]/g, ' ')
          .replace(/\.[^.]+$/, '') || '';
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    galleryGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.gallery-item');
      if (!btn) return;
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      if (!Number.isNaN(idx)) openLightbox(idx);
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox?.classList.contains('open'))
        closeLightbox();
    });

    renderPage();
  }
});

/* Sticky CTA hide (hero + contact) */
const sticky = document.getElementById('stickyCta');
const contact = document.getElementById('contact');
const hero = document.querySelector('.hero');

if (sticky && hero && contact) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sticky.classList.add('hidden');
        } else {
          sticky.classList.remove('hidden');
        }
      });
    },
    { threshold: 0.35 },
  );

  observer.observe(hero);
  observer.observe(contact);
}

/* Auto-close mobile nav on link click */
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links')?.classList.remove('show');
  });
});

/* Scroll to top when clicking nav title */
const navTitle = document.getElementById('navTitle');
navTitle?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
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
