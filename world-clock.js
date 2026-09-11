/* ============================================================
   World clock strip for shazmoghaddam.github.io
   Live analog clocks (sweeping seconds) for five cities.
   Colours come from the site's theme tokens via CSS, so this
   file only handles time + hand angles. Safe to load in <head>
   or before </body>. Honors prefers-reduced-motion.
   ============================================================ */
(function () {
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

    function ticks(){
      var s='';
      for(var i=0;i<12;i++){
        if(i%3===0) continue;                    // cardinals carry numerals
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
      w.innerHTML=face+'<div class="wc-name">'+c.label+'</div>';
      c.hour=w.querySelector('.wc-hour'); c.min=w.querySelector('.wc-min'); c.sec=w.querySelector('.wc-sec');
      c.fmt=new Intl.DateTimeFormat('en-US',{timeZone:c.tz,hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'});
      c.p={hour:0,minute:0,second:0}; bar.appendChild(w);
    });
    function partsOf(f,d){var o={};f.formatToParts(d).forEach(function(p){if(p.type!=='literal')o[p.type]=parseInt(p.value,10);});if(o.hour===24)o.hour=0;return o;}
    var last=-1;
    function refresh(now){last=Math.floor(now.getTime()/1000);cities.forEach(function(c){c.p=partsOf(c.fmt,now);});}
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
