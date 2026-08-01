/* ================================================
   APP.JS
   ================================================

   ده آخر سكريبت بيتحمل في app.html.
   لما الكود ده يشتغل

   الملف ده بيعمل:
   1. يشغل الثيم (دارك/لايت)
   2. يشغل الراوتر (التنقل بين الصفحات)
   3. بيظبط ال hamburger button بتاع ال sidebar
   4. Logout button

   ================================================ */


//   initSidebar()

                 function initSidebar() {
                    const hamburgerBtn   = document.getElementById('hamburgerBtn');
                    const sidebar        = document.getElementById('sidebar');
                    const sidebarOverlay = document.getElementById('sidebarOverlay');

                    if (hamburgerBtn) {
                        hamburgerBtn.addEventListener('click', () => {
                            sidebar.classList.toggle('sidebar-open');
                            sidebarOverlay.classList.toggle('overlay-visible');
                        });
                    }

                    if (sidebarOverlay) {
                        sidebarOverlay.addEventListener('click', () => {
                            sidebar.classList.remove('sidebar-open');
                            sidebarOverlay.classList.remove('overlay-visible');
                        });
                    }

                    //to automatically close the side whenever you press on any link in the sidebar
                    document.querySelectorAll('.sidebar-link').forEach(link => {
                        link.addEventListener('click', () => {
                            sidebar.classList.remove('sidebar-open');
                            sidebarOverlay.classList.remove('overlay-visible');
                        });
                    });
                }

                // Logout
                function initLogout() {
                    const logoutBtn = document.getElementById('logoutBtn');

                    if (logoutBtn) {
                        logoutBtn.addEventListener('click', async () => {


                            // await supabase.auth.signOut();
                            // And route back to login page
                            window.location.href = './pages/login.html';
                        });
                    }
                }

                /* ================================================
                   بداية التطبيق
                   DOMContentLoaded بتشتغل لما الـ HTML يخلص تحميل
                   وكل السكريبتات تبقى جاهزة تشتغل.
                   ================================================ */
                document.addEventListener('DOMContentLoaded', () => {

                    initTheme();
                    initRouter();
                    initSidebar();
                    initLogout();

                });