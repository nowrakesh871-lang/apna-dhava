// Set this to a dedicated public WhatsApp number in international format without + or spaces.
const ADMIN_WHATSAPP_NUMBER = "REPLACE_WITH_WHATSAPP_NUMBER";

const form = document.getElementById("newsForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const sender = document.getElementById("sender").value.trim() || "नाम नहीं दिया";
  const category = document.getElementById("category").value;
  const headline = document.getElementById("headline").value.trim();
  const details = document.getElementById("details").value.trim();

  if (!headline || !details) {
    message.textContent = "कृपया शीर्षक और पूरी जानकारी भरें।";
    return;
  }

  const text = [
    "नमस्ते! Apna Dhava के लिए खबर भेज रहा/रही हूँ।",
    "",
    "नाम: " + sender,
    "श्रेणी: " + category,
    "शीर्षक: " + headline,
    "विवरण: " + details,
    "",
    "कृपया जाँच के बाद ही प्रकाशित करें।"
  ].join("\\n");

  if (ADMIN_WHATSAPP_NUMBER === "REPLACE_WITH_WHATSAPP_NUMBER") {
    message.textContent = "डेमो अभी तैयार है। खबर भेजने का बटन चालू करने के लिए app.js में अपना सार्वजनिक WhatsApp नंबर सेट करना होगा।";
    return;
  }

  const url = "https://wa.me/" + ADMIN_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  window.open(url, "_blank", "noopener,noreferrer");
  message.textContent = "WhatsApp खुल रहा है। भेजने से पहले विवरण जाँच लें; फोटो/वीडियो वहाँ जोड़ सकते हैं।";
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
