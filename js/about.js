//team slideshow
const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slides = document.querySelectorAll(".slide");
const slideIcons = document.querySelectorAll(".slide-icon");
const numberOfSlides = slides.length;
var slideNumber = 0;

nextBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });

  slideNumber++;

  if (slideNumber > numberOfSlides - 1) {
    slideNumber = 0;
  }

  slides[slideNumber].classList.add("active");
  slideIcons[slideNumber].classList.add("active");
});

// image slider previous button
prevBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });

  slideNumber--;

  if (slideNumber < 0) {
    slideNumber = numberOfSlides - 1;
  }

  slides[slideNumber].classList.add("active");
  slideIcons[slideNumber].classList.add("active");
});

// image slider autoplay
var playSlider;

var repeater = () => {
  playSlider = setInterval(function () {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
      slideIcon.classList.remove("active");
    });

    slideNumber++;

    if (slideNumber > numberOfSlides - 1) {
      slideNumber = 0;
    }

    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
  }, 3500);
};
repeater();

// stop image slider autoplay on mouseover
slider.addEventListener("mouseover", () => {
  clearInterval(playSlider);
});

// start image slider autoplay again on mouseout
slider.addEventListener("mouseout", () => {
  repeater();
});

//scrolling
        //javascript for navigation bar effects on scroll
        window.addEventListener("scroll", function(){
            const header = document.querySelector("header");
            header.classList.toggle('sticky', window.scrollY > 0);
          });
          
          //javascript for responsive navigation sidebar menu
          const menuBtn = document.querySelector(".menu-btn");
          const navigation = document.querySelector(".navigation");
          const navigationItems = document.querySelectorAll(".navigation a")
          
          menuBtn.addEventListener("click",  () => {
            menuBtn.classList.toggle("active");
            navigation.classList.toggle("active");
          });
          
          navigationItems.forEach((navigationItem) => {
            navigationItem.addEventListener("click", () => {
              menuBtn.classList.remove("active");
              navigation.classList.remove("active");
            });
          });
          
          //javascript for scroll to top button wala muna
          const scrollBtn = document.querySelector(".scrollToTop-btn");
          
          window.addEventListener("scroll", function(){
            scrollBtn.classList.toggle("active", window.scrollY > 500);
          });
          
          /*javascript for scroll back to top on click scroll-to-top button
          
         scrollBtn.addEventListener("click", () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          });
          */
          
          //javascript for reveal website elements on scroll
          window.addEventListener("scroll", reveal);
          
          function reveal(){
            var reveals = document.querySelectorAll(".reveal");
          
            for(var i = 0; i < reveals.length; i++){
              var windowHeight = window.innerHeight;
              var revealTop = reveals[i].getBoundingClientRect().top;
              var revealPoint = 50;
          
              if(revealTop < windowHeight - revealPoint){
                reveals[i].classList.add("active");
              }
            }
          }
          