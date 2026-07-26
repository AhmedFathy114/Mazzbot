/* ================================================
   APP.JS — Main App Entry Point
   ================================================

   This is the last script loaded in app.html.
   By the time this runs, all other scripts
   (router.js, theme.js, page scripts) are ready.

   This file:
   1. Initializes the theme (dark/light)
   2. Initializes the router (page navigation)
   3. Sets up the mobile sidebar (hamburger button)
   4. Sets up the logout button

   ================================================ */


/* ================================================
   initSidebar()
   Handles the mobile hamburger button behavior.

   On desktop: the sidebar is always visible (CSS handles it).
   On mobile: clicking hamburger slides the sidebar in.
              clicking the overlay slides it back out.
   ================================================ */
function initSidebar() {
    const hamburgerBtn   = document.getElementById('hamburgerBtn');
    const sidebar        = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Open/close sidebar when hamburger is clicked
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-open');
            sidebarOverlay.classList.toggle('overlay-visible');
        });
    }

    // Close sidebar when the dark overlay is clicked
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('sidebar-open');
            sidebarOverlay.classList.remove('overlay-visible');
        });
    }

    // Close sidebar automatically when any nav link is clicked (mobile UX)
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('sidebar-open');
            sidebarOverlay.classList.remove('overlay-visible');
        });
    });
}


/* ================================================
   initLogout()
   Handles the logout button in the sidebar footer.

   TODO: When Supabase auth is set up, replace the
   comment below with: await supabase.auth.signOut();
   ================================================ */
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {

            // --- Supabase sign out (uncomment when ready) ---
            // await supabase.auth.signOut();

            // Redirect to the login page
            window.location.href = './pages/login.html';
        });
    }
}


/* ================================================
   APP START
   DOMContentLoaded fires when the HTML is fully
   parsed and all scripts are ready to run.
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {

    initTheme();    // apply saved dark/light preference (from theme.js)
    initRouter();   // load the correct page from the URL hash (from router.js)
    initSidebar();  // set up mobile hamburger behavior
    initLogout();   // set up logout button

});
