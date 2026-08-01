/* ==========================================
   LANDING PAGE
========================================== */

const menuBtn = document.querySelector(".landing-menu-toggle");
const closeBtn = document.querySelector(".landing-close-menu");

const mobileMenu = document.querySelector(".landing-mobile-menu");
const overlay = document.querySelector(".landing-overlay");

/* ==========================
   OPEN MENU
========================== */

if (menuBtn) {
    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.add("active");
        overlay.classList.add("active");

    });
}

/* ==========================
   CLOSE BUTTON
========================== */

if (closeBtn) {
    closeBtn.addEventListener("click", () => {

        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");

    });
}

/* ==========================
   CLICK OUTSIDE
========================== */

if (overlay) {
    overlay.addEventListener("click", () => {

        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");

    });
}