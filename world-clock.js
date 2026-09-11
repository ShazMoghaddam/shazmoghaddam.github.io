/* ============================================================
   World clock strip for shazmoghaddam.github.io
   Live analog clocks (sweeping seconds) for five cities, each
   with a sun/moon icon by its label. Day = 06:00–17:59 local
   (change DAY_START / DAY_END below to widen the daytime band).
   Colours come from the site's theme tokens via CSS.
   Safe in <head> or before </body>. Honors prefers-reduced-motion.
   ============================================================ */
(function () {
  var DAY_START = 6, DAY_END = 18;   // local hours counted as daytime (sun)

  function init() {
    var bar = document.getElementById('world-clock');
    if (!bar || bar.dataset.built) return;
    bar.dataset.built = '1';

    var cities = [
      { label:'New York',     tz:'America/New_York' },
      { label:'Buenos Aires', tz:'America/Argentina/Buenos_Aires' },
      { label:'Berlin',       tz:'Europe/Berlin' },
      { label:'Tehran',       tz:'Asia/Tehran' },
      { label:'Tokyo',        tz:'Asia/Tokyo' }
    ];

    var SUN='<svg class="wc-ic wc-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">'+
      '<circle cx="12" cy="12" r="4"/>'+
      '<line x1="12" y1="2" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22"/>'+
      '<line x1="2" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22" y2="12"/>'+
      '<line x1="4.9" y1="4.9" x2="6.7" y2="6.7"/><line x1="17.3" y1="17.3" x2="19.1" y2="19.1"/>'+
      '<line x1="19.1" y1="4.9" x2="17.3" y2="6.7"/><line x1="6.7" y1="17.3" x2="4.9" y2="19.1"/></svg>';
    var MOON='<svg class="wc-ic wc-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+
      '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    function ticks(){
      var s='';
      for(var i=0;i<12;i++){
        if(i%3===0) continue;
        var a=i*30*Math.PI/180,o=45.5,n=42;
        s+='<line class="wc-tick" x1="'+(50+o*Math.sin(a)).toFixed(2)+'" y1="'+(50-o*Math.cos(a)).toFixed(2)+
           '" x2="'+(50+n*Math.sin(a)).toFixed(2)+'" y2="'+(50-n*Math.cos(a)).toFixed(2)+'"/>';
      }
      return s;
    }
    function nums(){
      var r=35;
      return '<text class="wc-num" x="50" y="'+(50-r)+'">12</text>'+
             '<text class="wc-num" x="'+(50+r)+'" y="50">3</text>'+
             '<text class="wc-num" x="50" y="'+(50+r)+'">6</text>'+
             '<text class="wc-num" x="'+(50-r)+'" y="50">9</text>';
    }
    var face='<svg viewBox="0 0 100 100" class="wc-face">'+
      '<circle class="wc-ring" cx="50" cy="50" r="47"/>'+ticks()+nums()+
      '<g class="wc-hour"><line x1="50" y1="50" x2="50" y2="30"/></g>'+
      '<g class="wc-min"><line x1="50" y1="50" x2="50" y2="19"/></g>'+
      '<g class="wc-sec"><line x1="50" y1="57" x2="50" y2="15"/></g>'+
      '<circle class="wc-pin" cx="50" cy="50" r="1.8"/></svg>';

    cities.forEach(function(c){
      var w=document.createElement('div'); w.className='wc-clock';
      w.innerHTML=face+'<div class="wc-name">'+SUN+MOON+'<span>'+c.label+'</span></div>';
      c.el=w; c.hour=w.querySelector('.wc-hour'); c.min=w.querySelector('.wc-min'); c.sec=w.querySelector('.wc-sec');
      c.fmt=new Intl.DateTimeFormat('en-US',{timeZone:c.tz,hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'});
      c.p={hour:0,minute:0,second:0}; bar.appendChild(w);
    });
    function partsOf(f,d){var o={};f.formatToParts(d).forEach(function(p){if(p.type!=='literal')o[p.type]=parseInt(p.value,10);});if(o.hour===24)o.hour=0;return o;}
    var last=-1;
    function refresh(now){
      last=Math.floor(now.getTime()/1000);
      cities.forEach(function(c){
        c.p=partsOf(c.fmt,now);
        var day=c.p.hour>=DAY_START && c.p.hour<DAY_END;
        c.el.classList.toggle('is-night', !day);
      });
    }
    function render(frac){cities.forEach(function(c){
      var s=c.p.second+frac,m=c.p.minute+s/60,h=(c.p.hour%12)+m/60;
      c.sec.setAttribute('transform','rotate('+(s*6)+' 50 50)');
      c.min.setAttribute('transform','rotate('+(m*6)+' 50 50)');
      c.hour.setAttribute('transform','rotate('+(h*30)+' 50 50)');
    });}
    var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce){function step(){var n=new Date();refresh(n);render(0);}step();setInterval(step,1000);}
    else{refresh(new Date());(function frame(){var n=new Date();if(Math.floor(n.getTime()/1000)!==last)refresh(n);render(n.getMilliseconds()/1000);requestAnimationFrame(frame);})();}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
