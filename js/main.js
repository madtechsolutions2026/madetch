/* ============================================================
   MAD TECH SOLUTIONS — v2
   Three.js particle morph (chaos → sphere → torus knot) with
   cursor repulsion + twinkle. Smooth scroll with velocity skew,
   per-letter hero reveal, magnetic buttons, counters.
   No frameworks, no build step.
   ============================================================ */
history.scrollRestoration = "manual";
scrollTo(0, 0);

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;
const isMobile = matchMedia("(max-width: 768px)").matches;

/* ------------------------------------------------------------
   Smooth (virtual) scroll — desktop only. On touch / reduced
   motion we fall back to native scrolling; `scrollCur` is the
   single source of truth either way.
   ------------------------------------------------------------ */
const scrollWrap = document.getElementById("scroll");
const useVirtual = finePointer && !reduceMotion && !isMobile;
let scrollTarget = 0;
let scrollCur = 0;
let maxScroll = 1;

function measure() {
  if (useVirtual) {
    document.body.style.height = scrollWrap.scrollHeight + "px";
  }
  maxScroll = Math.max(1, document.body.scrollHeight - innerHeight);
}

if (useVirtual) {
  document.body.classList.add("virtual-scroll");
  addEventListener("resize", measure);
  // fonts/layout settle
  setTimeout(measure, 100);
  setTimeout(measure, 800);
} else {
  measure();
  addEventListener("resize", measure);
}

// Anchor links scroll the window (body keeps the real height)
document.querySelectorAll("[data-scroll]").forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || !id.startsWith("#")) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    const y = el.getBoundingClientRect().top + scrollCur;
    if (useVirtual) {
      scrollTo(0, y);
    } else {
      scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
    }
  });
});

/* ------------------------------------------------------------
   Cursor
   ------------------------------------------------------------ */
const cursor = document.querySelector(".cursor");
const cursorLabel = document.querySelector(".cursor-label");
const mouse = { x: innerWidth / 2, y: innerHeight / 2 }; // raw
const eased = { x: mouse.x, y: mouse.y };
let mouseActive = 0; // ramps up once the mouse actually moves

addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouseActive = 1;
});

if (finePointer) {
  document.querySelectorAll("[data-cursor]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("is-hover");
      cursorLabel.textContent = el.dataset.cursor;
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-hover");
    });
  });
} else {
  // Mobile tactile swipe/touch indicator feedback
  addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const ripple = document.createElement("div");
    ripple.className = "touch-ripple";
    ripple.style.left = `${touch.clientX}px`;
    ripple.style.top = `${touch.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }, { passive: true });
}

/* ------------------------------------------------------------
   Magnetic buttons — pull gently toward the cursor
   ------------------------------------------------------------ */
const magnets = finePointer && !reduceMotion
  ? [...document.querySelectorAll(".btn, .nav-cta")]
  : [];

function updateMagnets() {
  for (const el of magnets) {
    const r = el.getBoundingClientRect();
    const dx = eased.x - (r.left + r.width / 2);
    const dy = eased.y - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist < 110) {
      const pull = 1 - dist / 110;
      el.style.transform = `translate(${dx * 0.3 * pull}px, ${dy * 0.3 * pull}px)`;
    } else if (el.style.transform) {
      el.style.transform = "";
    }
  }
}

/* ------------------------------------------------------------
   Hero title → per-letter reveal (keeps the blue "." accent)
   ------------------------------------------------------------ */
document.querySelectorAll(".hero-title .word").forEach((word) => {
  const out = [];
  word.childNodes.forEach((node) => {
    const accent = node.nodeType !== 3;
    for (const c of node.textContent) {
      out.push(`<span class="char${accent ? " accent" : ""}">${c === " " ? "&nbsp;" : c}</span>`);
    }
  });
  word.innerHTML = out.join("");
});
document.querySelectorAll(".hero-title .line").forEach((line, li) => {
  line.querySelectorAll(".char").forEach((ch, ci) => {
    ch.style.transitionDelay = `${0.05 + li * 0.13 + ci * 0.03}s`;
  });
});

/* ------------------------------------------------------------
   Split big statements into animatable words.
   Words wrapped in _underscores_ get the italic-serif accent.
   ------------------------------------------------------------ */
document.querySelectorAll("[data-split]").forEach((el) => {
  const words = el.textContent.trim().split(/\s+/);
  let serifOn = false;
  el.innerHTML = words
    .map((raw) => {
      let w = raw;
      let isSerif = serifOn;
      if (w.startsWith("_")) { isSerif = true; serifOn = true; w = w.slice(1); }
      if (w.endsWith("_")) { w = w.slice(0, -1); serifOn = false; }
      return `<span class="w${isSerif ? " serif" : ""}"><span>${w}</span></span>`;
    })
    .join(" ");
});

/* ------------------------------------------------------------
   Reveals + counters
   ------------------------------------------------------------ */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("in");
      el.querySelectorAll("[data-counter]").forEach(runCounter);
      if (el.hasAttribute("data-counter")) runCounter(el);
      io.unobserve(el);
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll(".reveal, [data-split]").forEach((el) => io.observe(el));

// stagger word reveals inside split statements
document.querySelectorAll("[data-split]").forEach((el) => {
  el.querySelectorAll(".w > span").forEach((s, i) => {
    s.style.transitionDelay = `${i * 0.045}s`;
  });
});

// cascade the work rows
document.querySelectorAll(".work-item").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 6) * 0.07}s`;
});

function runCounter(el) {
  if (el.dataset.done) return;
  el.dataset.done = "1";
  const end = +el.dataset.counter;
  const t0 = performance.now();
  const dur = 1400;
  (function tick(t) {
    const p = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

/* ------------------------------------------------------------
   THREE — particles morph chaos → sphere → torus knot on scroll,
   twinkle constantly, and flee from the cursor.
   ------------------------------------------------------------ */
const canvas = document.getElementById("gl");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false,
  alpha: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a0a0b, 0.09);

const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 60);
camera.position.set(0, 0, 6);

const COUNT = isMobile ? 3200 : 7000;
const WAVE_COUNT = isMobile ? 1600 : 4200;

function buildCloud() {
  const geo = new THREE.BufferGeometry();
  const chaos = new Float32Array(COUNT * 3);
  const order = new Float32Array(COUNT * 3); // fibonacci sphere
  const alt = new Float32Array(COUNT * 3);   // torus knot
  const seeds = new Float32Array(COUNT);
  const R = 1.75;
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < COUNT; i++) {
    // chaotic state: scattered cloud ("mad ideas")
    chaos[i * 3] = (Math.random() - 0.5) * 11;
    chaos[i * 3 + 1] = (Math.random() - 0.5) * 7;
    chaos[i * 3 + 2] = (Math.random() - 0.5) * 8;

    // ordered state: fibonacci sphere (perfectly even = "engineered")
    const y = 1 - (i / (COUNT - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    order[i * 3] = Math.cos(th) * rad * R;
    order[i * 3 + 1] = y * R;
    order[i * 3 + 2] = Math.sin(th) * rad * R;

    // alt state: (2,3) torus knot with a scattered tube ("infinite loop of ideas")
    const t = (i / COUNT) * Math.PI * 2 + Math.random() * 0.02;
    const kR = 1.25, kr = 0.45, tube = 0.16;
    const w = kR + kr * Math.cos(3 * t);
    alt[i * 3] = w * Math.cos(2 * t) + (Math.random() - 0.5) * tube;
    alt[i * 3 + 1] = w * Math.sin(2 * t) + (Math.random() - 0.5) * tube;
    alt[i * 3 + 2] = kr * Math.sin(3 * t) * 1.6 + (Math.random() - 0.5) * tube;

    seeds[i] = Math.random();
  }

  geo.setAttribute("position", new THREE.BufferAttribute(chaos, 3));
  geo.setAttribute("aOrder", new THREE.BufferAttribute(order, 3));
  geo.setAttribute("aAlt", new THREE.BufferAttribute(alt, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uMorph: { value: 0 },   // chaos → sphere
      uAlt: { value: 0 },     // sphere → torus knot
      uMouse: { value: new THREE.Vector3(99, 99, 99) },
      uMouseF: { value: 0 },
      uPixelRatio: { value: Math.min(devicePixelRatio, 2) },
    },
    vertexShader: /* glsl */ `
      attribute vec3 aOrder;
      attribute vec3 aAlt;
      attribute float aSeed;
      uniform float uTime;
      uniform float uMorph;
      uniform float uAlt;
      uniform vec3 uMouse;
      uniform float uMouseF;
      uniform float uPixelRatio;
      varying float vGlow;
      varying float vTw;

      void main() {
        // each particle snaps into place at a slightly different moment
        float m  = smoothstep(aSeed * 0.35, aSeed * 0.35 + 0.65, uMorph);
        float m2 = smoothstep(aSeed * 0.30, aSeed * 0.30 + 0.70, uAlt);
        vec3 p = mix(mix(position, aOrder, m), aAlt, m2);

        // gentle organic breathing so it never sits still
        float formed = max(m, m2);
        float t = uTime * 0.4;
        float amp = mix(0.35, 0.05, formed);
        p.x += sin(t + aSeed * 17.0) * amp;
        p.y += cos(t * 1.3 + aSeed * 29.0) * amp;
        p.z += sin(t * 0.8 + aSeed * 41.0) * amp * 0.9;

        // cursor repulsion — particles flee and spring back
        vec3 dm = p - uMouse;
        float dist = length(dm);
        float force = smoothstep(1.15, 0.0, dist);
        p += (dm / max(dist, 0.001)) * force * 0.6 * uMouseF;

        // twinkle: every particle pulses on its own rhythm
        float tw = 0.75 + 0.45 * sin(uTime * (1.2 + aSeed * 2.2) + aSeed * 40.0);

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (1.5 + aSeed * 2.4) * tw * uPixelRatio * (5.2 / -mv.z);
        vGlow = formed + force * 0.8; // repelled particles flash brighter
        vTw = tw;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vGlow;
      varying float vTw;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.05, d);
        // chaos = dim gray, formed = white with a whisper of ice blue
        vec3 col = mix(vec3(0.48, 0.48, 0.50), vec3(0.82, 0.88, 1.0), clamp(vGlow, 0.0, 1.0));
        gl_FragColor = vec4(col, a * 0.8 * (0.7 + 0.3 * vTw));
      }
    `,
  });

  return new THREE.Points(geo, mat);
}

/* --- low horizon wave field --- */
function buildWave() {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(WAVE_COUNT * 3);
  const seeds = new Float32Array(WAVE_COUNT);
  const cols = Math.ceil(Math.sqrt(WAVE_COUNT * 2.2));
  const rows = Math.ceil(WAVE_COUNT / cols);
  let i = 0;
  for (let r = 0; r < rows && i < WAVE_COUNT; r++) {
    for (let c = 0; c < cols && i < WAVE_COUNT; c++, i++) {
      pos[i * 3] = (c / (cols - 1) - 0.5) * 26;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = (r / (rows - 1) - 0.5) * 14;
      seeds[i] = Math.random();
    }
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(devicePixelRatio, 2) },
    },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uTime;
      uniform float uPixelRatio;
      varying float vH;
      void main() {
        vec3 p = position;
        float t = uTime * 0.5;
        p.y = sin(p.x * 0.55 + t) * 0.35
            + cos(p.z * 0.8 + t * 1.4) * 0.3
            + sin((p.x + p.z) * 0.3 + t * 0.7) * 0.25;
        vH = p.y;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (1.0 + aSeed * 1.6) * uPixelRatio * (4.5 / -mv.z);
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vH;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.1, d);
        vec3 col = mix(vec3(0.07, 0.08, 0.10), vec3(0.45, 0.55, 0.75), vH * 1.2 + 0.5);
        gl_FragColor = vec4(col, a * 0.45);
      }
    `,
  });

  const pts = new THREE.Points(geo, mat);
  pts.position.y = -3.1;
  return pts;
}

const cloud = buildCloud();
const wave = buildWave();
const group = new THREE.Group();
group.add(cloud);
scene.add(group, wave);

// hero: cloud sits right of the headline on desktop
group.position.x = isMobile ? 0 : 1.6;

// cursor → world-space point on the cloud's plane, for repulsion
const raycaster = new THREE.Raycaster();
const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const mouseNDC = new THREE.Vector2();
const mouseWorld = new THREE.Vector3(99, 99, 99);

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

/* ------------------------------------------------------------
   Render loop
   ------------------------------------------------------------ */
const clock = new THREE.Clock();
let running = true;
document.addEventListener("visibilitychange", () => {
  running = !document.hidden;
  if (running) { clock.getDelta(); loop(); }
});

const smoothstep = (x, a, b) => THREE.MathUtils.smoothstep(x, a, b);

function loop() {
  if (!running) return;
  requestAnimationFrame(loop);

  const t = clock.getElapsedTime();

  // scroll easing + velocity
  scrollTarget = scrollY;
  const vel = scrollTarget - scrollCur;
  scrollCur += vel * (useVirtual ? 0.085 : 1);
  if (Math.abs(scrollTarget - scrollCur) < 0.05) scrollCur = scrollTarget;
  if (useVirtual) {
    // subtle shear with scroll speed — the page leans into the motion
    const skew = THREE.MathUtils.clamp(vel * 0.0035, -1.3, 1.3);
    scrollWrap.style.transform =
      `translate3d(0, ${-scrollCur.toFixed(2)}px, 0) skewY(${skew.toFixed(3)}deg)`;
  }
  const p = Math.min(1, scrollCur / maxScroll); // 0..1 through the page

  // cursor easing
  eased.x += (mouse.x - eased.x) * 0.16;
  eased.y += (mouse.y - eased.y) * 0.16;
  if (finePointer) {
    cursor.style.transform = `translate(${eased.x}px, ${eased.y}px) translate(-50%,-50%)`;
  }
  updateMagnets();

  // story: chaos (hero) → sphere (manifesto/work) → torus knot (capabilities+)
  const morph = smoothstep(p, 0.02, 0.33);
  const alt = smoothstep(p, 0.44, 0.72);
  cloud.material.uniforms.uMorph.value = morph;
  cloud.material.uniforms.uAlt.value = alt;
  cloud.material.uniforms.uTime.value = t;
  wave.material.uniforms.uTime.value = t;

  // drift + mouse parallax; the knot spins faster and swells near the end
  group.rotation.y = t * (0.05 + alt * 0.12) + (eased.x / innerWidth - 0.5) * 0.35;
  group.rotation.x = (eased.y / innerHeight - 0.5) * 0.25 + alt * 0.5;
  group.position.x = (isMobile ? 0 : 1.6) * (1 - smoothstep(p, 0.05, 0.4));
  group.position.y = Math.sin(t * 0.3) * 0.08;

  // Dynamic responsive scaling for 3D shapes on mobile/portrait aspect ratios
  const aspect = innerWidth / innerHeight;
  const baseScale = aspect < 0.85 ? aspect * 1.15 : 1;
  group.scale.setScalar(baseScale * (1 + smoothstep(p, 0.85, 1) * 0.35));
  camera.position.z = 6 - p * 1.2;

  // project the cursor into the cloud's local space for repulsion
  if (finePointer && mouseActive) {
    mouseNDC.set((eased.x / innerWidth) * 2 - 1, -(eased.y / innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouseNDC, camera);
    if (raycaster.ray.intersectPlane(mousePlane, mouseWorld)) {
      group.updateMatrixWorld();
      cloud.material.uniforms.uMouse.value.copy(group.worldToLocal(mouseWorld.clone()));
      cloud.material.uniforms.uMouseF.value +=
        (1 - cloud.material.uniforms.uMouseF.value) * 0.08;
    }
  }

  renderer.render(scene, camera);
}

/* ------------------------------------------------------------
   Loader → reveal
   ------------------------------------------------------------ */
const loader = document.getElementById("loader");
const loaderCount = document.getElementById("loaderCount");

function boot() {
  const t0 = performance.now();
  const dur = reduceMotion ? 0 : 1100;
  (function tick(now) {
    const pr = dur ? Math.min(1, (now - t0) / dur) : 1;
    loaderCount.textContent = String(Math.round(pr * 100)).padStart(2, "0");
    if (pr < 1) {
      requestAnimationFrame(tick);
    } else {
      loader.classList.add("done");
      document.body.classList.add("ready");
      measure();
    }
  })(t0);
}

loop();
boot();
