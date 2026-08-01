/* ================================================
   THEME.JS — تبديل الوضع الداكن / الفاتح
   ================================================

   - بنضيف data-theme="dark" على الـ <html> tag
     لما الدارك مود يكون شغال.
   - الـ CSS بتاعة themes/dark.css بتستهدف [data-theme="dark"]
     وبتغير كل الألوان لوحدها.
   - بنحفظ اختيار المستخدم في localStorage عشان
     يفضل متذكره لما يفتح التطبيق تاني.

   ================================================ */


/* applyTheme(theme)
   بتطبق "dark" أو "light" على الصفحة.
   بتتنادى أول ما الصفحة تفتح، وكمان لما المستخدم يدوس على الزرار */
   function applyTheme(theme) {
    const themeIcon  = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');

    if (theme === 'dark') {
        // بنضيف الـ attribute — وبعدين dark.css هي اللي بتتصرف
        document.documentElement.setAttribute('data-theme', 'dark');

        // نغير شكل الأيقونة والنص بتاع الزرار
        if (themeIcon)  themeIcon.className   = 'fa-solid fa-sun';
        if (themeLabel) themeLabel.textContent = 'Light Mode';

    } else {
        // نشيل الـ attribute عشان نرجع للوضع الفاتح
        document.documentElement.removeAttribute('data-theme');

        // نغير شكل الأيقونة والنص تاني
        if (themeIcon)  themeIcon.className   = 'fa-solid fa-moon';
        if (themeLabel) themeLabel.textContent = 'Dark Mode';
    }
}


/* toggleTheme()
   بتبدل بين الدارك والدارك... يعني بين dark و light.

   وبتحفظ الاختيار الجديد في localStorage */
function toggleTheme() {
    // نشوف ايه الثيم الحالي
    const currentTheme = document.documentElement.getAttribute('data-theme');

    // نقلبه
    const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';

    // نحفظ ونطبق
    localStorage.setItem('mazzbot-theme', newTheme);
    applyTheme(newTheme);
}
//و التعامل طبعا DOM

/* initTheme()
بت initialize الليلة ديه كلها اصلا و مربوطة في فايل ال App   
*/
function initTheme() {
    // نجيب الثيم المحفوظ، ولو مفيش حاجة نستخدم 'light'
    const savedTheme = localStorage.getItem('mazzbot-theme') || 'light';
    applyTheme(savedTheme);

    // نربط زرار تبديل الثيم اللي في الـ sidebar
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
}