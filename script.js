const systems = {
  drone: {
    index: '01', title: 'Drone Swarm', district: 'AIRSPACE / RESEARCH', status: 'LIVE PROJECT',
    desc: 'Assigning a fleet to one frame of a light formation.',
    world: 'In City 2049, aerial fleets support public events, inspection and emergency response. The current experiment isolates one foundational decision from that larger system: which drone should occupy each target point in a single display frame?',
    or: 'A static one-to-one assignment compares a sequential baseline, nearest-target greedy construction and pairwise-swap local improvement. The 2D and 3D motion is idealised explanation, not collision-safe trajectory planning or flight control.',
    tags: ['one-to-one assignment', 'greedy heuristic', 'pairwise swap', 'formation', 'idealised animation'],
    repo: 'https://github.com/marsguo2049/drone-swarm', demo: 'https://marsguo2049.github.io/drone-swarm/'
  },
  elevator: {
    index: '02', title: 'Elevator Dispatch', district: 'CITY CORE / BUILDINGS', status: 'LIVE PROJECT',
    desc: 'Turning vertical mobility into a real-time dispatch problem.',
    world: 'Super-tall mixed-use buildings make vertical mobility part of the transport network. Elevator groups continuously decide which car should answer which call while demand changes by floor, time and direction.',
    or: 'A stochastic discrete-time simulation compares two rule-based group-dispatch heuristics under the same seeded passenger arrivals. Capacity is enforced and the page reports waiting, journey time, travel and stops; it is not an exact optimiser or engineering controller.',
    tags: ['online dispatch', 'Poisson arrivals', 'capacity', 'rule-based heuristics', 'discrete-time simulation'],
    repo: 'https://github.com/marsguo2049/elevator', demo: 'https://marsguo2049.github.io/elevator-dispatch/'
  },
  soccer: {
    index: '03', title: 'Robot Soccer', district: 'ROBOTICS / RESEARCH', status: 'LIVE PROJECT',
    desc: 'Searching roles and one attacking route in a compact arena.',
    world: 'Robot sport becomes a visible testbed for autonomous teamwork: agents perceive a changing environment, occupy roles, switch tactics and coordinate under time pressure.',
    or: 'Within a deliberately small candidate set, branch-and-bound finds the minimum-cost robot-to-position assignment and enumeration selects a limited pass-and-shot route. A greedy baseline and Monte Carlo outcome simulation provide comparison; this is not a full robot football controller.',
    tags: ['exact bounded search', 'role assignment', 'route enumeration', 'greedy baseline', 'Monte Carlo'],
    repo: 'https://github.com/marsguo2049/robot-soccer-team', demo: 'https://marsguo2049.github.io/robot-soccer-team/'
  },
  orbital: {
    index: '04', title: 'Orbital Computing', district: 'ORBIT / INFRASTRUCTURE', status: 'LIVE PROJECT',
    desc: 'Allocating city workloads across an orbital computing layer.',
    world: 'City infrastructure no longer stops at the skyline. Orbital platforms can extend communications, sensing and computing capacity beyond terrestrial networks, especially when demand and resilience needs shift geographically.',
    or: 'A static planning snapshot assigns tasks to satellites under simplified capacity and sunlight-adjusted compute budgets. BFS supplies fixed-topology routes; a least-hop baseline is compared with greedy construction plus insert-and-relocate local search. It is task allocation, not infrastructure design.',
    tags: ['task allocation', 'capacity', 'BFS routing', 'greedy heuristic', 'local search'],
    repo: 'https://github.com/marsguo2049/orbital-network-design', demo: 'https://marsguo2049.github.io/orbital-network-design/'
  },
  kitchen: {
    index: '05', title: 'Robo Kitchen', district: 'RESIDENTIAL / SERVICES', status: 'LIVE PROJECT',
    desc: 'Scheduling two service robots through a shared kitchen.',
    world: 'In City 2049, homes, hotels, hospitals and neighbourhood services may use compact robot teams to prepare meals. Their value depends on coordinating shared workstations and deadlines, not simply automating one appliance.',
    or: 'An online discrete-time simulation models two robots, precedence-constrained ingredient jobs, shared boards and stoves, deadlines and four-direction movement. BFS routing supports three transparent scheduling heuristics whose priorities change with the selected objective; it is a teaching model, not real kitchen control.',
    tags: ['online scheduling', 'precedence', 'shared resources', 'BFS routing', 'multi-robot simulation'],
    repo: 'https://github.com/marsguo2049/kitchen', demo: 'https://marsguo2049.github.io/kitchen/'
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

// Load the V1.2 living-city layer after the stable base interactions are ready.
const enhancementScript = document.createElement('script');
enhancementScript.src = 'enhancements.js';
enhancementScript.defer = true;
document.body.appendChild(enhancementScript);
