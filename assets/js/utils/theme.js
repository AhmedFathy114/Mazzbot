/* ================================================
   THEME.JS — Dark / Light Mode Toggle
   ================================================

   HOW IT WORKS:
   - We add data-theme="dark" to the <html> element
     when dark mode is on.
   - The CSS in themes/dark.css targets [data-theme="dark"]
     and overrides all the color variables automatically.
   - We save the user's preference in localStorage so
     it's remembered the next time they open the app.

   ================================================ */


/* ================================================
   applyTheme(theme)
   Applies either "dark" or "light" to the page.
   Called on page load and when the user toggles.
   ================================================ */
function applyTheme(theme) {
    const themeIcon  = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');

    if (theme === 'dark') {
        // Add the dark attribute — dark.css takes over from here
        document.documentElement.setAttribute('data-theme', 'dark');

        // Update the button icon and label
        if (themeIcon)  themeIcon.className   = 'fa-solid fa-sun';
        if (themeLabel) themeLabel.textContent = 'Light Mode';

    } else {
        // Remove the attribute to go back to light mode
        document.documentElement.removeAttribute('data-theme');

        // Update the button icon and label
        if (themeIcon)  themeIcon.className   = 'fa-solid fa-moon';
        if (themeLabel) themeLabel.textContent = 'Dark Mode';
    }
}


/* ================================================
   toggleTheme()
   Switches between dark and light.
   Saves the new preference to localStorage.
   ================================================ */
function toggleTheme() {
    // Check what the current theme is
    const currentTheme = document.documentElement.getAttribute('data-theme');

    // Flip it
    const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';

    // Save and apply
    localStorage.setItem('mazzbot-theme', newTheme);
    applyTheme(newTheme);
}


/* ================================================
   initTheme()
   Reads saved preference from localStorage and
   applies it. Also wires up the toggle button.
   Call this once from app.js.
   ================================================ */
function initTheme() {
    // Read saved theme, default to 'light' if nothing saved
    const savedTheme = localStorage.getItem('mazzbot-theme') || 'light';
    applyTheme(savedTheme);

    // Wire up the theme toggle button in the sidebar
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
}
