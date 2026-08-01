const menuBtn = document.querySelector(".menu-toggle");
const closeBtn = document.querySelector(".close-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");
const themeBtn = document.querySelector(".theme-toggle");
const themeIcon = themeBtn.querySelector("i");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link, .mobile-menu a");

window.addEventListener("scroll", () => {
    let currentSection = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("nav-link--active");
        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("nav-link--active");
        }
    });
});

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
});
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
    });
});
// console.log(localStorage.getItem("theme"));
const savedTheme = localStorage.getItem("theme") || "light";

document.body.classList.toggle("dark-mode", savedTheme === "dark");
themeBtn.classList.toggle("active", savedTheme === "dark");

themeIcon.classList.replace(
    savedTheme === "dark" ? "fa-moon" : "fa-sun",
    savedTheme === "dark" ? "fa-sun" : "fa-moon"
);
// console.log("After:", document.body.className);
themeBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");
    themeBtn.classList.toggle("active");
    if(document.body.classList.contains("dark-mode")){
        themeIcon.classList.replace("fa-moon","fa-sun");
        localStorage.setItem("theme","dark");
    }else{
        themeIcon.classList.replace("fa-sun","fa-moon");
        localStorage.setItem("theme","light");
    }
});

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:.15
});
reveals.forEach(item=>observer.observe(item));