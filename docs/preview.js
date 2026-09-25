// Local prototype behavior: same-page navigation and mobile menu dismissal only.
const sectionNames = {
  '#servicii': 'Servicii', '#constructii-case': 'Servicii', '#cladiri': 'Servicii',
  '#constructii-civile': 'Servicii', '#renovari': 'Servicii',
  '#proiecte': 'Proiecte', '#despre': 'Despre',
};

function updateNavigation() {
  const isContact = location.pathname.endsWith('/contact.html');
  const selected = isContact ? 'Contact' : sectionNames[location.hash] || 'Acasă';
  for (const link of document.querySelectorAll('.desktop-nav a, .mobile-nav nav a')) {
    if (link.textContent.trim() === selected) {
      link.setAttribute('aria-current', isContact || selected === 'Acasă' ? 'page' : 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  }
}

for (const link of document.querySelectorAll('.mobile-nav nav a')) {
  link.addEventListener('click', () => {
    link.closest('details').open = false;
  });
}

window.addEventListener('hashchange', updateNavigation);
updateNavigation();
