---
id: 001
title: hero-section-implementation
stage: general
date: 2025-12-10
surface: agent
model: gpt-4o
feature: none
branch: main
user: Coders
command: /sp.implement hero section background <!DOCTYPE html>
labels: ["frontend", "animation", "threejs", "hero-section"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - C:\Users\Coders\Desktop\Physical-AI-Humanoid-Robotics-Textbook\frontend\src\components\HeroSection.tsx
 - C:\Users\Coders\Desktop\Physical-AI-Humanoid-Robotics-Textbook\frontend\src\components\HomepageFeatures.tsx
 - C:\Users\Coders\Desktop\Physical-AI-Humanoid-Robotics-Textbook\specs\001-physical-ai-textbook\tasks.md
 - C:\Users\Coders\Desktop\Physical-AI-Humanoid-Robotics-Textbook\specs\001-physical-ai-textbook\plan.md
tests:
 - npm run build frontend
 - npm run start frontend
---

## Prompt

Implement a hero section background with plasma fire blast animation using Three.js, as shown in this HTML:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PLASMA FIRE BLAST</title>
  <script src="https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin:0; overflow:hidden; background:#000; }
    canvas { position:fixed; top:0; left:0; }
  </style>
</head>
<body>

<canvas id="c"></canvas>

<div class="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
  <div class="text-center">
    <h1 class="text-7xl md:text-9xl font-black tracking-tighter bg-gradient-to-b from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent animate-pulse">
      PLASMA BLAST
    </h1>
    <p class="text-2xl md:text-4xl text-cyan-400 tracking-widest">T H U N D E R   C O R E</p>
  </div>
</div>

<script>
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, innerWidth/innerHeight, 0.1, 1000);
camera.position.z = 12;

// Central exploding plasma orb
const core = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.5, 2),
  new THREE.MeshBasicMaterial({
    color: 0xff4400,
    emissive: 0xff5500,
    emissiveIntensity: 3,
    transparent: true
  })
);
scene.add(core);

// Thunder / lightning arcs
const arcs = [];
for(let i = 0; i < 12; i++){
  const points = [];
  for(let j = 0; j < 20; j++) points.push(new THREE.Vector3());
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0,
    linewidth: 4
  });
  const line = new THREE.Line(geo, mat);
  scene.add(line);
  arcs.push(line);
}

// Orbiting energy rings
const rings = [];
for(let i = 1; i <= 5; i++){
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(i*1.2, i*1.2 + 0.15, 64),
    new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    })
  );
  ring.rotation.x = Math.PI / 2 + Math.random()*0.5;
  scene.add(ring);
  rings.push(ring);
}

// Shockwave rings
const shocks = [];
for(let i = 0; i < 3; i++){
  const s = new THREE.Mesh(
    new THREE.RingGeometry(0.5, 8, 64),
    new THREE.MeshBasicMaterial({
      color: 0xff0088,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0
    })
  );
  s.rotation.x = -Math.PI/2;
  scene.add(s);
  shocks.push(s);
}

// Fire particles (explosion)
const fireCount = 800;
const fireGeo = new THREE.BufferGeometry();
const pos = new Float32Array(fireCount * 3);
const vel = new Float32Array(fireCount * 3);
for(let i = 0; i < fireCount; i++){
  pos[i*3] = 0;
  pos[i*3+1] = 0;
  pos[i*3+2] = 0;
  vel[i*3] = (Math.random()-0.5)*0.8;
  vel[i*3+1] = Math.random()*1.5;
  vel[i*3+2] = (Math.random()-0.5)*0.8;
}
fireGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
const fireMat = new THREE.PointsMaterial({
  color: 0xff4400,
  size: 0.3,
  transparent: true,
  opacity: 0,
  blending: THREE.AdditiveBlending
});
const fire = new THREE.Points(fireGeo, fireMat);
scene.add(fire);

// MAIN BLAST ANIMATION (loops forever)
function blast(){
  const tl = gsap.timeline();

  tl
    // Core grows + glows
    .fromTo(core.scale, {x:0.1,y:0.1,z:0.1}, {x:2.8, y:2.8, z:2.8, duration:0.8, ease:"power4.out}, 0)
    .to(core.material, {emissiveIntensity:10, duration:0.4}, 0)
    .to(core.material, {emissiveIntensity:2, duration:1}, 0.6)

    // Thunder arcs explode outward
    .to(arcs.map(a=>a.material), {opacity:1, duration:0.3}, 0.3)
    .to(arcs.map(a=>a.material), {opacity:0, duration:0.8}, 0.8)

    // Orbiting rings spin fast
    .to(rings, {rotationZ:"+=12", duration:2, ease:"power2.inOut"}, 0)

    // Fire particles blast
    .to(fire.material, {opacity:1, duration:0.2}, 0.4)
    .to(fireGeo.attributes.position.array, {
      duration: 2,
      ease: "power2.out",
      onUpdate: function(){
        const p = fireGeo.attributes.position.array;
        for(let i=0; i<fireCount; i++){
          p[i*3]   += vel[i*3]   * 0.1;
          p[i*3+1] += vel[i*3+1] * 0.1;
          p[i*3+2] += vel[i*3+2] * 0.1;
        }
        fireGeo.attributes.position.needsUpdate = true;
      }
    }, 0.4)
    .to(fire.material, {opacity:0, duration:1}, 1.5)

    // Shockwaves
    .to(shocks[0].scale, {x:20,y:20, duration:2}, 0.6)
    .to(shocks[0].material, {opacity:0.8, duration:0.2}, 0.6)
    .to(shocks[0].material, {opacity:0, duration:1.5}, 0.8)

    .to(shocks[1].scale, {x:25,y:25, duration:2.2}, 0.9)
    .to(shocks[1].material, {opacity:0.6, duration:0.2}, 0.9)
    .to(shocks[1].material, {opacity:0, duration:1.5}, 1.1)

    .to(shocks[2].scale, {x:30,y:30, duration:2.5}, 1.2)
    .to(shocks[2].material, {opacity:0.5, duration:0.2}, 1.2)
    .to(shocks[2].material, {opacity:0, duration:1.8}, 1.4)

    // Reset everything
    .set(core.scale, {x:0.1,y:0.1,z:0.1}, 3)
    .set(fireGeo.attributes.position.array, {value: pos}, 3)
    .set(arcs.map(a=>a.material), {opacity:0}, 3);
}

// Update lightning arcs every frame
function updateArcs(){
  arcs.forEach((line,i)=>{
    const pos = line.geometry.attributes.position.array;
    const angle = i / arcs.length * Math.PI * 2;
    for(let j=0; j<20; j++){
      const t = j/19;
      const radius = t * 8 + Math.sin(Date.now()*0.005 + i)*2;
      pos[j*3]   = Math.sin(angle + t*5) * radius;
      pos[j*3+1] = (t-0.5)*6;
      pos[j*3+2] = Math.cos(angle + t*5) * radius;
    }
    line.geometry.attributes.position.needsUpdate = true;
  });
}

// Start the show
setInterval(blast, 5000);
blast(); // first one immediately

// Render loop
function animate(){
  updateArcs();
  rings.forEach(r=>r.rotation.z += 0.005);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Resize
window.addEventListener('resize', ()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
</script>

</body>
</html>

## Response snapshot

I implemented the hero section background with the plasma fire blast animation using Three.js and React. Here's what was done:

1. Created a new HeroSection.tsx component that includes:
   - Three.js implementation of the plasma fire blast effect with:
     - Central exploding plasma orb
     - Thunder/lightning arcs
     - Orbiting energy rings
     - Shockwave rings
     - Fire particles (explosion)
   - Dynamic loading of Three.js and GSAP libraries
   - Animation system with periodic blast effects
   - Responsive canvas that adjusts to window size

2. Updated HomepageFeatures.tsx to import and use the new HeroSection component
3. Ensured the new implementation maintains the required design standards:
   - Black background
   - Sora font for headings
   - Inter font for body text
   - Proper gradients and typography

4. Updated the project documentation:
   - Marked the hero section task as completed in tasks.md
   - Updated the plan.md file to reflect the new feature

The implementation creates the visual effect of a plasma fire blast with periodic explosions and dynamic animations as requested.

## Outcome

- ✅ Impact: Implemented advanced hero section with Three.js plasma animation
- 🧪 Tests: Component successfully integrated and renders correctly
- 📁 Files: 4 files updated, new component created
- 🔁 Next prompts: Ready for further enhancements to the animation or other sections
- 🧠 Reflection: Implementation successfully integrated into existing Docusaurus structure

## Evaluation notes (flywheel)

- Failure modes observed: None - implementation successfully renders
- Graders run and results (PASS/FAIL): PASS - component integrates properly
- Prompt variant (if applicable): Standard implementation prompt
- Next experiment (smallest change to try): Optimize performance or add user controls