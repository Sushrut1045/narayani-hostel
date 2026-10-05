/* ============================================================
   NARAYANI HOSTEL — MAIN JAVASCRIPT
   ============================================================ */

'use strict';

/* ── DOM Ready ── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

function initAll() {
  initNavbar();
  initHamburger();
  initScrollReveal();
  initBackToTop();
  initFAQ();
  initSmoothScroll();
  closeMobileMenuOnNavClick();
  initFacilitiesInteractive();
}

/* ══════════════════════════════════════════
   NAVBAR — Scroll Effect
══════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load
}

/* ══════════════════════════════════════════
   HAMBURGER / MOBILE MENU
══════════════════════════════════════════ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));

    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

function closeMobileMenuOnNavClick() {
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (!mobileMenu) return;

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════════
   SMOOTH SCROLL for anchor links
══════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ══════════════════════════════════════════
   ROOM TABS
══════════════════════════════════════════ */
function switchRoom(type, btn) {
  // Hide all panels
  document.querySelectorAll('.room-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  // Deactivate all tabs
  document.querySelectorAll('.room-tab').forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });
  // Show selected panel
  const targetPanel = document.getElementById('tab-' + type);
  if (targetPanel) targetPanel.classList.add('active');
  // Activate clicked tab
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  }
}

/* ══════════════════════════════════════════
   GALLERY FILTER
══════════════════════════════════════════ */
function filterGallery(cat, btn) {
  // Update active filter button
  document.querySelectorAll('.gallery-filter').forEach(f => f.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Filter items
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    const itemCat = item.getAttribute('data-cat');
    if (cat === 'all' || itemCat === cat) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

/* ══════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════ */
function openLightbox(item) {
  const img = item.querySelector('img');
  if (!img) return;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  const captionEl = document.getElementById('lightboxCaption');
  if (captionEl) {
    captionEl.textContent = img.alt || '';
  }
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Trap focus
  lightbox.focus();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

/* ══════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════ */
function initFAQ() {
  // Also handle keyboard events for accessibility
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFAQ(q);
      }
    });
  });
}

function toggleFAQ(questionEl) {
  const item = questionEl.closest('.faq-item');
  if (!item) return;

  const isOpen = item.classList.contains('open');

  // Close all other items
  document.querySelectorAll('.faq-item.open').forEach(openItem => {
    if (openItem !== item) {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    }
  });

  // Toggle current
  item.classList.toggle('open', !isOpen);
  questionEl.setAttribute('aria-expanded', String(!isOpen));
}

/* ══════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════ */
function submitForm(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form || !success) return;

  // Basic validation
  const phone = document.getElementById('phone').value.trim();
  const parentName = document.getElementById('parentName').value.trim();
  const exam = document.getElementById('exam').value;

  if (!parentName) {
    showFormError("Please enter your name.");
    return;
  }
  if (!phone || phone.length < 10) {
    showFormError("Please enter a valid phone number.");
    return;
  }
  if (!exam) {
    showFormError("Please select the exam your daughter is preparing for.");
    return;
  }

  // Simulate loading
  submitBtn.textContent = '⏳ Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'block';

    // Build WhatsApp message from form data
    const studentName = document.getElementById('studentName').value.trim();
    const roomType = document.getElementById('roomType').value || 'Not specified';
    const message = encodeURIComponent(
      `Hi! I'm interested in Narayani Hostel.\n\n` +
      `Parent Name: ${parentName}\n` +
      `Student Name: ${studentName || 'Not specified'}\n` +
      `Phone: ${phone}\n` +
      `Exam: ${exam}\n` +
      `Room Type: ${roomType}`
    );

    // Update success WhatsApp button with pre-filled message
    const waBtn = document.getElementById('success-whatsapp-btn');
    if (waBtn) {
      waBtn.href = `https://wa.me/919158844053?text=${message}`;
    }
  }, 1500);
}

function showFormError(msg) {
  // Simple inline alert — in production use toast/modal
  const existing = document.getElementById('formError');
  if (existing) existing.remove();

  const error = document.createElement('div');
  error.id = 'formError';
  error.style.cssText = 'background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.4);color:#FCA5A5;padding:12px 16px;border-radius:8px;font-size:14px;margin-bottom:16px;';
  error.textContent = '⚠️ ' + msg;

  const form = document.getElementById('contactForm');
  form.insertBefore(error, form.firstChild);

  setTimeout(() => error.remove(), 4000);
}



/* ══════════════════════════════════════════
   STICKY NAV ACTIVE LINK HIGHLIGHT
   ======================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const hasLink = Array.from(navLinks).some(link => link.getAttribute('href') === `#${id}`);
        if (hasLink) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      }
    });
  },
  { threshold: 0.25 }
);

sections.forEach(s => sectionObserver.observe(s));

/* ══════════════════════════════════════════
   INTERACTIVE FACILITIES SHOWCASE
══════════════════════════════════════════ */
function initFacilitiesInteractive() {
  const cards = document.querySelectorAll('.facility-card');
  const showcaseImg = document.getElementById('facilityShowcaseImg');
  const showcaseCaption = document.getElementById('facilityShowcaseCaption');
  if (!cards.length || !showcaseImg || !showcaseCaption) return;

  const preloadImages = {};
  
  // Preload images for smoother hover transitions
  cards.forEach(card => {
    const imgUrl = card.getAttribute('data-image');
    if (imgUrl) {
      const img = new Image();
      img.src = imgUrl;
      preloadImages[imgUrl] = img;
    }
  });

  cards.forEach(card => {
    const handleActivate = () => {
      // Remove active class from all cards
      cards.forEach(c => c.classList.remove('active'));
      
      // Add active class to selected card
      card.classList.add('active');

      const imgUrl = card.getAttribute('data-image');
      const caption = card.getAttribute('data-caption');
      const currentSrc = showcaseImg.getAttribute('src');

      if (imgUrl && currentSrc !== imgUrl) {
        // Fade out transition
        showcaseImg.classList.add('fade-out');
        
        setTimeout(() => {
          showcaseImg.src = imgUrl;
          showcaseImg.alt = caption;
          showcaseCaption.textContent = caption;
          // Fade back in
          showcaseImg.classList.remove('fade-out');
        }, 250); // Matches CSS transition time
      }
    };

    card.addEventListener('mouseenter', handleActivate);
    // Tap support for mobile devices
    card.addEventListener('click', handleActivate);
  });
}
