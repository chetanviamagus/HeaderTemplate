document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const menuToggle = document.querySelector('.site-header__menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const searchToggle = document.querySelector('.site-header__search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-overlay__close');
  const navItems = document.querySelectorAll('.main-nav__item--has-children');
  const backButtons = document.querySelectorAll('.main-nav__back-btn');
  const closeButtons = document.querySelectorAll('.main-nav__close-btn');

  // Toggle mobile menu
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('is-active');

      // Prevent body scrolling when menu is open
      document.body.classList.toggle('menu-open');
    });
  }

  // Toggle search overlay
  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      searchOverlay.classList.toggle('is-active');
      searchOverlay.setAttribute('aria-hidden', isExpanded);

      // Focus on search input when opened
      if (!isExpanded) {
        const searchInput = searchOverlay.querySelector('.search-form__input');
        if (searchInput) {
          setTimeout(() => {
            searchInput.focus();
          }, 100);
        }
      }

      // Prevent body scrolling when search is open
      document.body.classList.toggle('search-open');
    });
  }

  // Close search overlay
  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', function () {
      searchOverlay.classList.remove('is-active');
      searchOverlay.setAttribute('aria-hidden', 'true');
      searchToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('search-open');

      // Return focus to search toggle
      searchToggle.focus();
    });
  }

  // Handle submenu navigation for mobile
  if (navItems.length > 0) {
    navItems.forEach(item => {
      const link = item.querySelector('.main-nav__link');
      const submenu = item.querySelector('.main-nav__submenu');

      if (link && submenu) {
        link.addEventListener('click', function (e) {
          // Only for mobile view
          if (window.innerWidth < 1024) {
            e.preventDefault();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            submenu.classList.add('is-active');
          }
        });

        // For desktop, handle hover
        if (window.innerWidth >= 1024) {
          item.addEventListener('mouseenter', function () {
            link.setAttribute('aria-expanded', 'true');
            submenu.classList.add('is-active');
          });

          item.addEventListener('mouseleave', function () {
            link.setAttribute('aria-expanded', 'false');
            submenu.classList.remove('is-active');
          });
        }
      }
    });
  }

  // Back button in submenu
  if (backButtons.length > 0) {
    backButtons.forEach(button => {
      button.addEventListener('click', function () {
        const submenu = this.closest('.main-nav__submenu');
        if (submenu) {
          submenu.classList.remove('is-active');
          const parentItem = submenu.closest('.main-nav__item');
          if (parentItem) {
            const link = parentItem.querySelector('.main-nav__link');
            if (link) {
              link.setAttribute('aria-expanded', 'false');
            }
          }
        }
      });
    });
  }

  // Close button in submenu
  if (closeButtons.length > 0) {
    closeButtons.forEach(button => {
      button.addEventListener('click', function () {
        const submenu = this.closest('.main-nav__submenu');
        if (submenu) {
          submenu.classList.remove('is-active');
          const parentItem = submenu.closest('.main-nav__item');
          if (parentItem) {
            const link = parentItem.querySelector('.main-nav__link');
            if (link) {
              link.setAttribute('aria-expanded', 'false');
            }
          }
        }

        // Also close the main menu on mobile
        if (window.innerWidth < 1024 && mainNav) {
          mainNav.classList.remove('is-active');
          if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
          }
          document.body.classList.remove('menu-open');
        }
      });
    });
  }

  // Close menus when clicking outside
  document.addEventListener('click', function (e) {
    // For desktop dropdown menus
    if (window.innerWidth >= 1024) {
      const isNavClick = e.target.closest('.main-nav__item--has-children');
      if (!isNavClick) {
        navItems.forEach(item => {
          const link = item.querySelector('.main-nav__link');
          const submenu = item.querySelector('.main-nav__submenu');
          if (link && submenu) {
            link.setAttribute('aria-expanded', 'false');
            submenu.classList.remove('is-active');
          }
        });
      }
    }
  });

  // Handle keyboard navigation
  document.addEventListener('keydown', function (e) {
    // ESC key
    if (e.key === 'Escape') {
      // Close search overlay
      if (searchOverlay && searchOverlay.classList.contains('is-active')) {
        searchOverlay.classList.remove('is-active');
        searchOverlay.setAttribute('aria-hidden', 'true');
        if (searchToggle) {
          searchToggle.setAttribute('aria-expanded', 'false');
          searchToggle.focus();
        }
        document.body.classList.remove('search-open');
      }

      // Close mobile menu
      if (mainNav && mainNav.classList.contains('is-active')) {
        mainNav.classList.remove('is-active');
        if (menuToggle) {
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.focus();
        }
        document.body.classList.remove('menu-open');
      }

      // Close any open submenus
      const activeSubmenus = document.querySelectorAll('.main-nav__submenu.is-active');
      if (activeSubmenus.length > 0) {
        activeSubmenus.forEach(submenu => {
          submenu.classList.remove('is-active');
          const parentItem = submenu.closest('.main-nav__item');
          if (parentItem) {
            const link = parentItem.querySelector('.main-nav__link');
            if (link) {
              link.setAttribute('aria-expanded', 'false');
              link.focus();
            }
          }
        });
      }
    }
  });

  // Add body class for styling when JS is available
  document.body.classList.add('js-enabled');

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Reset mobile menu state on resize to desktop
      if (window.innerWidth >= 1024) {
        if (mainNav && mainNav.classList.contains('is-active')) {
          mainNav.classList.remove('is-active');
          if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
          }
          document.body.classList.remove('menu-open');
        }
      }
    }, 250);
  });
});
