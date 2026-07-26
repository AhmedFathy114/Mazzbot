/* ================================================
   ROUTER.JS — Client-Side Page Router
   ================================================

   WHAT IS A ROUTER?
   Instead of loading a new HTML file every time you
   click a link, the router fetches just the "partial"
   HTML for that page and drops it inside #content.
   This makes the app feel fast (no full page reloads).

   HOW DOES NAVIGATION WORK HERE?
   We use "hash routing" — the URL looks like:
       app.html#dashboard
       app.html#medicines
   When the hash changes, this router loads the right page.

   HOW TO ADD A NEW PAGE:
   1. Add a new entry to the ROUTES object below.
   2. Create the partial file in /partials/
   3. Create a JS file in /assets/js/pages/
   4. Add a <script> tag for it in app.html (before app.js)
   5. Add a link in the sidebar inside app.html

   ================================================ */


/* ------------------------------------------------
   ROUTES — maps each page name to its files
   ------------------------------------------------ */
const ROUTES = {
    dashboard: {
        partial : './partials/dashboard.html',
        title   : 'Dashboard'
    },
    medicines: {
        partial : './partials/medicines.html',
        title   : 'Medicines'
    },
    habits: {
        partial : './partials/habits.html',
        title   : 'Habits'
    },
    profile: {
        partial : './partials/profile.html',
        title   : 'Profile'
    },
    report: {
        partial : './partials/report.html',
        title   : 'Report'
    },
    emergency: {
        partial : './partials/emergency.html',
        title   : 'Emergency'
    }
};

/* Which page to load if no hash is in the URL */
const DEFAULT_ROUTE = 'dashboard';


/* ------------------------------------------------
   PAGE MODULES
   Each page's JS file should expose an object like:
       window.DashboardPage = {
           init() {
               // runs every time dashboard loads
           }
       };
   The router calls .init() after injecting the HTML.
   ------------------------------------------------ */
const PAGE_MODULES = {
    dashboard : () => window.DashboardPage,
    medicines : () => window.MedicinesPage,
    habits    : () => window.HabitsPage,
    profile   : () => window.ProfilePage,
    report    : () => window.ReportPage,
    emergency : () => window.EmergencyPage
};


/* ================================================
   navigate(pageName)

   The main function. Call it with a page name like:
       navigate('dashboard');

   It will:
   1. Show a loading spinner in #content
   2. Fetch the partial HTML file
   3. Inject it into #content
   4. Call the page's init() function (if it exists)
   5. Update the active link in the sidebar
   6. Update the page title in the navbar
   ================================================ */
async function navigate(pageName) {

    // Look up the route — fall back to dashboard if page not found
    const route = ROUTES[pageName] || ROUTES[DEFAULT_ROUTE];

    // If page wasn't found, use the default name
    if (!ROUTES[pageName]) {
        pageName = DEFAULT_ROUTE;
    }

    const contentEl = document.getElementById('content');

    // Step 1 — Show loading spinner while we fetch
    contentEl.innerHTML = `
        <div class="content-loader">
            <i class="fa-solid fa-spinner fa-spin"></i>
        </div>
    `;

    try {
        // Step 2 — Fetch the partial HTML file
        const response = await fetch(route.partial);

        if (!response.ok) {
            // File exists but returned an error (e.g. 404)
            showPlaceholder(contentEl, route.title);
            return;
        }

        const html = await response.text();

        // Step 3 — Check if the partial is empty (not built yet)
        if (!html.trim()) {
            showPlaceholder(contentEl, route.title);
        } else {
            // Inject the partial's HTML into #content
            contentEl.innerHTML = html;
        }

        // Step 4 — Run the page's init() if it exists
        const getModule = PAGE_MODULES[pageName];
        if (getModule) {
            const pageModule = getModule();
            if (pageModule && typeof pageModule.init === 'function') {
                pageModule.init();
            }
        }

    } catch (error) {
        // Network error or fetch failed
        console.error(`[Router] Failed to load page "${pageName}":`, error);
        contentEl.innerHTML = `
            <div class="page-error">
                <p><i class="fa-solid fa-circle-exclamation"></i>
                Failed to load page. Check the console for details.</p>
            </div>
        `;
    }

    // Step 5 — Highlight the active sidebar link
    setActiveLink(pageName);

    // Step 6 — Update the navbar title
    const titleEl = document.getElementById('pageTitle');
    if (titleEl) {
        titleEl.textContent = route.title;
    }
}


/* ================================================
   showPlaceholder(container, title)
   Shows a "coming soon" message when a partial is
   empty or hasn't been built yet.
   ================================================ */
function showPlaceholder(container, title) {
    container.innerHTML = `
        <div class="page-placeholder">
            <i class="fa-solid fa-hammer"></i>
            <h2>${title}</h2>
            <p>This page is under construction.</p>
        </div>
    `;
}


/* ================================================
   setActiveLink(pageName)
   Removes "active" from all sidebar links, then
   adds "active" to the one matching pageName.
   ================================================ */
function setActiveLink(pageName) {
    // Remove active from all
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });

    // Add active to the matching one
    const activeLink = document.querySelector(`.sidebar-link[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}


/* ================================================
   initRouter()
   Sets up the hash-change listener and loads the
   first page. Call this once from app.js.
   ================================================ */
function initRouter() {

    // Listen for hash changes (e.g. clicking a sidebar link or browser back/forward)
    window.addEventListener('hashchange', () => {
        // window.location.hash is "#dashboard" — we strip the "#"
        const page = window.location.hash.replace('#', '') || DEFAULT_ROUTE;
        navigate(page);
    });

    // Load the correct page on first visit
    const initialPage = window.location.hash.replace('#', '') || DEFAULT_ROUTE;
    navigate(initialPage);
}
