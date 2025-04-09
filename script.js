document.addEventListener('DOMContentLoaded', () => {
  const fansMenuTrigger = document.getElementById('fans-menu-trigger');
  const submenu = document.querySelector('.submenu');
  const submenuBack = document.querySelector('.submenu-back');
  const submenuClose = document.querySelector('.submenu-close');
  const mainDropdown = document.querySelector('.dropdown-menu');

  // Show submenu when hovering over Fans item
  fansMenuTrigger.addEventListener('mouseenter', () => {
    mainDropdown.style.display = 'block';
    submenu.style.display = 'block';
  });

  // Hide submenu when clicking back button
  submenuBack.addEventListener('click', () => {
    submenu.style.display = 'none';
  });

  // Hide both menus when clicking close button
  submenuClose.addEventListener('click', () => {
    submenu.style.display = 'none';
    mainDropdown.style.display = 'none';
  });

  // Handle mouse leaving the menu areas
  document.querySelector('.site-header__nav-item').addEventListener('mouseleave', (e) => {
    if (!e.relatedTarget?.closest('.submenu') && !e.relatedTarget?.closest('.dropdown-menu')) {
      submenu.style.display = 'none';
      mainDropdown.style.display = 'none';
    }
  });
});
