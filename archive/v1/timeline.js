// Drives the sticky-header "road": the car slides between company stations as you scroll,
// swaps to that company's vehicle, and its wheels spin with the scroll distance.
(function () {
  var header = document.getElementById('site-header');
  var road = document.getElementById('road');
  var car = document.getElementById('car');
  var carName = document.getElementById('car-name');
  var progress = document.getElementById('progress');
  var stops = Array.prototype.slice.call(document.querySelectorAll('[data-stop]'));
  var stations = Array.prototype.slice.call(document.querySelectorAll('.stations li'));
  var vehicles = Array.prototype.slice.call(car.querySelectorAll('.veh'));
  if (!stops.length) return;

  // Station x positions in % of the road width (must match the --x values in the markup).
  var xs = stations.map(function (li) { return parseFloat(li.style.getPropertyValue('--x')); });
  var DRIVE_START = 0.5;   // fraction of a section's scroll after which the car starts moving on
  var current = -1;
  var ticking = false;

  function setModel(i) {
    if (i === current) return;
    current = i;
    vehicles.forEach(function (v, k) { v.classList.toggle('on', k === i); });
    stations.forEach(function (li, k) {
      li.classList.toggle('passed', k < i);
      li.classList.toggle('current', k === i);
    });
    carName.textContent = stops[i].getAttribute('data-name') || '';
  }

  function update() {
    ticking = false;
    var ref = header.offsetHeight + window.innerHeight * 0.22;   // line where a section "arrives"
    var tops = stops.map(function (s) { return s.getBoundingClientRect().top; });

    var i = -1;
    for (var k = 0; k < tops.length; k++) if (tops[k] <= ref) i = k;

    var x, model;
    if (i < 0) {
      x = xs[0]; model = 0;
    } else if (i === stops.length - 1) {
      x = xs[i]; model = i;
    } else {
      var p = (ref - tops[i]) / (tops[i + 1] - tops[i]);
      p = Math.max(0, Math.min(1, p));
      // Park at this company's station while you read its section, then drive to the next
      // station over the second half of the scroll.
      var t = Math.max(0, Math.min(1, (p - DRIVE_START) / (1 - DRIVE_START)));
      x = xs[i] + (xs[i + 1] - xs[i]) * t;
      model = t > 0.5 ? i + 1 : i;       // swap vehicles halfway between two stations
    }

    car.style.left = x + '%';
    carName.style.left = x + '%';
    progress.style.width = x + '%';
    setModel(model);
    car.style.setProperty('--rot', (window.scrollY * 0.6) % 360 + 'deg');
  }

  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('load', update);
  update();
})();
