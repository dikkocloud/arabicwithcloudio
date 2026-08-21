// ---- CONFIG: update these two values whenever you're ready ----
const WHATSAPP_NUMBER = "10000000000"; // digits only, country code, no + or spaces
const WHATSAPP_MESSAGE = "Hi! I'd like to book a free 15-minute Arabic assessment for my child.";
const PAYSTACK_PUBLIC_KEY = "pk_test_00000000000000000000000000000000"; // replace with your real Paystack public key

const PLAN_AMOUNTS = {
  Beginner: 4900,  // amount in kobo/cents — $49.00
  Standard: 8900,  // $89.00
  Premium: 13900   // $139.00
};
// -----------------------------------------------------------------

// WhatsApp link wiring
document.getElementById("whatsapp-link").href =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Plan selection -> scroll to payment + update label + remember amount
let selectedPlan = "Standard";
const selectedPlanEl = document.getElementById("selected-plan");

document.querySelectorAll(".pay-trigger").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    selectedPlan = btn.dataset.plan;
    selectedPlanEl.textContent = selectedPlan;
    document.getElementById("payment").scrollIntoView({ behavior: "smooth" });
  });
});

// Paystack checkout
document.getElementById("paystack-button").addEventListener("click", () => {
  if (typeof PaystackPop === "undefined") {
    alert("Payment is initializing — please try again in a moment.");
    return;
  }
  const amount = PLAN_AMOUNTS[selectedPlan] || PLAN_AMOUNTS.Standard;
  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: "", // Paystack will prompt for this if left blank in inline mode
    amount: amount,
    currency: "USD",
    metadata: {
      custom_fields: [
        { display_name: "Package", variable_name: "package", value: selectedPlan }
      ]
    },
    callback: function (response) {
      alert("Payment successful! Reference: " + response.reference);
    },
    onClose: function () {
      console.log("Payment window closed.");
    }
  });
  handler.openIframe();
});

// Scroll-reveal for fade-up elements
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".fade-up:not(.visible)").forEach((el) => observer.observe(el));
