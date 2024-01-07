document.addEventListener('DOMContentLoaded', function () {
    var bars = document.querySelectorAll('.vertbar');
    var animationDuration = 3000;
  
    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // Trigger
    };
  
    var observer = new IntersectionObserver(handleIntersect, options);
  
    function handleIntersect(entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          var percentage = parseFloat(bar.style.getPropertyValue('--bar-value'));
          animateBar(bar, percentage);
          observer.unobserve(bar);
        }
      });
    }
  
    function animateBar(bar, percentage) {
      bar.style.width = '0';
      bar.style.animation = `barGrow ${animationDuration / 2000}s ease-in-out`;
      bar.style.width = percentage + '%';
    }
  
    bars.forEach(function (bar) {
      observer.observe(bar);
    });
  });
  