/* ==========================================================================
   VISHAK VIJAYAKUMAR - PORTFOLIO INTERACTIVE LOGIC (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // --- THEME SWITCHER (UST BLACK & WHITE CONTRAST) ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  const savedTheme = localStorage.getItem('vv_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('vv_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.setAttribute('data-lucide', 'moon');
    } else {
      themeIcon.setAttribute('data-lucide', 'sun');
    }
    if (window.lucide) lucide.createIcons();
  }

  // --- MOBILE NAVIGATION TOGGLE ---
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // --- ACTIVE NAV LINK ON SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- GLOBAL SEARCH & FILTERING ---
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      filterContentByQuery(query);
    });
  }

  function filterContentByQuery(query) {
    const searchableItems = document.querySelectorAll('.searchable-item');
    let matchCount = 0;

    searchableItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        item.style.display = '';
        if (query) item.classList.add('search-highlight');
        else item.classList.remove('search-highlight');
        matchCount++;
      } else {
        item.style.display = 'none';
        item.classList.remove('search-highlight');
      }
    });
  }

  // --- TECHNICAL SKILLS MATRIX CATEGORY FILTER ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- COPY EMAIL TO CLIPBOARD ---
  const copyEmailBtns = document.querySelectorAll('.js-copy-email');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'vishak@rajagiri.edu';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied: vishak@rajagiri.edu');
      }).catch(() => {
        showToast('Direct contact: vishak@rajagiri.edu');
      });
    });
  });

  // --- CONTACT FORM SUBMISSION & SUCCESS MODAL ---
  const contactForm = document.getElementById('consultation-form');
  const modalBackdrop = document.getElementById('contact-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name').value;
      const subject = document.getElementById('sender-subject').value;

      if (modalBackdrop) {
        modalBackdrop.classList.add('active');
        const modalMessage = document.getElementById('modal-user-greeting');
        if (modalMessage) {
          modalMessage.textContent = `Thank you ${name}! Your request regarding "${subject}" has been received. Vishak Vijayakumar will respond to your email shortly.`;
        }
      }
      contactForm.reset();
    });
  }

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }

  // --- CERTIFICATION DETAIL MODAL ---
  const certCards = document.querySelectorAll('.cert-card');
  const certModal = document.getElementById('cert-modal');
  const certModalClose = document.getElementById('cert-modal-close');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.cert-title')?.textContent || 'Certification Details';
      const issuer = card.getAttribute('data-issuer') || 'Microsoft / AWS';
      const details = card.getAttribute('data-details') || 'Professional Industry Certification verified and issued to Vishak Vijayakumar.';
      
      const modalTitle = document.getElementById('cert-modal-title');
      const modalIssuer = document.getElementById('cert-modal-issuer');
      const modalDetails = document.getElementById('cert-modal-details');

      if (modalTitle) modalTitle.textContent = title;
      if (modalIssuer) modalIssuer.textContent = `Issuer: ${issuer}`;
      if (modalDetails) modalDetails.textContent = details;

      if (certModal) certModal.classList.add('active');
    });
  });

  if (certModalClose && certModal) {
    certModalClose.addEventListener('click', () => {
      certModal.classList.remove('active');
    });
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) certModal.classList.remove('active');
    });
  }

  // --- FLOATING TOAST NOTIFICATION UTILITY ---
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="check-circle-2"></i> <span>${message}</span>`;
    container.appendChild(toast);

    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
});
