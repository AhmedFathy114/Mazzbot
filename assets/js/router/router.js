/* ================================================
   ROUTER.JS — Client-Side Page Router
   ================================================

الراوتر ده بيعمل ايه؟
   بدل ما تعمل تحميل لصفحة HTML جديدة كل مرة تدوس على لينك،
   الراوتر بيجيب بس الـ"partial" بتاع الصفحة دي
   وبيحطه جوه #content.
   ده بيخلي التطبيق حاسس إنه سريع (من غير ما الصفحة تتحمل من الأول تاني).

   التنقل هنا بيشتغل ازاي؟
   احنا بنستخدم "hash routing" — يعني الرابط بيبقى شكله كده:
       app.html#dashboard
       app.html#medicines
   لما الـ hash يتغير، الراوتر ده هو اللي بيحمّل الصفحة الصح.

   ازاي تضيف صفحة جديدة؟
   1. ضيف entry جديد في الـ ROUTES object تحت.
   2. اعمل ملف الـ partial في /partials/
   3. اعمل ملف JS في /assets/js/pages/
   4. ضيف <script> tag ليه في app.html (قبل app.js)
   5. ضيف لينك في الـ sidebar جوه app.html
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
   "ده برضو كان ترشيح من كلود، انا كنت هخليه يعملها onclick و هتعامل معاها كلينك عادي"
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
 "علشان كدة بنحط اسامي ال pages مظبوطة في ال partials"
   ================================================ */
async function navigate(pageName) {

    // Look up the route — fall back to dashboard if page not found
    const route = ROUTES[pageName] || ROUTES[DEFAULT_ROUTE];

    // If page wasn't found, use the default name
    if (!ROUTES[pageName]) {
        pageName = DEFAULT_ROUTE;
    }

    const contentEl = document.getElementById('content');

    // 1- show spiner
    contentEl.innerHTML = `
        <div class="content-loader">
            <i class="fa-solid fa-spinner fa-spin"></i>
        </div>
    `;

    try {
        //2- Fetch the partial HTML file
        const response = await fetch(route.partial);

        if (!response.ok) {
            // File exists but returned an error (e.g. 404)
            showPlaceholder(contentEl, route.title);
            return;
        }

        const html = await response.text();

        // 3- Check if the partial is empty كما هو الوضع حاليا يعني
        // و لو حد عنده طريقة احسن يهندل الايرور ده ok
        if (!html.trim()) {
            showPlaceholder(contentEl, route.title);
        } else {
            // Inject the page عادي
            contentEl.innerHTML = html;
        }

        // run the page's init()
        const getModule = PAGE_MODULES[pageName];
        if (getModule) {
            const pageModule = getModule();
            if (pageModule && typeof pageModule.init === 'function') {
                pageModule.init();
            }
        }

    } catch (error) {
        // ده لو فيه network error و كان اقتراح ai برضو
        console.error(`[Router] Failed to load page "${pageName}":`, error);
        contentEl.innerHTML = `
            <div class="page-error">
                <p><i class="fa-solid fa-circle-exclamation"></i>
                Failed to load page. Check the console for details.</p>
            </div>
        `;
    }

    // 5- Highlight the active sidebar page
    setActiveLink(pageName);

    // 6- Update the navbar title
    const titleEl = document.getElementById('pageTitle');
    if (titleEl) {
        titleEl.textContent = route.title;
    }

    // ديه مفروض لما نخليه responsive تتشال علشان مش هيبقي فيه title اصلا بس لسه مفكرتش ازاي
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
