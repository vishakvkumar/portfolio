/* ==========================================================================
   VISHAK VIJAYAKUMAR - PORTFOLIO INTERACTIVE LOGIC (app.js)
   Aurora Theme & Awards and Publications Data Management
   ========================================================================== */

// --- AWARDS & PUBLICATIONS DATA ARRAY ---
// Easily append or modify future papers, awards, or book chapters here!
const AWARDS_PUBLICATIONS = [
  {
    id: "award-best-paper-2026",
    badge: "Best Paper Award",
    year: "2026",
    title: "[[PAPER TITLE]]", // TODO: Replace with official paper title
    conference: "[[CONFERENCE NAME]]", // TODO: Replace with conference name
    organiser: "[[ORGANISER]]", // TODO: Replace with organizing body
    dateVenue: "[[DATE]], [[VENUE/CITY]]", // TODO: Replace with date and venue
    coAuthors: "[[CO-AUTHORS or remove line]]", // TODO: Replace with co-authors or null
    summary: "[[1–2 sentence summary of the paper]]", // TODO: Replace with 1-2 sentence summary
    announcementUrl: "https://lnkd.in/p/g33vtKRm",
    paperUrl: null, // TODO: Replace with DOI or direct paper URL when published
    image: null // assets/[[award-image-filename]] if present
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // --- THEME SWITCHER (AURORA THEME: LIGHT / DARK) ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  function getPreferredTheme() {
    try {
      const savedTheme = localStorage.getItem('vv_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch (e) {
      console.warn('localStorage not accessible, using system preference:', e);
    }
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('vv_theme', theme);
    } catch (e) {
      console.warn('Could not save theme preference:', e);
    }
    updateThemeIcon(theme);
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

  // Initial Theme Setup
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Toggle Theme Listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  // Listen to OS theme changes if user has not explicitly chosen
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('vv_theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  } catch (e) {}

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

  // --- ACTIVE NAV LINK ON SCROLL (SCROLL SPY) ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 130;

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
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('Email copied: vishak@rajagiri.edu');
        }).catch(() => {
          showToast('Direct contact: vishak@rajagiri.edu');
        });
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          showToast('Email copied: vishak@rajagiri.edu');
        } catch (err) {
          showToast('Direct contact: vishak@rajagiri.edu');
        }
        document.body.removeChild(textarea);
      }
    });
  });

  // --- CONTACT FORM SUBMISSION & SUCCESS MODAL ---
  const contactForm = document.getElementById('consultation-form');
  const modalBackdrop = document.getElementById('contact-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name')?.value || 'Visitor';
      const subject = document.getElementById('sender-subject')?.value || 'Academic & Consulting Inquiry';

      if (modalBackdrop) {
        modalBackdrop.classList.add('active');
        const modalMessage = document.getElementById('modal-user-greeting');
        if (modalMessage) {
          modalMessage.textContent = `Thank you ${name}! Your inquiry regarding "${subject}" has been received. Vishak Vijayakumar will respond shortly at your provided email.`;
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
      if (modalIssuer) modalIssuer.textContent = `Issued by: ${issuer}`;
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
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }
});
