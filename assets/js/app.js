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
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", () => {
            sidebar.classList.toggle("sidebar-open");
            sidebarOverlay.classList.toggle("overlay-visible");
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            sidebar.classList.remove("sidebar-open");
            sidebarOverlay.classList.remove("overlay-visible");
        });
    }

    //to automatically close the side whenever you press on any link in the sidebar
    document.querySelectorAll(".sidebar-link").forEach((link) => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("sidebar-open");
            sidebarOverlay.classList.remove("overlay-visible");
        });
    });
}

// Logout
function initLogout() {
    const logoutBtn = document.getElementById("logoutBtn");

    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", async () => {
        const { error } = await window.supabaseClient.auth.signOut();

        if (error) {
            alert(error.message);
            return;
        }

        window.location.replace("./index.html"); // أو "./pages/login.html" حسب اللي عايزه
    });
}

/* ================================================
                   بداية التطبيق
                   DOMContentLoaded بتشتغل لما الـ HTML يخلص تحميل
                   وكل السكريبتات تبقى جاهزة تشتغل.
                   ================================================ */
document.addEventListener("DOMContentLoaded", async () => {
    // ==========================
    // Check Session
    // ==========================

    const {
        data: { session },
    } = await window.supabaseClient.auth.getSession();

    if (!session) {
        window.location.replace("./pages/login.html");
        return;
    }

    history.pushState(null, "", location.href);

    window.addEventListener("popstate", () => {
        history.pushState(null, "", location.href);
    });

    const userName = document.getElementById("userName");
    const userAvatar = document.getElementById("userAvatar");
    const {
        data: { user },
    } = await window.supabaseClient.auth.getUser();
    // ==========================
    // Check Profile
    // ==========================

    let { data: profile } = await window.supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

    // أول مرة يدخل
    // أول مرة (مثلاً Google Login لأول مرة)
    if (!profile) {
        const provider = user.app_metadata.provider;

        let firstName = "";
        let lastName = "";
        let fullName = "";
        let avatar = null;

        if (provider === "google") {
            fullName = user.user_metadata.full_name || "";

            const names = fullName.split(" ");

            firstName = names[0] || "";

            lastName = names.slice(1).join(" ");

            avatar = user.user_metadata.avatar_url || null;
        } else {
            firstName = user.user_metadata.first_name || "";

            lastName = user.user_metadata.last_name || "";

            fullName = `${firstName} ${lastName}`.trim();
        }

        const { data: newProfile, error } = await window.supabaseClient

            .from("profiles")

            .insert({
                id: user.id,

                first_name: firstName,

                last_name: lastName,

                full_name: fullName,

                email: user.email,

                avatar_url: avatar,

                provider: provider,

                setup_completed: false,
            })

            .select()

            .single();

        if (error) {
            console.error(error);

            return;
        }

        profile = newProfile;
    }

    // Profile قديم وناقص بيانات
    else if (!profile.full_name) {
        const updates = {
            first_name:
                user.app_metadata.provider === "google"
                    ? user.user_metadata.full_name?.split(" ")[0] || ""
                    : profile.first_name,

            last_name:
                user.app_metadata.provider === "google"
                    ? user.user_metadata.full_name?.split(" ").slice(1).join(" ") || ""
                    : profile.last_name,

            full_name: user.user_metadata.full_name || profile.full_name,
            email: user.email,
            avatar_url: user.user_metadata.avatar_url || profile.avatar_url,
            provider: user.app_metadata.provider,
        };

        const { error } = await window.supabaseClient
            .from("profiles")
            .update(updates)
            .eq("id", user.id);

        if (error) {
            console.error(error);
        }

        profile = {
            ...profile,
            ...updates,
        };
    }

    userName.textContent =`${profile.first_name} ${profile.last_name}`;

    userAvatar.src =
        profile.avatar_url ||
        "https://th.bing.com/th/id/OIP.Z_jhZ7blTOttN8SAe20ZQAAAAA?w=166&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";

    // السيت أب ناقص
    if (!profile.setup_completed) {
        window.location.replace("./pages/medical-setup.html");
        return;
    }

    // ==========================
    // Start App
    // ==========================

    initTheme();
    initRouter();
    initSidebar();
    initLogout();
});
