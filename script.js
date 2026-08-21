// =====================================================================
// CONFIG — everything you need to edit lives in this block.
// =====================================================================

// WhatsApp — digits only, country code, NO plus sign, NO spaces.
const WHATSAPP_NUMBER = "2348085579021";
const WHATSAPP_MESSAGE = "Hi! I'd like to book a free 15-minute Arabic assessment for my child.";

// Paystack Payment Links — create one per package in your Paystack
// dashboard (Payments → Payment Links), then paste each URL below.
// Each pricing card button will open the matching link directly.
const PAYSTACK_LINKS = {
  Beginner: "   https://paystack.shop/pay/s2y4ifizw7",
  Standard: " https://paystack.shop/pay/zfvv-1v1wd",
  Premium:  "https://paystack.shop/pay/4t0ngu03ij"
};

// =====================================================================
// SITE LOGIC — no need to edit below this line.
// =====================================================================

// WhatsApp link wiring (assessment section button)
const whatsappLink = document.getElementById("whatsapp-link");
if (whatsappLink) {
  whatsappLink.href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Pricing card buttons -> each one is a real link to its own Paystack
// Payment Link, opened in a new tab. Nothing to click twice, no popup.
document.querySelectorAll(".pay-trigger").forEach((btn) => {
  const plan = btn.dataset.plan;
  const link = PAYSTACK_LINKS[plan];
  if (link) {
    btn.href = link;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  }
});

// Scroll-reveal for fade-up elements.
// Elements are visible by default in CSS — we only hide them here, right
// before observing, so a JS failure never hides page content.
const fadeEls = document.querySelectorAll(".fade-up:not(.visible)");

if (window.IntersectionObserver) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("pre-reveal");
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach((el) => {
    el.classList.add("pre-reveal");
    observer.observe(el);
  });
}
