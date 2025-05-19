 document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('show');
    });
  });


//scoll--------------------------------------------------
 function scrollDashboards(direction) {
    const scrollContainer = document.getElementById('dashboardScroll');
    const scrollAmount = 620; // Adjust if your cards are narrower
    scrollContainer.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }

//departments floating----------------------
 document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing after fade-in
        }
      });
    }, {
      threshold: 0.2
    });

    faders.forEach(fader => {
      observer.observe(fader);
    });
  });
