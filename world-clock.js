/* ============================================================
   World clock strip for shazmoghaddam.github.io
   Six live analog clocks with:
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
      { label:'London',       tz:'Europe/London',                   lat:51.51, lon:-0.13 },
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
        s+='<line class="wc-tick" data-hour="'+i+'" x1="'+(50+o*Math.sin(a)).toFixed(2)+'" y1="'+(50-o*Math.cos(a)).toFixed(2)+
           '" x2="'+(50+n*Math.sin(a)).toFixed(2)+'" y2="'+(50-n*Math.cos(a)).toFixed(2)+'"/>';
      }
      return s;
    }
    function nums(){
      var r=35;
      return '<text class="wc-num" data-pos="12" x="50" y="'+(50-r)+'">12</text>'+
             '<text class="wc-num" data-pos="3" x="'+(50+r)+'" y="50">3</text>'+
             '<text class="wc-num" data-pos="6" x="50" y="'+(50+r)+'">6</text>'+
             '<text class="wc-num" data-pos="9" x="'+(50-r)+'" y="50">9</text>';
    }
    var face='<svg viewBox="0 0 100 100" class="wc-face" aria-hidden="true">'+
      '<path class="wc-ring" d=""/>'+ticks()+nums()+
      '<g class="wc-hour"><polygon points="48.2,50 51.8,50 50.75,30 49.25,30"/></g>'+
      '<g class="wc-min"><polygon points="48.8,50 51.2,50 50.5,19 49.5,19"/></g>'+
      '<g class="wc-sec"><line class="wc-sec-stalk" x1="50" y1="57" x2="50" y2="24"/>'+
        '<circle class="wc-sec-disc" cx="50" cy="21" r="3.3"/></g>'+
      '<circle class="wc-hub-o" cx="50" cy="50" r="2.4"/>'+
      '<circle class="wc-hub-i" cx="50" cy="50" r="1"/></svg>';

    cities.forEach(function(c){
      var w=document.createElement('div'); w.className='wc-clock'; w.setAttribute('role','img');
      w.title='Click to switch clock shape';
      w.innerHTML='<div class="wc-facewrap">'+face+'<div class="wc-digital" aria-hidden="true"></div></div>'+
                  '<div class="wc-name">'+SUN+MOON+'<span>'+c.label+'</span></div>';
      c.el=w; c.hour=w.querySelector('.wc-hour'); c.min=w.querySelector('.wc-min'); c.sec=w.querySelector('.wc-sec');
      c.dig=w.querySelector('.wc-digital');
      c.fmt=new Intl.DateTimeFormat('en-US',{timeZone:c.tz,hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'});
      c.p={hour:0,minute:0,second:0}; bar.appendChild(w);
    });

    /* ---- clock face shape: circle / square / triangle ----
       No separate UI toggle: clicking or tapping any clock cycles the whole
       strip through the shapes in turn, keeping the row visually consistent.
       Each shape is a radius-from-centre r(theta), sampled at SHAPE_N equal
       angles, so both share their point count and morph point-for-point into
       each other. square is the rounded rectangle (straight sides, 22-unit
       corner radius). The ring is a single <path>; the morph runs in JS so it
       behaves identically across browsers. The choice persists in localStorage.
       To add a shape, add one SHAPES entry. */
    var SHAPE_N=120, SHAPE_CX=50, SHAPE_CY=50, SHAPE_KEY='wc-shape';

    /* exact rounded square: half-width 47, corner radius 22 */
    function wcRoundRect(a){
      var c=Math.abs(Math.cos(a)), s=Math.abs(Math.sin(a)), hw=47, cr=22;
      if(c<1e-9 || s<1e-9) return hw;
      if(hw*s/c <= hw-cr) return hw/c;            // straight vertical side
      if(hw*c/s <= hw-cr) return hw/s;            // straight horizontal side
      var C=hw-cr, dC=(c+s)*C, disc=dC*dC-(2*C*C-cr*cr);   // corner arc
      return dC+Math.sqrt(disc<0?0:disc);
    }

    /* upward-pointing equilateral triangle, apex at 12 o'clock (circumradius 46).
       r(theta)=apothem/cos(theta - nearest edge normal); the three edge normals
       sit at 30/150/270, so fold the angle into one 120-degree sector and the
       cosine gives the straight edge. Apex/corners reach the circumradius. */
    function wcTriangle(a){
      var apo=46*0.5, seg=2*Math.PI/3;
      var off=a-Math.PI/6;                 // shift so an edge normal lands at 0
      var t=off-seg*Math.round(off/seg);   // fold into [-60deg, 60deg]
      return apo/Math.cos(t);
    }

    var SHAPES=[
      { name:'circle',   r:function(){ return 47; } },
      { name:'square',   r:function(a){ return wcRoundRect(a); } },
      { name:'triangle', r:function(a){ return wcTriangle(a); } }
    ];

    var wcAngles=[]; for(var ai=0; ai<SHAPE_N; ai++) wcAngles.push(2*Math.PI*ai/SHAPE_N);
    SHAPES.forEach(function(s){ s.rad=wcAngles.map(function(a){ return s.r(a); }); });

    function ringPath(rad){
      var d='';
      for(var i=0;i<SHAPE_N;i++){
        var a=wcAngles[i], x=SHAPE_CX+rad[i]*Math.cos(a), y=SHAPE_CY-rad[i]*Math.sin(a);
        d+=(i===0?'M':'L')+x.toFixed(2)+' '+y.toFixed(2);
      }
      return d+'Z';
    }
    var wcRings=Array.prototype.slice.call(bar.querySelectorAll('.wc-ring'));
    function drawRing(rad){ var d=ringPath(rad); wcRings.forEach(function(el){ el.setAttribute('d',d); }); }

    /* ---- numerals by shape ----
       Circle keeps mono Arabic (default). Square shows serif Roman numerals
       (.wc-num--roman). Triangle shows Farsi/Persian digits (.wc-num--farsi):
       twelve, three, six, nine as U+06Fx. Unknown shapes fall back to Arabic.
       Text and position both swap alongside the ring morph below. */
    var wcNums=Array.prototype.slice.call(bar.querySelectorAll('.wc-num'));
    var NUMERALS={
      circle:  { '12':'12',              '3':'3',       '6':'6',       '9':'9'       },
      square:  { '12':'XII',             '3':'III',     '6':'VI',      '9':'IX'      },
      triangle:{ '12':'\u06F1\u06F2',    '3':'\u06F3',  '6':'\u06F6',  '9':'\u06F9'  }
    };
    /* numeral placement per shape. Circle/square keep the wide cardinal spots
       (r=35). The triangle's slanted edges sit far closer to the centre at
       3/6/9 than a circle does, so those three are pulled inward to stay inside
       the edges; 12 keeps its spot just below the apex. */
    var NUM_POS_BASE={ '12':[50,15], '3':[85,50], '6':[50,85], '9':[15,50] };
    var NUM_POS={
      triangle:{ '12':[50,15], '3':[67,49], '6':[50,64], '9':[33,49] }
    };
    function applyNumerals(name){
      var set=NUMERALS[name]||NUMERALS.circle,
          pos=NUM_POS[name]||NUM_POS_BASE,
          roman=(name==='square'), farsi=(name==='triangle');
      wcNums.forEach(function(t){
        var k=t.getAttribute('data-pos'), p=pos[k]||NUM_POS_BASE[k];
        t.textContent=set[k];
        t.setAttribute('x',p[0]); t.setAttribute('y',p[1]);
        t.classList.toggle('wc-num--roman',roman);
        t.classList.toggle('wc-num--farsi',farsi);
      });
    }

    /* ---- hour ticks by shape ----
       The 8 non-cardinal marks sit at a fixed radius that suits the circle, but
       the triangle's edges run much closer to the centre between the corners, so
       the ticks are re-anchored to the active shape's boundary at each hour
       angle (a short radial dash just inside the edge). Circle/square land on
       the same spots as before. Swapped with the numerals during the morph. */
    var wcTicks=Array.prototype.slice.call(bar.querySelectorAll('.wc-tick'));
    function applyTicks(name){
      var shape=SHAPES.filter(function(s){return s.name===name;})[0]||SHAPES[0];
      wcTicks.forEach(function(ln){
        var i=+ln.getAttribute('data-hour'),
            a=i*30*Math.PI/180,              // clock angle, from 12 clockwise
            R=shape.r(Math.PI/2-a),          // boundary radius (r() takes math angle)
            o=R-1.5, n=R-5, sn=Math.sin(a), cs=Math.cos(a);
        ln.setAttribute('x1',(50+o*sn).toFixed(2)); ln.setAttribute('y1',(50-o*cs).toFixed(2));
        ln.setAttribute('x2',(50+n*sn).toFixed(2)); ln.setAttribute('y2',(50-n*cs).toFixed(2));
      });
    }

    function morphRing(from,to,done){
      if(reduce){ drawRing(to); if(done) done(); return; }
      var start=null, DUR=680;
      requestAnimationFrame(function step(ts){
        if(start===null) start=ts;
        var t=Math.min(1,(ts-start)/DUR),
            e=t<0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2,   // ease-in-out: gentle at both ends
            cur=new Array(SHAPE_N);
        for(var i=0;i<SHAPE_N;i++) cur[i]=from[i]+(to[i]-from[i])*e;
        drawRing(cur);
        if(t<1) requestAnimationFrame(step); else if(done) done();
      });
    }

    var shapeIdx=0, morphing=false;
    try{ var savedShape=localStorage.getItem(SHAPE_KEY),
             sIdx=SHAPES.map(function(s){return s.name;}).indexOf(savedShape);
         if(sIdx>=0) shapeIdx=sIdx; }catch(e){}
    drawRing(SHAPES[shapeIdx].rad);   // initial shape, no animation
    applyNumerals(SHAPES[shapeIdx].name);   // Arabic on circle, Roman on square, Farsi on triangle
    applyTicks(SHAPES[shapeIdx].name);      // anchor hour marks to the initial shape

    bar.addEventListener('click',function(){
      if(morphing) return;
      var from=SHAPES[shapeIdx].rad;
      shapeIdx=(shapeIdx+1)%SHAPES.length;
      var to=SHAPES[shapeIdx].rad, name=SHAPES[shapeIdx].name;
      morphing=true; morphRing(from,to,function(){ morphing=false; });
      if(reduce){                                   // no fade for reduced motion
        applyNumerals(name); applyTicks(name);
      } else {                                       // fade out, swap while dim, fade in
        bar.classList.add('nums-swapping');
        setTimeout(function(){ applyNumerals(name); applyTicks(name); bar.classList.remove('nums-swapping'); }, 300);
      }
      try{ localStorage.setItem(SHAPE_KEY,name); }catch(e){}
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
