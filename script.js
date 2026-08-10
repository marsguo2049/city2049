const systems = {
  drone: {
    index: '01', title: 'Drone Swarm', district: 'AIRSPACE / RESEARCH', status: 'LIVE PROJECT',
    desc: 'Coordinating many aerial agents as one urban system.',
    world: 'In City 2049, drone fleets support inspection, emergency response, logistics and large-scale public events. The challenge is not simply making a drone fly — it is coordinating many agents safely, efficiently and responsively in shared airspace.',
    or: 'The project explores formation and assignment decisions under spatial constraints. It distinguishes optimisation logic, heuristic coordination and simulation rather than treating every behaviour as an optimal solution.',
    tags: ['assignment', 'formation', 'coordination', 'constraints', 'simulation'],
    repo: 'https://github.com/marsguo2049/drone-swarm', demo: 'https://marsguo2049.github.io/drone-swarm/'
  },
  elevator: {
    index: '02', title: 'Elevator Dispatch', district: 'CITY CORE / BUILDINGS', status: 'LIVE PROJECT',
    desc: 'Turning vertical mobility into a real-time dispatch problem.',
    world: 'Super-tall mixed-use buildings make vertical mobility part of the transport network. Elevator groups continuously decide which car should answer which call while demand changes by floor, time and direction.',
    or: 'This is a dynamic dispatch setting with competing objectives such as waiting time, travel time and service efficiency. Heuristic policies can be compared through simulation without overstating them as exact optimisation.',
    tags: ['dispatch', 'dynamic demand', 'waiting time', 'heuristics', 'simulation'],
    repo: 'https://github.com/marsguo2049/elevator-dispatch', demo: 'https://marsguo2049.github.io/elevator-dispatch/'
  },
  soccer: {
    index: '03', title: 'Robot Soccer', district: 'ROBOTICS / RESEARCH', status: 'LIVE PROJECT',
    desc: 'A compact arena for multi-agent tactical coordination.',
    world: 'Robot sport becomes a visible testbed for autonomous teamwork: agents perceive a changing environment, occupy roles, switch tactics and coordinate under time pressure.',
    or: 'The current project is best understood as a tactical decision-and-simulation environment. It can compare role assignment and heuristic strategies while leaving room for richer optimisation models later.',
    tags: ['multi-agent', 'roles', 'tactics', 'coordination', 'simulation'],
    repo: 'https://github.com/marsguo2049/robot-soccer-team', demo: 'https://marsguo2049.github.io/robot-soccer-team/'
  },
  orbital: {
    index: '04', title: 'Orbital Network', district: 'ORBIT / INFRASTRUCTURE', status: 'LIVE PROJECT',
    desc: 'Designing the network layer above the city.',
    world: 'City infrastructure no longer stops at the skyline. Orbital relays extend communications, sensing and resilient connectivity beyond terrestrial networks.',
    or: 'The network-design view focuses on selecting and connecting infrastructure under coverage, connectivity and cost trade-offs. It is a natural bridge between facility location and network design.',
    tags: ['network design', 'coverage', 'location', 'connectivity', 'trade-offs'],
    repo: 'https://github.com/marsguo2049/orbital-network-design', demo: 'https://marsguo2049.github.io/orbital-network-design/'
  }
};

const grid = document.querySelector('#systemGrid');
Object.entries(systems).forEach(([key, s]) => {
  const card = document.createElement('article');
  card.className = 'system-card';
  card.dataset.system = key;
  card.tabIndex = 0;
  card.innerHTML = `<span class="card-index">SYSTEM ${s.index}</span><h3>${s.title}</h3><p>${s.desc}</p><div class="card-footer"><span>${s.district}</span><b>${s.status}</b></div>`;
  grid.appendChild(card);
});

const panel = document.querySelector('#systemPanel');
const title = document.querySelector('#panelTitle');
const kicker = document.querySelector('#panelKicker');
const desc = document.querySelector('#panelDesc');
const world = document.querySelector('#worldView');
const orView = document.querySelector('#orView');
const tagList = document.querySelector('#tagList');
const repoLink = document.querySelector('#repoLink');
const demoLink = document.querySelector('#demoLink');

function openSystem(key){
  const s = systems[key]; if(!s) return;
  kicker.textContent = `${s.district} / SYSTEM ${s.index}`;
  title.textContent = s.title; desc.textContent = s.desc; world.textContent = s.world; orView.textContent = s.or;
  tagList.innerHTML = s.tags.map(t => `<span>${t}</span>`).join('');
  repoLink.href = s.repo; demoLink.href = s.demo;
  panel.classList.add('open'); panel.setAttribute('aria-hidden','false');
}
function closePanel(){panel.classList.remove('open');panel.setAttribute('aria-hidden','true')}

document.addEventListener('click', e => {
  const node = e.target.closest('[data-system]');
  if(node?.dataset.system) openSystem(node.dataset.system);
});
document.addEventListener('keydown', e => {
  if((e.key==='Enter'||e.key===' ') && e.target?.dataset?.system){e.preventDefault();openSystem(e.target.dataset.system)}
  if(e.key==='Escape') closePanel();
});
document.querySelector('#closePanel').addEventListener('click', closePanel);

document.querySelectorAll('.view-switch button').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.view-switch button').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.panel-view').forEach(v=>v.classList.remove('active'));
  btn.classList.add('active'); document.querySelector(`[data-panel-view="${btn.dataset.view}"]`).classList.add('active');
}));

const cityShell = document.querySelector('.city-shell');
const hudButton = document.querySelector('#toggleHud');
hudButton.addEventListener('click',()=>{
  const off = cityShell.classList.toggle('hud-off');
  hudButton.textContent = `CITY LAYERS: ${off?'OFF':'ON'}`; hudButton.setAttribute('aria-pressed', String(!off));
});

const dialog = document.querySelector('#manifestoDialog');
document.querySelector('#openManifesto').addEventListener('click',()=>dialog.showModal());
document.querySelector('#closeManifesto').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog) dialog.close()});

// Load the V1.1 living-city layer after the stable V1 interactions are ready.
const enhancementScript = document.createElement('script');
enhancementScript.src = 'enhancements.js';
enhancementScript.defer = true;
document.body.appendChild(enhancementScript);
