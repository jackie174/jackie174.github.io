let navbar = document.getElementById("main-nav");
let navPos = navbar.getBoundingClientRect().top;
let links = document.querySelectorAll("nav a");
var links_array = [].slice.call(links);
let navbarLinks = links_array.splice(0, 5);

const home_image = document.getElementById("home");
const navPosTop = home_image.offsetHeight;
//The window.addEventListener method is used to attach a "scroll" event listener to the window object.
//This event listener is triggered whenever the user scrolls the page.
window.addEventListener("scroll", (e) => {
  let scrollPos = window.scrollY;
  //If the scroll position is greater than the top position of the navigation bar (navPosTop),
  //the "sticky" class is added to the navigation bar (navbar).
  //If the scroll position is less than the top position of the navigation bar, the "sticky" class is removed.
  if (scrollPos > navPosTop) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
  //The forEach method is used to iterate over the links in the navigation bar (navbarLinks).
  //For each link, the code checks if the current scroll position is within the bounds of the corresponding section on the page.
  //If it is, the "active" class is added to the link. If it is not, the "active" class is removed.

  navbarLinks.forEach((link) => {
    let section = document.querySelector(link.hash);
    if (
      scrollPos + 90 > section.offsetTop &&
      scrollPos + 90 < section.offsetTop + section.offsetHeight
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Get the element to animate
const element = document.querySelector(".main-nav");
// Check if the element has already been animated
if (sessionStorage.getItem("animated") !== "true") {
  // Set the "animated" flag in session storage
  sessionStorage.setItem("animated", "true");
} else {
  element.style.opacity = 1;
  document.querySelector(".main-nav").style.animation = "none";
}
