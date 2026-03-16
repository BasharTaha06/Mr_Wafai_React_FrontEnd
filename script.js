// Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// REPLACE THESE VALUES with your Firebase Project config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- UI Logic ---

// Attach functions to window so HTML inline onclick events can access them
window.toggleMenu = function() {
    document.getElementById("navLinks").classList.toggle("active");
};

// Slider Logic
let slides = document.querySelectorAll(".slide");
if (slides.length > 0) {
    let index = 0;
    function changeSlide() {
        slides[index].classList.remove("active");
        index++;
        if (index >= slides.length) {
            index = 0;
        }
        slides[index].classList.add("active");
    }
    setInterval(changeSlide, 5000);
}

// Printer Filter Logic
window.filterPrinters = function(type) {
    let printers = document.querySelectorAll(".printer-card");
    printers.forEach(function(card) {
        if (type === "all") {
            card.style.display = "block";
        } else if (card.classList.contains(type)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
};

// Cart Logic
window.addToCart = function(productName) {
    let cart = JSON.parse(localStorage.getItem("mr_wafay_cart")) || [];
    cart.push(productName);
    localStorage.setItem("mr_wafay_cart", JSON.stringify(cart));
    alert(productName + " تم إضافتها إلى الطلب");
};

window.showCart = function() {
    let cart = JSON.parse(localStorage.getItem("mr_wafay_cart")) || [];
    if (cart.length === 0) {
        alert("السلة فارغة");
    } else {
        alert("الطلبات: " + cart.join(" , "));
    }
};

// --- Firebase Logic: Repair Form ---
const repairForm = document.getElementById("maintenanceForm");
if (repairForm) {
    repairForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        const submitButton = repairForm.querySelector('button[type="submit"]');
        submitButton.innerText = "جاري الإرسال...";
        submitButton.disabled = true;

        try {
            await addDoc(collection(db, "maintenance_requests"), {
                name: document.getElementById("custName").value,
                phone: document.getElementById("custPhone").value,
                printerType: document.getElementById("printerType").value,
                printerModel: document.getElementById("printerModel").value,
                issue: document.getElementById("issueDetails").value,
                status: "new",
                createdAt: serverTimestamp()
            });
            
            alert("تم إرسال طلب الصيانة بنجاح، سنتواصل معك قريباً.");
            repairForm.reset();
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.");
        } finally {
            submitButton.innerText = "إرسال الطلب";
            submitButton.disabled = false;
        }
    });
}