# CITY 2049

**An interactive laboratory for the future.**

City 2049 is an evolving interactive world exploring how **operations research, AI, robotics and autonomous systems** may reshape everyday urban life.

The first setting is an original near-future city: recognisable urban infrastructure remains, but autonomous mobility, aerial systems, intelligent buildings, robotics and connected networks increasingly shape everyday life. The project is **not a prediction, digital twin, or claim that every behaviour is optimised**. It is a world-building layer that gives individual modelling and simulation projects a shared context.

> What happens when optimisation becomes the operating system of a city?

## Why this project exists

A future city is not one optimisation problem. It is a network of interacting decisions:

- Which vehicle, robot or elevator should serve which request?
- How should autonomous agents coordinate under shared constraints?
- Where should infrastructure be located and how should it be connected?
- How do systems respond to demand, congestion, disruption and uncertainty?

City 2049 connects these questions to small interactive projects. Each project can be viewed in two ways:

1. **World View** — what role might this system play in a near-future city?
2. **OR View** — what decisions, objectives, constraints, algorithms, heuristics or simulations sit behind it?

## Live systems

| City system | Project | Current framing |
| --- | --- | --- |
| Urban airspace | [Drone Swarm](https://github.com/marsguo2049/drone-swarm) | formation / assignment / coordination / simulation |
| Intelligent buildings | [Elevator Dispatch](https://github.com/marsguo2049/elevator-dispatch) | dynamic dispatch / heuristics / simulation |
| Robotics district | [Robot Soccer](https://github.com/marsguo2049/robot-soccer-team) | multi-agent tactical coordination / simulation |
| Orbital infrastructure | [Orbital Network Design](https://github.com/marsguo2049/orbital-network-design) | network design / location / connectivity trade-offs |

More systems can be added without forcing every project into the same mathematical method.

## Design principles

### 1. Near future, not distant sci-fi
The city should feel only a few decades away. Existing urban infrastructure remains visible; new autonomous systems are layered onto it.

### 2. Original world, familiar near future
The atmosphere is inspired in part by **Watch Dogs: Legion** and its portrayal of a recognisable city transformed by autonomous systems, surveillance, drones and algorithmic infrastructure. City 2049 is not a recreation of the game world: its visual design, districts, systems, scenarios and code are original, and no game assets are used.

### 3. Model honestly
The site should distinguish:

- exact or mathematical optimisation,
- heuristic / metaheuristic decision rules,
- simulation,
- visual or conceptual demonstrations.

A project should not be described as “optimised” unless its implementation supports that claim.

### 4. World-building should support the research
The future narrative is not decoration. It helps explain why the decision problem matters, who interacts with the system, and which constraints become important.

## V1

The first version is deliberately lightweight:

- full-screen interactive city map,
- five conceptual districts,
- animated autonomous routes and units,
- clickable project nodes,
- World View / OR View for each system,
- responsive layout,
- no build step required.

## Roadmap

### V1 — Explore
Interactive city, project nodes and future scenarios.

### V2 — Simulate
Introduce traffic flows, robot tasks, network demand and city events.

### V3 — Optimise
Allow users to change decisions, run methods and compare outcomes across scenarios.

Possible future systems include multimodal freight, autonomous fleets, charging and energy scheduling, emergency response, resilient transport and multi-robot coordination.

## Local preview

The site is static. Open `index.html` directly, or serve the folder with any local HTTP server.

For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

The repository is designed to work directly with GitHub Pages from the repository root or through a Pages GitHub Actions workflow.

## Status

**V1 — World-building prototype.** The project will evolve alongside the underlying OR / AI / robotics experiments.
