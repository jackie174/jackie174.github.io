let navbar = document.getElementById("main-nav");
let navPos = navbar.getBoundingClientRect().top;
let links = document.querySelectorAll("nav a");
var links_array = [].slice.call(links);
let navbarLinks = links_array.splice(0, 5);

const home_image = document.getElementById('home');
const navPosTop = home_image.offsetHeight;

window.addEventListener("scroll", e => {
    let scrollPos = window.scrollY;
    if (scrollPos> navPosTop) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    navbarLinks.forEach(link => {
        let section = document.querySelector(link.hash);
        if (scrollPos+90 > section.offsetTop && scrollPos+90 < section.offsetTop + section.offsetHeight) {
        link.classList.add("active");
        } else {
        link.classList.remove("active");
        }
    });
});

// Get the element to animate
const element = document.querySelector('.main-nav');
// Check if the element has already been animated
if (sessionStorage.getItem('animated') !== 'true') {
    // If not, add the "animated" class to the element
    element.classList.add('animated');

    // Set the "animated" flag in session storage
    sessionStorage.setItem('animated', 'true');
  } else {
    // If the element has already been animated, remove the "main-nav" class
    element.style.opacity = 1;
    document.querySelector(".main-nav").style.animation = 'none';
  }
