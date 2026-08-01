window.ProfilePage = {

    init() {

        const toggle = document.querySelector(".toggle-switch");

        if (!toggle) return;

        toggle.addEventListener("click", () => {
            toggle.classList.toggle("active");
        });

    }

};