document.addEventListener("DOMContentLoaded", async () => {
    // ==========================
    // Already Logged In
    // ==========================

    const {
        data: { session },
    } = await window.supabaseClient.auth.getSession();

    if (session) {
        window.location.replace("../app.html");
        return;
    }

    // ==========================
    // Register
    // ==========================

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const agreeTerms = document.getElementById("agreeTerms").checked;

        // Validation

        if (!firstName || !lastName) {
            alert("Please enter your full name.");
            return;
        }

        if (!email) {
            alert("Please enter your email.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!agreeTerms) {
            alert("Please accept Terms & Privacy Policy.");
            return;
        }

        // Register

        const { data, error } = await window.supabaseClient.auth.signUp({
            email,
            password,

            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                },
            },
        });
        console.log("SIGNUP DATA:", data);
console.log("SESSION:", data.session);
console.log("USER:", data.user);

        if (error) {
            alert(error.message);
            return;
        }

        const user = data.user;

        const { error: profileError } = await window.supabaseClient
            .from("profiles")
            .insert({
                id: user.id,
                first_name: firstName,
                last_name: lastName,
                full_name: `${firstName} ${lastName}`,
                email: user.email,
                avatar_url: null,
                provider: "email",
                setup_completed: false,
            });

        if (profileError) {
            console.error(profileError);
            alert(profileError.message);
            return;
        }

        window.location.replace("../pages/medical-setup.html");
    });

    // ==========================
    // Google Register
    // ==========================

    const googleBtn = document.getElementById("googleRegister");

    googleBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const { error } = await window.supabaseClient.auth.signInWithOAuth({
            provider: "google",

            options: {
                redirectTo: `${window.location.origin}/app.html`
            },
        });

        if (error) {
            alert(error.message);
        }
    });
});
