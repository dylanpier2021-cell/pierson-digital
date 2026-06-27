// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Sticky nav — add .scrolled class after 80px scroll
const siteHeader = document.getElementById('site-header');
if (siteHeader) {
  const onScroll = () => siteHeader.classList.toggle('scrolled', window.scrollY > 80);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  // Close on any nav link click (mobile)
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Dropdown — desktop
document.querySelectorAll('.has-dropdown').forEach(item => {
  const toggle = item.querySelector('.drop-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = item.classList.toggle('open');
    document.querySelectorAll('.has-dropdown').forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.has-dropdown.open').forEach(i => i.classList.remove('open'));
});

// Scroll reveal — IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
if (reveals.length && 'IntersectionObserver' in window) {
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObs.observe(el));
}

// Stat counters — count up when element enters view
function animateCounter(el) {
  const target  = parseInt(el.dataset.target, 10);
  const suffix  = el.dataset.suffix || '';
  const dur     = 1800;
  const step    = target / (dur / 16);
  let cur = 0;
  const tick = () => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.floor(cur).toLocaleString() + suffix;
    if (cur < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const counters = document.querySelectorAll('[data-target]');
if (counters.length && 'IntersectionObserver' in window) {
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        cntObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => cntObs.observe(el));
}

// GHL calendar iFrame auto-resize
window.addEventListener('message', e => {
  if (e.data && e.data.action === 'resize' && e.data.height) {
    document.querySelectorAll('iframe[id^="cal-"]').forEach(f => {
      f.style.height = e.data.height + 'px';
    });
  }
});

// ---- FORM SUBMISSION — GoHighLevel Webhook ----
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/xbWRB6dunUVALzKIgbMB/webhook-trigger/659c79b5-8384-4a3e-9f89-ffadc3dec272';
const form = document.getElementById('claim-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    const data = {
      firstName:    form.querySelector('[name="firstName"]').value.trim(),
      lastName:     form.querySelector('[name="lastName"]').value.trim(),
      businessName: form.querySelector('[name="businessName"]').value.trim(),
      phone:        form.querySelector('[name="phone"]').value.trim(),
      email:        form.querySelector('[name="email"]').value.trim(),
      trade:        form.querySelector('[name="trade"]').value,
    };
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        mode: 'no-cors',
        body: JSON.stringify(data),
      });
      form.closest('.form-box').innerHTML = `
        <div style="text-align:center;padding:20px 0;">
          <div style="font-size:48px;margin-bottom:16px;">&#10003;</div>
          <h3 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:28px;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:12px;">You're In.</h3>
          <p style="color:var(--muted);font-size:16px;line-height:1.6;">Thanks — we'll be in touch within 1 business day to get started.</p>
        </div>`;
    } catch {
      btn.textContent = 'Something went wrong — please try again';
      btn.disabled = false;
    }
  });
}
