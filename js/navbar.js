let navbar = document.getElementById("main-nav");
let navPos = navbar.getBoundingClientRect().top;
let links = document.querySelectorAll("nav a");
var links_array = [].slice.call(links);
let navbarLinks = links_array.splice(0, 5);
window.addEventListener("scroll", e => {
  
    let scrollPos = window.scrollY;
    if (scrollPos> navPos) {
        navbar.classList.add('sticky');
        home.classList.add('navbarOffsetMargin');
    } else {
        navbar.classList.remove('sticky');
        home.classList.remove('navbarOffsetMargin');
    }
    navbarLinks.forEach(link => {
        let section = document.querySelector(link.hash);
        if (scrollPos > section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight ) {
        link.classList.add("active");
        } else {
        link.classList.remove("active");
        }
    });
});