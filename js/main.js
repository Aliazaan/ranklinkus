/* =============================================
   RANKLINKUS — GLOBAL JAVASCRIPT  v2.1
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR: scroll effect ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ---- MOBILE MENU ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- DROPDOWN: keyboard + touch support ---- */
  document.querySelectorAll('.has-dropdown').forEach(item => {
    const link = item.querySelector('a');
    const dropdown = item.querySelector('.dropdown');
    if (!link || !dropdown) return;

    // Touch devices: first tap opens dropdown, second tap follows href
    let touched = false;
    link.addEventListener('click', (e) => {
      if (window.innerWidth > 768) {
        // On desktop, if it's a touch event toggle dropdown visibility
        if (e.pointerType === 'touch' || touched) {
          e.preventDefault();
          const isVisible = dropdown.style.opacity === '1';
          // Close all others
          document.querySelectorAll('.has-dropdown .dropdown').forEach(d => {
            d.style.opacity = '0';
            d.style.pointerEvents = 'none';
            d.style.transform = 'translateX(-50%) translateY(-8px)';
          });
          if (!isVisible) {
            dropdown.style.opacity = '1';
            dropdown.style.pointerEvents = 'all';
            dropdown.style.transform = 'translateX(-50%) translateY(0)';
            touched = true;
          } else {
            touched = false;
            window.location.href = link.getAttribute('href');
          }
        }
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!item.contains(e.target)) {
        dropdown.style.opacity = '';
        dropdown.style.pointerEvents = '';
        dropdown.style.transform = '';
        touched = false;
      }
    });

    // Keyboard accessibility
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = item.classList.toggle('keyboard-open');
        if (isOpen) {
          dropdown.querySelector('a')?.focus();
        }
      }
      if (e.key === 'Escape') {
        item.classList.remove('keyboard-open');
        link.focus();
      }
    });
    dropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        item.classList.remove('keyboard-open');
        link.focus();
      }
    });
  });

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ---- FAQ ACCORDION ---- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---- ACTIVE NAV LINK ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const hrefPage = href.split('/').pop();
    if (hrefPage && hrefPage === currentPage && currentPage !== '') {
      a.classList.add('active');
    }
  });

  /* ---- SMOOTH ANCHOR SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 90; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- CONTACT FORM (Formspree-ready) ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateForm(contactForm)) return;

      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      const action = contactForm.getAttribute('action');

      // If Formspree action is configured, use it
      if (action && action.includes('formspree')) {
        try {
          const res = await fetch(action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
          });
          if (res.ok) {
            showFormSuccess(btn, contactForm, original);
          } else {
            showFormError(btn, original);
          }
        } catch {
          showFormError(btn, original);
        }
      } else {
        // Demo mode — simulate success
        setTimeout(() => showFormSuccess(btn, contactForm, original), 1200);
      }
    });
  }

  function showFormSuccess(btn, form, original) {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00e5a0, #00c87a)';
    btn.style.boxShadow = '0 0 30px rgba(0,229,160,0.4)';
    form.reset();
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.boxShadow = '';
      btn.disabled = false;
    }, 4000);
  }

  function showFormError(btn, original) {
    btn.textContent = 'Failed — please try again';
    btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }

  /* ---- FORM VALIDATION ---- */
  function validateForm(form) {
    let valid = true;
    // Remove previous errors
    form.querySelectorAll('.field-error').forEach(el => el.remove());
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

    form.querySelectorAll('[required]').forEach(field => {
      const group = field.closest('.form-group');
      let error = null;

      if (!field.value.trim()) {
        error = 'This field is required.';
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        error = 'Please enter a valid email address.';
      } else if (field.type === 'url' && field.value && !/^https?:\/\/.+/.test(field.value)) {
        error = 'Please enter a valid URL (starting with https://).';
      }

      if (error) {
        valid = false;
        group.classList.add('has-error');
        const errEl = document.createElement('span');
        errEl.className = 'field-error';
        errEl.textContent = error;
        errEl.style.cssText = 'display:block;font-size:12px;color:#ef4444;margin-top:5px';
        group.appendChild(errEl);
        // Red border
        field.style.borderColor = 'rgba(239,68,68,0.6)';
        field.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.1)';
        // Clear on input
        field.addEventListener('input', () => {
          field.style.borderColor = '';
          field.style.boxShadow = '';
          errEl.remove();
          group.classList.remove('has-error');
        }, { once: true });
      }
    });

    if (!valid) {
      const firstError = form.querySelector('.has-error [required]');
      if (firstError) firstError.focus();
    }
    return valid;
  }

  /* ---- COUNTER ANIMATION ---- */
  function animateCounter(el) {
    const raw = el.dataset.target;
    if (!raw) return;
    const target = parseFloat(raw.replace(/,/g, ''));
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const frames = 60;
    const step = duration / frames;
    let current = 0;
    const increment = target / frames;
    const isFloat = String(target).includes('.');

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      const display = isFloat
        ? current.toFixed(1)
        : Math.floor(current).toLocaleString();
      el.textContent = prefix + display + suffix;
      if (current >= target) clearInterval(timer);
    }, step);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          cObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cObs.observe(c));
  }

  /* ---- BLOG CARD HOVER CLICKS ---- */
  document.querySelectorAll('.blog-card[data-href]').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = card.dataset.href;
    });
  });

  /* ---- CASE STUDY CARD CLICK ---- */
  document.querySelectorAll('.case-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.location.href = '../pages/contact.html';
    });
  });

  /* ---- PRICING BILLING TOGGLE ---- */
  const billingToggle = document.getElementById('billingToggle');
  if (billingToggle) {
    billingToggle.addEventListener('change', () => {
      const annual = billingToggle.checked;
      document.querySelectorAll('.price-val').forEach(el => {
        el.textContent = annual ? el.dataset.annual : el.dataset.monthly;
      });
    });
  }

});
