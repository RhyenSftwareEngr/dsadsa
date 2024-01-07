const site_wide_cursor = document.querySelector('.custom-cursor.site-wide');

document.addEventListener('mouseenter', () => {
	site_wide_cursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
	site_wide_cursor.style.display = 'none';
});

document.addEventListener('mousemove', TrackCursor);

document.addEventListener('mousedown', () => site_wide_cursor.classList.add('active'));
document.addEventListener('mouseup', () => site_wide_cursor.classList.remove('active'));

function TrackCursor(evt) {
	const w = site_wide_cursor.clientWidth;
	const h = site_wide_cursor.clientHeight;

	site_wide_cursor.style.transform = 
		`translate(${evt.clientX - w/2}px, ${evt.clientY - h/2}px)`;
}

   var dots = [],
   mouse = {
	 x: 0,
	 y: 0
   };


var Dot = function() {
 this.x = 0;
 this.y = 0;
 this.node = (function(){
   var n = document.createElement("div");
   n.className = "trail";
   document.body.appendChild(n);
   return n;
 }());
};

Dot.prototype.draw = function() {
 this.node.style.left = this.x + "px";
 this.node.style.top = this.y + "px";
};

for (var i = 0; i < 12; i++) {
 var d = new Dot();
 dots.push(d);
}

function draw() {
 var x = mouse.x,
	 y = mouse.y;
 
 dots.forEach(function(dot, index, dots) {
   var nextDot = dots[index + 1] || dots[0];
   
   dot.x = x;
   dot.y = y;
   dot.draw();
   x += (nextDot.x - dot.x) * .6;
   y += (nextDot.y - dot.y) * .6;

 });
}

addEventListener("mousemove", function(event) {
 mouse.x = event.pageX;
 mouse.y = event.pageY;
});

function animate() {
 draw();
 requestAnimationFrame(animate);
}

animate();