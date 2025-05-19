// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
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


// Manual Slideshow for .voices
let voiceSlideIndex = 1;
showVoiceSlides(voiceSlideIndex);

function plusVoiceSlides(n) {
  showVoiceSlides(voiceSlideIndex += n);
}

function currentVoiceSlide(n) {
  showVoiceSlides(voiceSlideIndex = n);
}

function showVoiceSlides(n) {
  let i;
  let slides = document.getElementsByClassName("voices");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("voices-cap");
  
  if (n > slides.length) { voiceSlideIndex = 1 }
  if (n < 1) { voiceSlideIndex = slides.length }
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[voiceSlideIndex-1].style.display = "block";  
  dots[voiceSlideIndex-1].className += " active";
  captionText.innerHTML = dots[voiceSlideIndex-1].alt;
}
