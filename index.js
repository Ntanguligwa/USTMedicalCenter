document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('show');
  });
});

// Automatic Slideshow for .mySlides
let autoSlideIndex = 0;
showAutoSlides();

function showAutoSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  autoSlideIndex++;
  if (autoSlideIndex > slides.length) {autoSlideIndex = 1}    
  
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[autoSlideIndex-1].style.display = "block";  
  dots[autoSlideIndex-1].className += " active";
  
  setTimeout(showAutoSlides, 2000); // Change image every 2 seconds
}


