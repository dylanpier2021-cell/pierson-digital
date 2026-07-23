// ================================================================
// PIERSON DIGITAL — main.js v2 (premium)
// ================================================================

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Sticky nav — scrolled class after 80px; immediate on inner pages
const siteHeader = document.getElementById('site-header');
if (siteHeader) {
  const onScroll = () => siteHeader.classList.toggle('scrolled', window.scrollY > 80);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (document.querySelector('.inner-hero')) siteHeader.classList.add('scrolled');
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
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Dropdown — desktop toggle
document.querySelectorAll('.has-dropdown').forEach(item => {
  const toggle = item.querySelector('.drop-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', e => {
    e.stopPropagation();
    item.classList.toggle('open');
    document.querySelectorAll('.has-dropdown').forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.has-dropdown.open').forEach(i => i.classList.remove('open'));
});

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', '#' + id);
    }
  });
});

// Scroll progress bar
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  }, { passive: true });
}

// Hero parallax (photo-hero background)
const photoHero = document.querySelector('.photo-hero');
if (photoHero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    photoHero.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.22}px)`;
  }, { passive: true });
}

// Hero headline stagger — split <br> lines into animated .hero-line spans
const heroH1 = document.querySelector('.photo-hero__headline');
if (heroH1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const parts = heroH1.innerHTML.split('<br>');
  if (parts.length > 1) {
    heroH1.innerHTML = parts
      .map((line, i) => `<span class="hero-line" style="animation-delay:${0.08 + i * 0.18}s">${line.trim()}</span>`)
      .join('<br>');
  }
}

// Scroll reveal — combined observer for all reveal variants
const allReveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
if (allReveals.length && 'IntersectionObserver' in window) {
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  allReveals.forEach(el => revealObs.observe(el));
}

// Stat counters — eased count-up with pop finish
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return;
  const suffix    = el.dataset.suffix || '';
  const startTime = performance.now();
  const dur       = 1800;
  const tick = now => {
    const p   = Math.min((now - startTime) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(ease * target).toLocaleString() + suffix;
    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString() + suffix;
      el.classList.add('counter-done');
    }
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

// 3D card tilt — hover-capable pointer + no reduce-motion
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.svc-card, .nprice-card, .why-card, .pairs-card').forEach(card => {
    card.classList.add('tilt-card');
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 12;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * -12;
      card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateZ(5px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// Sticky CTA bar — show after hero
const stickyCta   = document.getElementById('sticky-cta');
const stickyClose = document.getElementById('sticky-cta-close');
if (stickyCta) {
  let dismissed = false;
  const heroEl  = document.querySelector('.photo-hero, .inner-hero');
  const showCta = () => {
    if (dismissed) return;
    const threshold = heroEl ? heroEl.offsetHeight * 0.85 : 400;
    stickyCta.classList.toggle('visible', window.scrollY > threshold);
  };
  window.addEventListener('scroll', showCta, { passive: true });
  if (stickyClose) {
    stickyClose.addEventListener('click', () => {
      dismissed = true;
      stickyCta.classList.remove('visible');
    });
  }
}

// Primary CTA pulse
const heroCta = document.querySelector('.photo-hero .btn-primary, .inner-hero .btn-primary');
if (heroCta) heroCta.classList.add('cta-pulse');

// GHL calendar iFrame auto-resize + Meta Pixel booking event
window.addEventListener('message', e => {
  if (!e.data || typeof e.data !== 'object') return;
  if (e.data.action === 'resize' && e.data.height) {
    document.querySelectorAll('iframe[id^="cal-"]').forEach(f => {
      f.style.height = e.data.height + 'px';
    });
  }
  const type = String(e.data.type || e.data.action || '').toLowerCase();
  if (['bookingscheduled','booking','appointmentscheduled','scheduled'].some(t => type.includes(t))) {
    if (typeof fbq !== 'undefined') fbq('track', 'Schedule');
  }
}, false);

// =================================================================
// LANDING PAGE PREMIUM — scoped to pages with .hero (no .site-nav)
// =================================================================
(function () {
  'use strict';

  const isLP   = !!document.querySelector('.hero') && !document.querySelector('.site-nav');
  if (!isLP) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── 1. NAV: transparent at top → blur on scroll ──────────────
  const lpNav = document.querySelector('nav');
  if (lpNav) {
    const syncNav = () => lpNav.classList.toggle('lp-scrolled', window.scrollY > 50);
    window.addEventListener('scroll', syncNav, { passive: true });
    syncNav();
  }

  // ── 2. NOISE TEXTURE OVERLAY ─────────────────────────────────
  const noiseSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">' +
    '<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>' +
    '<feColorMatrix type="saturate" values="0"/></filter>' +
    '<rect width="256" height="256" filter="url(#n)" opacity="1"/></svg>';
  const noiseEl = document.createElement('div');
  noiseEl.setAttribute('aria-hidden', 'true');
  noiseEl.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:5;' +
    'background-image:url("data:image/svg+xml,' + encodeURIComponent(noiseSvg) + '");' +
    'background-size:256px 256px;opacity:0.035;';
  document.body.appendChild(noiseEl);

  // ── 3. HERO BUTTON ARROW ─────────────────────────────────────
  const heroBtn = document.querySelector('.hero .btn-primary');
  if (heroBtn) {
    const arrow = document.createElement('span');
    arrow.className = 'btn-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';
    heroBtn.appendChild(arrow);
  }

  // ── 4. TRUST MARQUEE — inject after proof bar ─────────────────
  const proofBar = document.querySelector('.proof-bar');
  if (proofBar) {
    const trades = ['HVAC','Roofing','Plumbing','Landscaping',
                    'Epoxy Coating','Electrical','Painting','General Contracting'];
    const chunk = trades.map(t =>
      '<span class="lp-marquee-item">' + t + '</span><span class="lp-marquee-sep" aria-hidden="true">•</span>'
    ).join('');
    const mEl = document.createElement('div');
    mEl.className = 'lp-marquee';
    mEl.setAttribute('aria-hidden', 'true');
    mEl.innerHTML = '<div class="lp-marquee-inner">' + chunk + chunk + '</div>';
    proofBar.insertAdjacentElement('afterend', mEl);
  }

  // ── 5. PROOF BAR COUNT-UP ─────────────────────────────────────
  if (proofBar && 'IntersectionObserver' in window) {
    var countCfg = { '1,000+': [1000,'','+'], '$297': [297,'$',''], '15': [15,'',''] };
    proofBar.querySelectorAll('.proof-num span').forEach(function(span) {
      var cfg = countCfg[span.textContent.trim()];
      if (!cfg) return;
      span.dataset.lpTarget = cfg[0];
      span.dataset.lpPrefix = cfg[1];
      span.dataset.lpSuffix = cfg[2];
      span.textContent = cfg[1] + '0' + cfg[2];
    });
    var cntObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('[data-lp-target]').forEach(function(el) {
          var target = +el.dataset.lpTarget;
          var prefix = el.dataset.lpPrefix;
          var suffix = el.dataset.lpSuffix;
          var t0 = performance.now();
          (function tick(now) {
            var p = Math.min((now - t0) / 1600, 1);
            var e = 1 - Math.pow(1 - p, 4);
            el.textContent = prefix + Math.round(e * target).toLocaleString() + suffix;
            if (p < 1) requestAnimationFrame(tick);
          })(t0);
        });
        cntObs.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    cntObs.observe(proofBar);
  }

  // ── 6. SCROLL REVEAL — stagger grids, fade sections ──────────
  if (!reduced && 'IntersectionObserver' in window) {
    ['.problem-grid','.features-grid','.testimonials-grid','.steps'].forEach(function(sel) {
      var g = document.querySelector(sel);
      if (!g) return;
      Array.from(g.children).forEach(function(child, i) {
        child.classList.add('lp-reveal');
        if (i % 3 === 1) child.classList.add('d1');
        if (i % 3 === 2) child.classList.add('d2');
      });
    });
    document.querySelectorAll(
      '.section-label,.section-title,.section-body,.price-card,.form-box,.cta-inner'
    ).forEach(function(el) {
      if (!el.closest('.lp-reveal')) el.classList.add('lp-reveal');
    });
    var lpObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('lp-in'); lpObs.unobserve(e.target); }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -28px 0px' });
    document.querySelectorAll('.lp-reveal').forEach(function(el) { lpObs.observe(el); });
  }

  // ── 7. FOOTER MULTI-COLUMN ───────────────────────────────────
  var footer = document.querySelector('footer');
  if (footer) {
    var logo  = footer.querySelector('.footer-logo');
    var allPs = Array.from(footer.querySelectorAll('p'));
    if (logo && allPs.length >= 3) {
      var tagline = allPs[0];
      var contact = allPs[1];
      var legal   = allPs[allPs.length - 1];

      var main = document.createElement('div');
      main.className = 'lp-footer-main';

      var brand = document.createElement('div');
      brand.className = 'lp-footer-brand';
      brand.appendChild(logo.cloneNode(true));
      brand.appendChild(tagline.cloneNode(true));

      var contactDiv = document.createElement('div');
      contactDiv.className = 'lp-footer-contact';
      contactDiv.appendChild(contact.cloneNode(true));

      main.appendChild(brand);
      main.appendChild(contactDiv);

      var hr = document.createElement('hr');
      hr.className = 'lp-footer-divider';

      var legalDiv = document.createElement('div');
      legalDiv.className = 'lp-footer-legal';
      legalDiv.appendChild(legal.cloneNode(true));

      while (footer.firstChild) footer.removeChild(footer.firstChild);
      footer.style.textAlign = 'left';
      footer.appendChild(main);
      footer.appendChild(hr);
      footer.appendChild(legalDiv);
    }
  }

}());

// ── FORM SUBMISSION — GoHighLevel Webhook ──────────────────────
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/xbWRB6dunUVALzKIgbMB/webhook-trigger/659c79b5-8384-4a3e-9f89-ffadc3dec272';
const claimForm = document.getElementById('claim-form');
if (claimForm) {
  claimForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = claimForm.querySelector('.submit-btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    const data = {
      firstName:    claimForm.querySelector('[name="firstName"]').value.trim(),
      lastName:     claimForm.querySelector('[name="lastName"]').value.trim(),
      businessName: claimForm.querySelector('[name="businessName"]').value.trim(),
      phone:        claimForm.querySelector('[name="phone"]').value.trim(),
      email:        claimForm.querySelector('[name="email"]').value.trim(),
      trade:        claimForm.querySelector('[name="trade"]').value,
    };
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        mode: 'no-cors',
        body: JSON.stringify(data),
      });
      claimForm.closest('.form-box').innerHTML = `
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
