/* Contact orb: morphs to match whichever contact link is hovered or focused.
 * Needs orb.js (github.com/ShazMoghaddam/orbs) loaded first. */
(function () {
  'use strict';
  var wrap = document.querySelector('.contact-orb');
  var canvas = wrap && wrap.querySelector('canvas');
  var orb = canvas && canvas._orb;
  if (!orb) return;

  var IDLE = 'sphere';
  var MAP = [
    ['a[href^="mailto:"]', 'ticks'],          // sending
    ['.contact-phone', 'wave'],               // a voice
    ['a[href*="github.com"]', 'cube'],        // building blocks
    ['a[href*="linkedin.com"]', 'constellation'], // a network
    ['a[href*="instagram.com"]', 'torus'],    // a lens
    ['.cv-download', 'helix']                 // your DNA
  ];
  var timer;

  function activate(shape) {
    clearTimeout(timer);
    if (orb.shape !== shape) orb.morph(shape);
    wrap.classList.add('is-active');
    orb.refreshColor();
  }
  function settle() {
    clearTimeout(timer);
    timer = setTimeout(function () {
      orb.morph(IDLE);
      wrap.classList.remove('is-active');
      orb.refreshColor();
    }, 900);
  }

  MAP.forEach(function (m) {
    var el = document.querySelector('.contact ' + m[0]);
    if (!el) return;
    el.addEventListener('pointerenter', function () { activate(m[1]); });
    el.addEventListener('focus', function () { activate(m[1]); });
    el.addEventListener('pointerleave', settle);
    el.addEventListener('blur', settle);
  });

  // Touch screens have no hover, so slowly show the same shapes on their own.
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) {
    orb.order = [IDLE].concat(MAP.map(function (m) { return m[1]; }));
    orb.cycle = 3500;
  }
})();
