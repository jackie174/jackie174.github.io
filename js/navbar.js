let navbar = document.getElementById("main-nav");
let navPos = navbar.getBoundingClientRect().top;
let links = document.querySelectorAll("nav a");
var links_array = [].slice.call(links);
let navbarLinks = links_array.splice(0, 5);
window.addEventListener("scroll", e => {
  
    let scrollPos = window.scrollY;
    if (scrollPos+100 > navPos) {
        navbar.classList.add('sticky');
        home.classList.add('navbarOffsetMargin');
    } else {
        navbar.classList.remove('sticky');
        navbar.classList.remove('fixed');
        home.classList.remove('navbarOffsetMargin');
    }
    navbarLinks.forEach(link => {
        let section = document.querySelector(link.hash);
        if (scrollPos + 100 > section.offsetTop && scrollPos + 100 < section.offsetTop + section.offsetHeight ) {
        link.classList.add("active");
        } else {
        link.classList.remove("active");
        }
    });
});