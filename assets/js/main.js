// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ---- FORM SUBMISSION — GoHighLevel Webhook ----
//
// GHL Field Mapping Reference
// In your GHL workflow, map incoming webhook fields like this:
//
//   Webhook field    →  GHL Contact field
//   ─────────────────────────────────────
//   firstName        →  First Name
//   lastName         →  Last Name
//   businessName     →  Company Name
//   phone            →  Phone
//   email            →  Email
//   trade            →  Custom Field: Trade  (create this in GHL if it doesn't exist)
//
// Reference payload (what GHL receives on every submission):
// {
//   "firstName":    "John",
//   "lastName":     "Smith",
//   "businessName": "Smith Roofing LLC",
//   "phone":        "(555) 000-0000",
//   "email":        "john@smithroofing.com",
//   "trade":        "Roofing"
// }

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/xbWRB6dunUVALzKIgbMB/webhook-trigger/659c79b5-8384-4a3e-9f89-ffadc3dec272';

const form = document.getElementById('claim-form');
if (form) {
  form.addEventListener('submit', async (e) => {
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
      // mode:'no-cors' + text/plain avoids the CORS preflight that blocks
      // browser-to-GHL requests. GHL still receives and parses the JSON body.
      await fetch(WEBHOOK_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'text/plain' },
        mode:    'no-cors',
        body:    JSON.stringify(data),
      });
      // Replace the form with a thank-you message
      form.closest('.form-box').innerHTML = `
        <div style="text-align:center;padding:20px 0;">
          <div style="font-size:48px;margin-bottom:16px;">&#10003;</div>
          <h3 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:28px;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:12px;">You're In.</h3>
          <p style="color:var(--muted);font-size:16px;line-height:1.6;">Thanks — we'll be in touch within 1 business day to get started on your free website.</p>
        </div>
      `;
    } catch {
      btn.textContent = 'Something went wrong — please try again';
      btn.disabled = false;
    }
  });
}
