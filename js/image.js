const image = document.getElementsByClassName("img-center");
let angle = 0;

image[0].addEventListener("mouseenter", () => {
  image[0].style.width = "80px";
  image[0].style.height = "80px";
  image[0].style.transformOrigin = "center";
  const interval = setInterval(() => {
    angle += 10;
    if (angle <= 360) {
      image[0].style.transform = `rotate(${angle}deg) `;
    }
  }, 50);

  image[0].addEventListener("mouseleave", () => {
    image[0].style.transformOrigin = "center";
    image[0].style.width = "80px";
    image[0].style.height = "80px";
    clearInterval(interval);
    image[0].style.transform = `rotate(0deg)`;
    angle = 0;
  });
});
// Get the element to animate
const element_img = document.querySelector(".img-center");
// Check if the element has already been animated
if (sessionStorage.getItem("animated_image") !== "true") {
  // Set the "animated" flag in session storage
  sessionStorage.setItem("animated_image", "true");
} else {
  // If the element has already been animated, remove the "main-nav" class
  element_img.style.opacity = 1;
  document.querySelector(".img-center").style.animation = "none";
}
