/* ==========================================
   LANDING PAGE
========================================== */

document.addEventListener("DOMContentLoaded", async () => {
    const {
        data: { session },
    } = await window.supabaseClient.auth.getSession();

    if (session) {
        const {
            data: { user },
        } = await window.supabaseClient.auth.getUser();

        const { data: profile } = await window.supabaseClient

            .from("profiles")

            .select("setup_completed")

            .eq("id", user.id)

            .maybeSingle();

        if (profile?.setup_completed) {
            window.location.replace("./app.html");
        } else {
            window.location.replace("./pages/medical-setup.html");
        }

        return;
    }

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

    
});

