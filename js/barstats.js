document.addEventListener('DOMContentLoaded', function() {
    var bars = document.querySelectorAll('.bars li .bar');
    var percentages = [22, 44, 53, 75, 100]; //data lol hardcode
    var animationDuration = 1500;
  
    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // Trigger
    };
  
    var observer = new IntersectionObserver(handleIntersect, options);
  
    function handleIntersect(entries) {
      entries.forEach(function(entry, index) {
        if (entry.isIntersecting) {
          animateBar(bars[index], percentages[index]);
          observer.unobserve(entry.target);
        }
      });
    }
  
    function animateBar(bar, percentage) {
      var currentHeight = 0;
      var startTime;
  
      function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / animationDuration;
  
        if (progress < 1) {
          currentHeight = percentage * progress;
          bar.style.height = currentHeight + '%';
          requestAnimationFrame(animate);
        } else {
          bar.style.height = percentage + '%';
        }
      }
  
      requestAnimationFrame(animate);
    }
  
    bars.forEach(function(bar) {
      observer.observe(bar);
    });
  });