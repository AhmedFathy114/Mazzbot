const menuBtn = document.querySelector(".menu-toggle");
const closeBtn = document.querySelector(".close-menu");

const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");

menuBtn.addEventListener("click",()=>{

    mobileMenu.classList.add("active");

    overlay.classList.add("active");

});

closeBtn.addEventListener("click",()=>{

    mobileMenu.classList.remove("active");

    overlay.classList.remove("active");

});

overlay.addEventListener("click",()=>{

    mobileMenu.classList.remove("active");

    overlay.classList.remove("active");

});