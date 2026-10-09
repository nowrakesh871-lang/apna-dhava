async function setupShareForm(formId, messageId, fields, photoId) {
  const form = document.getElementById(formId), status = document.getElementById(messageId);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const lines = ["Apna Dhava — धावा, ग्राम सभा बुढ़नपुर, जिला गाज़ीपुर", ""];
    for (const [label, id] of fields) {
      const el = document.getElementById(id);
      lines.push(label + ": " + ((el.value || "").trim() || "नहीं दिया"));
    }
    lines.push("", "कृपया जाँचकर ही प्रकाशित/आगे भेजें।");
    const text = lines.join("\\n"), file = document.getElementById(photoId).files[0];
    try {
      if (navigator.share) {
        const payload = {title: "Apna Dhava", text};
        if (file && navigator.canShare && navigator.canShare({files:[file]})) payload.files = [file];
        await navigator.share(payload);
        status.textContent = "Share menu खुल गया। WhatsApp चुनकर admin को भेजें। अगर फोटो साथ न जाए, तो WhatsApp में अलग से जोड़ें।";
      } else {
        window.prompt("इस संदेश को copy करके WhatsApp पर भेजें:", text);
        status.textContent = "संदेश copy करके WhatsApp पर भेजें। फोटो अलग से attach करें।";
      }
    } catch (err) {
      if (err.name !== "AbortError") status.textContent = "Share नहीं हो पाया। कृपया WhatsApp पर manually भेजें।";
    }
  });
}
setupShareForm("newsForm","newsMessage",[["नाम","newsSender"],["श्रेणी","newsCategory"],["शीर्षक","newsHeadline"],["विवरण","newsDetails"]],"newsPhoto");
setupShareForm("complaintForm","complaintMessage",[["नाम","complaintSender"],["समस्या","complaintType"],["जगह","complaintPlace"],["विवरण","complaintDetails"]],"complaintPhoto");
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
