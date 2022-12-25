// Get the element to animate
const element = document.querySelector('.main-nav');
// Check if the element has already been animated
if (sessionStorage.getItem('animated') !== 'true') {
    // Set the "animated" flag in session storage
    sessionStorage.setItem('animated', 'true');
  } else {
    // If the element has already been animated, remove the "main-nav" class
    element.style.opacity = 1;
    document.querySelector(".main-nav").style.animation = 'none';
  }