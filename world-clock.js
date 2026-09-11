/* ============================================================
   World clock strip for shazmoghaddam.github.io
   Five live analog clocks with:
     - Mondaine-style second hand (stalk + tip disc + counterweight)
     - tapered hour/minute hands and a two-tone centre hub
     - a one-time staggered wind-up on load (skipped for reduced motion)
     - real sunrise/sunset day-night icons (NOAA solar position)
     - per-clock screen-reader labels (role="img" + aria-label)
     - animation paused when the strip is off-screen
     - hover reveals the exact digital time
   Colours come from the site's theme tokens via CSS.
   ============================================================ */
(function () {
  function init() {
    var bar = document.getElementById('world-clock');
    if (!bar || bar.dataset.built) return;
    bar.dataset.built = '1';

    var cities = [
      { label:'New York',     tz:'America/New_York',                lat:40.71, lon:-74.01 },
      { label:'Buenos Aires', tz:'America/Argentina/Buenos_Aires',  lat:-34.60, lon:-58.38 },
      { label:'Berlin',       tz:'Europe/Berlin',                   lat:52.52, lon:13.40 },
      { label:'Tehran',       tz:'Asia/Tehran',                     lat:35.69, lon:51.39 },
      { label:'Tokyo',        tz:'Asia/Tokyo',                      lat:35.69, lon:139.69 }
    ];

    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- sun / moon icons ---- */
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
    var face='<svg viewBox="0 0 100 100" class="wc-face" aria-hidden="true">'+
      '<circle class="wc-ring" cx="50" cy="50" r="47"/>'+ticks()+nums()+
      '<g class="wc-hour"><polygon points="48.2,50 51.8,50 50.75,30 49.25,30"/></g>'+
      '<g class="wc-min"><polygon points="48.8,50 51.2,50 50.5,19 49.5,19"/></g>'+
      '<g class="wc-sec"><line class="wc-sec-stalk" x1="50" y1="57" x2="50" y2="24"/>'+
        '<circle class="wc-sec-disc" cx="50" cy="21" r="3.3"/></g>'+
      '<circle class="wc-hub-o" cx="50" cy="50" r="2.4"/>'+
      '<circle class="wc-hub-i" cx="50" cy="50" r="1"/></svg>';

    cities.forEach(function(c){
      var w=document.createElement('div'); w.className='wc-clock'; w.setAttribute('role','img');
      w.innerHTML='<div class="wc-facewrap">'+face+'<div class="wc-digital" aria-hidden="true"></div></div>'+
                  '<div class="wc-name">'+SUN+MOON+'<span>'+c.label+'</span></div>';
      c.el=w; c.hour=w.querySelector('.wc-hour'); c.min=w.querySelector('.wc-min'); c.sec=w.querySelector('.wc-sec');
      c.dig=w.querySelector('.wc-digital');
      c.fmt=new Intl.DateTimeFormat('en-US',{timeZone:c.tz,hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'});
      c.p={hour:0,minute:0,second:0}; bar.appendChild(w);
    });

    function partsOf(f,d){var o={};f.formatToParts(d).forEach(function(p){if(p.type!=='literal')o[p.type]=parseInt(p.value,10);});if(o.hour===24)o.hour=0;return o;}
    function pad(n){return n<10?'0'+n:''+n;}
    function to12(h,m){var ap=h>=12?'PM':'AM',hh=h%12;if(hh===0)hh=12;return hh+':'+pad(m)+' '+ap;}

    /* NOAA solar elevation -> is the sun above the horizon right now? */
    function isDaytime(lat,lon,date){
      var rad=Math.PI/180;
      var doy=Math.floor((date-Date.UTC(date.getUTCFullYear(),0,0))/86400000);
      var hUTC=date.getUTCHours()+date.getUTCMinutes()/60+date.getUTCSeconds()/3600;
      var g=2*Math.PI/365*(doy-1+(hUTC-12)/24);
      var eqt=229.18*(0.000075+0.001868*Math.cos(g)-0.032077*Math.sin(g)-0.014615*Math.cos(2*g)-0.040849*Math.sin(2*g));
      var decl=0.006918-0.399912*Math.cos(g)+0.070257*Math.sin(g)-0.006758*Math.cos(2*g)+0.000907*Math.sin(2*g)-0.002697*Math.cos(3*g)+0.00148*Math.sin(3*g);
      var tst=hUTC*60+eqt+4*lon;
      var ha=(tst/4)-180;
      var cosz=Math.sin(lat*rad)*Math.sin(decl)+Math.cos(lat*rad)*Math.cos(decl)*Math.cos(ha*rad);
      var elev=90-Math.acos(Math.max(-1,Math.min(1,cosz)))/rad;
      return elev> -0.833;   // above horizon incl. atmospheric refraction
    }

    var last=-1;
    function refresh(now){
      last=Math.floor(now.getTime()/1000);
      cities.forEach(function(c){
        c.p=partsOf(c.fmt,now);
        var day=isDaytime(c.lat,c.lon,now);
        c.el.classList.toggle('is-night',!day);
        c.dig.textContent=pad(c.p.hour)+':'+pad(c.p.minute);
        c.el.setAttribute('aria-label', c.label+', '+to12(c.p.hour,c.p.minute)+', '+(day?'daytime':'night'));
      });
    }

    /* wind-up intro: hands sweep into place once, staggered */
    var introStart=Date.now(), STAGGER=100, DUR=900, introDone=false;
    function introF(now,i){ if(reduce) return 1; var t=now-introStart-i*STAGGER; if(t<=0)return 0; if(t>=DUR)return 1; var x=t/DUR; return 1-Math.pow(1-x,3); }

    function render(now){
      var frac=now.getMilliseconds()/1000, tnow=now.getTime();
      cities.forEach(function(c,i){
        var s=c.p.second+frac, m=c.p.minute+s/60, h=(c.p.hour%12)+m/60;
        var aH=h*30, aM=m*6, aS=s*6;
        if(!introDone){
          var f=introF(tnow,i);
          aH*=f; aM*=f; aS=aS-360*(1-f);   // seconds do one full settling turn
        }
        c.hour.setAttribute('transform','rotate('+aH+' 50 50)');
        c.min.setAttribute('transform','rotate('+aM+' 50 50)');
        c.sec.setAttribute('transform','rotate('+aS+' 50 50)');
      });
      if(!introDone && tnow-introStart > STAGGER*(cities.length-1)+DUR) introDone=true;
    }

    refresh(new Date());

    if(reduce){
      var visR=true;
      if('IntersectionObserver' in window) new IntersectionObserver(function(e){visR=e[0].isIntersecting;}).observe(bar);
      render(new Date());
      setInterval(function(){ if(!visR) return; var n=new Date(); refresh(n); render(n); },1000);
      return;
    }

    /* rAF loop, paused when the strip is off-screen */
    var visible=true, rafId=null;
    function loop(){ var n=new Date(); if(Math.floor(n.getTime()/1000)!==last) refresh(n); render(n);
      rafId = visible ? requestAnimationFrame(loop) : null; }
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(e){
        var vis=e[0].isIntersecting;
        if(vis){ visible=true; if(!rafId) loop(); } else { visible=false; }
      },{threshold:0}).observe(bar);
    }
    loop();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
