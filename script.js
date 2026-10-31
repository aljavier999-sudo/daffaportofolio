(function() {
  'use strict';
  
  /* ============================================
     MOBILE NAVIGATION
     Dikendalikan oleh CSS checkbox (#navCheckbox).
     Script hanya menutup menu setelah link diklik.
     ============================================ */
  const navCheckbox = document.getElementById('navCheckbox');
  const navLinks = document.getElementById('navLinks');
  
  if (navCheckbox && navLinks) {
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navCheckbox.checked = false;
      });
    });
  }
  
  /* ============================================
     LANGUAGE SWITCHER (ID / EN)
     Hanya mengganti node teks, bukan innerHTML,
     agar markup di dalam elemen tetap utuh.
     ============================================ */
  const languageToggle = document.getElementById('languageToggle');
  let currentLanguage = 'id';
  
  function setLanguage(lang) {
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-id][data-en]').forEach(function(element) {
      const value = element.getAttribute('data-' + lang);
      if (value !== null) {
        element.textContent = value;
      }
    });
    
    if (languageToggle) {
      languageToggle.textContent = lang === 'id' ? 'ID / EN' : 'EN / ID';
    }
  }
  
  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      currentLanguage = currentLanguage === 'id' ? 'en' : 'id';
      setLanguage(currentLanguage);
    });
  }
  
  /* ============================================
     FADE-IN REVEAL
     Menghormati prefers-reduced-motion.
     Jika IntersectionObserver tidak tersedia,
     semua elemen langsung ditampilkan.
     ============================================ */
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  
  const revealTargets = document.querySelectorAll(
    '.hero-content, .section-heading, .bio-layout, .principles-grid, ' +
    '.principle-quote, .vision-content, .networks-grid, .networks-closing, ' +
    '.interests-list, .projects-grid, .contact-section'
  );
  
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach(function(el) {
      el.classList.add('reveal');
    });
    
    const observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.05
      }
    );
    
    revealTargets.forEach(function(el) {
      observer.observe(el);
    });
  }
  
  /* ============================================
     SMOOTH ANCHOR — fallback untuk browser
     yang tidak mendukung CSS scroll-behavior.
     ============================================ */
  if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.length > 1) {
          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            target.scrollIntoView();
          }
        }
      });
    });
  }
})();