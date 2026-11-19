/* ================================
   THEME TOGGLE (light/dark mode)
=================================== */
function setupTheme() {
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  if (!toggle || !icon) return;

  // Load saved preference
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    updateIcon(saved);
  }

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon(next);
  });

  function updateIcon(theme) {
    icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
}

/* ================================
   SINGLE-PAGE NAV (smooth scroll + active highlight)
=================================== */
function setupNav() {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  // Click handling
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close mobile menu if open
      document.getElementById('nav-links')?.classList.remove('open');
    });
  });

  // Scroll spy
  function onScroll() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 80;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ================================
   MOBILE MENU & SIDEBAR
=================================== */
function setupMobile() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      backdrop.classList.remove('active');
    });
  }
}

/* ================================
   SCROLL REVEAL
=================================== */
function setupReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ================================
   SKILLS TABS
=================================== */
function setupSkillsTabs() {
  const tabs = document.querySelectorAll('.skills-tab');
  const contents = document.querySelectorAll('.skills-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(c => {
        c.classList.remove('active');
        if (c.id === 'tab-' + target) {
          c.classList.add('active');
        }
      });
    });
  });
}

/* ================================
   MODALS (portfolio cards + CV + resume + certificates)
=================================== */
function setupModals() {
  // Portfolio / gallery card clicks
  document.querySelectorAll('[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  // CV button
  const btnCV = document.getElementById('btn-view-cv');
  if (btnCV) {
    btnCV.addEventListener('click', () => openModal('modal-cv'));
  }

  // Resume button
  const btnResume = document.getElementById('btn-view-resume');
  if (btnResume) {
    btnResume.addEventListener('click', () => openModal('modal-resume'));
  }

  // Close buttons
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const overlay = btn.closest('.modal-overlay');
      if (overlay) closeModal(overlay.id);
    });
  });

  // Click outside
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(overlay => {
        closeModal(overlay.id);
      });
    }
  });
}

function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('active');
  document.body.style.overflow = '';

  // Pause any videos inside this modal
  el.querySelectorAll('video').forEach(v => v.pause());
}

/* ================================
   MAP OFFLINE FALLBACK
=================================== */
function setupMap() {
  const container = document.getElementById('map-container');
  if (!container) return;

  function update() {
    if (!navigator.onLine) {
      container.innerHTML = '<img src="assets/alt map.jpg" alt="Map fallback">';
    }
  }
  update();
  window.addEventListener('offline', update);
}

/* ================================
   VORTEXSHIFT INTERACTIVE PREVIEW
=================================== */
function setupVortexPreview() {
  const tabs = document.querySelectorAll('[data-vortex-tab]');
  const slides = document.querySelectorAll('#modal-vortex .slide-slide');
  const slideCurrentEl = document.getElementById('slide-current');
  let currentSlide = 1;
  const totalSlides = 12;

  // Tabs switching logic
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-vortex-tab');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('#modal-vortex .preview-content').forEach(c => {
        c.classList.remove('active');
      });
      document.getElementById('vortex-' + target + '-preview')?.classList.add('active');
    });
  });

  // Slide navigation function
  function showSlide(num) {
    if (num < 1 || num > totalSlides) return;
    currentSlide = num;

    slides.forEach(slide => {
      slide.classList.remove('active');
      if (parseInt(slide.getAttribute('data-slide')) === num) {
        slide.classList.add('active');
      }
    });

    if (slideCurrentEl) {
      slideCurrentEl.textContent = num;
    }
  }

  // Slide control listeners
  document.getElementById('slide-prev')?.addEventListener('click', () => {
    if (currentSlide > 1) showSlide(currentSlide - 1);
  });

  document.getElementById('slide-next')?.addEventListener('click', () => {
    if (currentSlide < totalSlides) showSlide(currentSlide + 1);
  });
}

/* ================================
   INIT
=================================== */
document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupNav();
  setupMobile();
  setupReveal();
  setupSkillsTabs();
  setupModals();
  setupVortexPreview();
  setupMap();
});