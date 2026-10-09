/*
 * Apna Dhava — Firebase Firestore submission handler
 * IMPORTANT: replace the 3 placeholder values below using your Firebase Config.
 * This first version saves text only; selected photos are not uploaded.
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore, collection, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6LRSz_XtxZTWoFxEnc61V-9A_lhDQNOQ",
  authDomain: "apna-dhava.firebaseapp.com",
  projectId: "apna-dhava",
  storageBucket: "apna-dhava.firebasestorage.app",
  messagingSenderId: "1006904979424",
  appId: "1:1006904979424:web:b1db3475cdcda90aa30585"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const valueOf = (id) => (document.getElementById(id)?.value || "").trim();

async function setupSubmission(formId, statusId, type) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    status.textContent = "आपकी जानकारी जमा हो रही है…";

    try {
      let data;
      if (type === "news") {
        data = {
          type: "news",
          senderName: valueOf("newsSender").slice(0, 70),
          category: valueOf("newsCategory").slice(0, 80),
          headline: valueOf("newsHeadline").slice(0, 120),
          details: valueOf("newsDetails").slice(0, 1500),
          status: "pending",
          createdAt: serverTimestamp()
        };
      } else {
        data = {
          type: "complaint",
          senderName: valueOf("complaintSender").slice(0, 70),
          category: valueOf("complaintType").slice(0, 80),
          place: valueOf("complaintPlace").slice(0, 160),
          details: valueOf("complaintDetails").slice(0, 1500),
          status: "pending",
          createdAt: serverTimestamp()
        };
      }

      await addDoc(collection(db, "submissions"), data);
      form.reset();
      status.textContent = "आपकी जानकारी ऐप में जमा हो गई है। एडमिन जाँच के बाद आगे कार्रवाई करेगा।";
    } catch (error) {
      console.error("Apna Dhava submission error:", error);
      status.textContent = "जमा नहीं हो पाया। Config और Firestore Rules की जाँच करनी होगी।";
    } finally {
      if (button) button.disabled = false;
    }
  });
}

setupSubmission("newsForm", "newsMessage", "news");
setupSubmission("complaintForm", "complaintMessage", "complaint");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
