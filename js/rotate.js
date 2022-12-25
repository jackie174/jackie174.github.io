const image = document.getElementsByClassName('img-center');
let angle = 0;

image[0].addEventListener('mouseenter', () => {
    image[0].style.width="200px";
    image[0].style.height="200px";
    image[0].style.transformOrigin = 'center';
    const interval = setInterval(() => {
        angle += 10;
        if (angle<=360){
          image[0].style.transform = `rotate(${angle}deg)`;  
        }
        
      }, 50);



image[0].addEventListener('mouseleave', () => {
    image[0].style.transformOrigin = 'center';
    image[0].style.width="80px";
    image[0].style.height="80px";
    clearInterval(interval);
    image[0].style.transform = `rotate(0deg)`;
    angle=0;
});
});