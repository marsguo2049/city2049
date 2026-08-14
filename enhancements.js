// City 2049 V1.2 enhancement layer. It augments the V1 DOM without replacing the base project.
(function installV11UI(){
  if(!document.querySelector('link[href="v2.css"]')){
    const css=document.createElement('link'); css.rel='stylesheet'; css.href='v2.css'; document.head.appendChild(css);
  }
  const shell=document.querySelector('.city-shell');
  if(shell && !document.querySelector('.scenario-console')){
    shell.insertAdjacentHTML('beforeend', `<div class="scenario-console" aria-label="City scenario controls">
      <div class="scenario-console__head"><span>SCENARIO LAYER</span><b id="scenarioLabel">NORMAL OPERATIONS</b></div>
      <div class="scenario-buttons" role="group" aria-label="Choose illustrative scenario">
        <button class="active" data-scenario="normal">NORMAL</button><button data-scenario="rush">RUSH HOUR</button><button data-scenario="storm">STORM</button><button data-scenario="emergency">EMERGENCY</button>
      </div><p>Illustrative world-building layer — not an optimisation result or calibrated simulation.</p></div>`);
  }
  const hero=document.querySelector('.hero');
  if(hero && !document.querySelector('.city-pulse')){
    hero.insertAdjacentHTML('beforeend', `<div class="city-pulse" aria-label="Illustrative city status">
      <article><span>AUTONOMOUS UNITS</span><strong id="unitCount">128</strong><small>illustrative activity</small></article>
      <article><span>NETWORK LOAD</span><strong id="networkLoad">42%</strong><small>scenario indicator</small></article>
      <article><span>MOBILITY STATE</span><strong id="mobilityState">FLOWING</strong><small>storytelling layer</small></article>
      <article><span>CITY EVENT</span><strong id="cityEvent">NONE</strong><small id="eventNote">routine operations</small></article></div>`);
  }
  const caption=document.querySelector('.map-caption b'); if(caption) caption.id='cityClock';
  const footer=document.querySelector('footer span:last-child'); if(footer) footer.textContent='V1.2 / PROJECT SYNC';
  const firstRoadmap=document.querySelector('.roadmap article:first-child');
  if(firstRoadmap) firstRoadmap.innerHTML='<b>V1.2</b><span>PROJECT SYNC</span><p>Interactive city, five live projects and illustrative scenario layers.</p>';
})();

const scenarioData = {
  normal: {label:'NORMAL OPERATIONS', units:128, load:'42%', mobility:'FLOWING', event:'NONE', note:'routine operations'},
  rush: {label:'EVENING PEAK', units:214, load:'78%', mobility:'PEAK LOAD', event:'COMMUTE', note:'demand concentrated at hubs'},
  storm: {label:'SEVERE WEATHER', units:73, load:'56%', mobility:'DEGRADED', event:'STORM', note:'air activity reduced'},
  emergency: {label:'INCIDENT RESPONSE', units:189, load:'91%', mobility:'PRIORITY', event:'ALERT', note:'priority routing active'}
};

const shell = document.querySelector('.city-shell');
const svg = document.querySelector('.city');
if (svg) {
  const ns = 'http://www.w3.org/2000/svg';
  const rain = document.createElementNS(ns, 'g');
  rain.setAttribute('class','storm-rain');
  for(let i=0;i<34;i++){
    const line=document.createElementNS(ns,'line');
    const x=(i*37)%1100, y=(i*83)%650;
    line.setAttribute('x1',x); line.setAttribute('y1',y);
    line.setAttribute('x2',x-10); line.setAttribute('y2',y+18);
    line.style.animationDelay=`-${(i%9)*.13}s`;
    rain.appendChild(line);
  }
  svg.appendChild(rain);
  const flare=document.createElementNS(ns,'g');
  flare.setAttribute('class','city-event-flare');
  for(let i=0;i<3;i++){
    const c=document.createElementNS(ns,'circle');
    c.setAttribute('cx','551'); c.setAttribute('cy','524'); c.setAttribute('r','8');
    c.style.animationDelay=`${i*.55}s`; flare.appendChild(c);
  }
  svg.appendChild(flare);
}

function applyScenario(key){
  const data=scenarioData[key] || scenarioData.normal;
  shell.dataset.scenario=key;
  document.querySelectorAll('[data-scenario]').forEach(b=>b.classList.toggle('active',b.dataset.scenario===key));
  document.querySelector('#scenarioLabel').textContent=data.label;
  document.querySelector('#unitCount').textContent=data.units;
  document.querySelector('#networkLoad').textContent=data.load;
  document.querySelector('#mobilityState').textContent=data.mobility;
  document.querySelector('#cityEvent').textContent=data.event;
  document.querySelector('#eventNote').textContent=data.note;
}

document.querySelectorAll('[data-scenario]').forEach(btn=>btn.addEventListener('click',()=>applyScenario(btn.dataset.scenario)));
applyScenario('normal');

const clock=document.querySelector('#cityClock');
const base=new Date('2049-08-10T09:22:00');
const started=Date.now();
function updateClock(){
  const d=new Date(base.getTime()+(Date.now()-started));
  const day=String(d.getUTCDate()).padStart(2,'0');
  const mon=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][d.getUTCMonth()];
  const hh=String(d.getUTCHours()).padStart(2,'0');
  const mm=String(d.getUTCMinutes()).padStart(2,'0');
  if(clock) clock.textContent=`${day} ${mon} 2049 / ${hh}:${mm}`;
}
updateClock(); setInterval(updateClock,15000);
