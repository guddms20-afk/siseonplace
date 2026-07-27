const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const reveals = document.querySelectorAll('.reveal');

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

reveals.forEach((item) => observer.observe(item));

document.getElementById('year').textContent = new Date().getFullYear();
