// Mobile nav toggle
const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.querySelector('.nav-mobile');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}

// Mark active nav link
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// Formspree AJAX submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    const errorBox = document.getElementById('form-error');
    const successBox = document.getElementById('form-success');

    btn.disabled = true;
    btn.textContent = 'Sending…';
    errorBox.style.display = 'none';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        contactForm.style.display = 'none';
        successBox.style.display = 'block';
      } else {
        const data = await res.json();
        const msg = (data.errors || []).map(e => e.message).join(', ') || 'Something went wrong. Please try again.';
        errorBox.textContent = msg;
        errorBox.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Send Inquiry';
      }
    } catch (_) {
      errorBox.textContent = 'Network error — please check your connection and try again.';
      errorBox.style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'Send Inquiry';
    }
  });
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    // close all
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    // open clicked if it was closed
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});
