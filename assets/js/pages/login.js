document.addEventListener("DOMContentLoaded", async () => {

    // لو المستخدم عامل Login بالفعل
    const {
        data: { session }
    } = await window.supabaseClient.auth.getSession();

    if (session) {
        window.location.replace("../app.html");
        return;
    }

    // ==========================
    // Email Login
    // ==========================

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const { error } =
            await window.supabaseClient.auth.signInWithPassword({
                email,
                password
            });

        if (error) {
            alert(error.message);
            return;
        }

        window.location.replace("../app.html");

    });


    // ==========================
    // Google Login
    // ==========================

    const googleBtn = document.getElementById("googleLogin");

    googleBtn.addEventListener("click", async (e) => {

        e.preventDefault();

        const { error } =
            await window.supabaseClient.auth.signInWithOAuth({

                provider: "google",

                options: {
                    redirectTo: "http://127.0.0.1:5500/app.html"
                }

            });

        if (error) {
            alert(error.message);
        }

    });

});