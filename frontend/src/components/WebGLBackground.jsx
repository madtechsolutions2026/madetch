import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0b, 0.09);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 60);
    camera.position.set(0, 0, 6);

    const COUNT = isMobile ? 3200 : 7000;
    const WAVE_COUNT = isMobile ? 1600 : 4200;

    // Build Morphing Cloud
    function buildCloud() {
      const geo = new THREE.BufferGeometry();
      const chaos = new Float32Array(COUNT * 3);
      const order = new Float32Array(COUNT * 3);
      const alt = new Float32Array(COUNT * 3);
      const seeds = new Float32Array(COUNT);
      const R = 1.75;
      const golden = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < COUNT; i++) {
        // Chaos
        chaos[i * 3] = (Math.random() - 0.5) * 11;
        chaos[i * 3 + 1] = (Math.random() - 0.5) * 7;
        chaos[i * 3 + 2] = (Math.random() - 0.5) * 8;

        // Order: Fibonacci sphere
        const y = 1 - (i / (COUNT - 1)) * 2;
        const rad = Math.sqrt(1 - y * y);
        const th = golden * i;
        order[i * 3] = Math.cos(th) * rad * R;
        order[i * 3 + 1] = y * R;
        order[i * 3 + 2] = Math.sin(th) * rad * R;

        // Alt: Torus knot
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
          uMorph: { value: 0 },
          uAlt: { value: 0 },
          uMouse: { value: new THREE.Vector3(99, 99, 99) },
          uMouseF: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        },
        vertexShader: `
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
            float m  = smoothstep(aSeed * 0.35, aSeed * 0.35 + 0.65, uMorph);
            float m2 = smoothstep(aSeed * 0.30, aSeed * 0.30 + 0.70, uAlt);
            vec3 p = mix(mix(position, aOrder, m), aAlt, m2);

            float formed = max(m, m2);
            float t = uTime * 0.4;
            float amp = mix(0.35, 0.05, formed);
            p.x += sin(t + aSeed * 17.0) * amp;
            p.y += cos(t * 1.3 + aSeed * 29.0) * amp;
            p.z += sin(t * 0.8 + aSeed * 41.0) * amp * 0.9;

            vec3 dm = p - uMouse;
            float dist = length(dm);
            float force = smoothstep(1.15, 0.0, dist);
            p += (dm / max(dist, 0.001)) * force * 0.6 * uMouseF;

            float tw = 0.75 + 0.45 * sin(uTime * (1.2 + aSeed * 2.2) + aSeed * 40.0);

            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = (1.5 + aSeed * 2.4) * tw * uPixelRatio * (5.2 / -mv.z);
            vGlow = formed + force * 0.8;
            vTw = tw;
          }
        `,
        fragmentShader: `
          varying float vGlow;
          varying float vTw;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.05, d);
            vec3 col = mix(vec3(0.48, 0.48, 0.50), vec3(0.82, 0.88, 1.0), clamp(vGlow, 0.0, 1.0));
            gl_FragColor = vec4(col, a * 0.8 * (0.7 + 0.3 * vTw));
          }
        `,
      });

      return new THREE.Points(geo, mat);
    }

    // Build Wave Field
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
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        },
        vertexShader: `
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
        fragmentShader: `
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

    group.position.x = isMobile ? 0 : 1.6;

    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();
    const mouseWorld = new THREE.Vector3(99, 99, 99);
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { x: mouse.x, y: mouse.y };
    let mouseActive = false;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouseActive = true;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let animationFrameId;

    const loop = () => {
      animationFrameId = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();

      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const p = Math.min(1, scrollY / maxScroll);

      eased.x += (mouse.x - eased.x) * 0.16;
      eased.y += (mouse.y - eased.y) * 0.16;

      const morph = THREE.MathUtils.smoothstep(p, 0.02, 0.33);
      const alt = THREE.MathUtils.smoothstep(p, 0.44, 0.72);

      cloud.material.uniforms.uMorph.value = morph;
      cloud.material.uniforms.uAlt.value = alt;
      cloud.material.uniforms.uTime.value = t;
      wave.material.uniforms.uTime.value = t;

      group.rotation.y = t * (0.05 + alt * 0.12) + (eased.x / window.innerWidth - 0.5) * 0.35;
      group.rotation.x = (eased.y / window.innerHeight - 0.5) * 0.25 + alt * 0.5;
      group.position.x = (isMobile ? 0 : 1.6) * (1 - THREE.MathUtils.smoothstep(p, 0.05, 0.4));
      group.position.y = Math.sin(t * 0.3) * 0.08;

      const aspect = window.innerWidth / window.innerHeight;
      const baseScale = aspect < 0.85 ? aspect * 1.15 : 1;
      group.scale.setScalar(baseScale * (1 + THREE.MathUtils.smoothstep(p, 0.85, 1) * 0.35));
      camera.position.z = 6 - p * 1.2;

      if (finePointer && mouseActive) {
        mouseNDC.set((eased.x / window.innerWidth) * 2 - 1, -(eased.y / window.innerHeight) * 2 + 1);
        raycaster.setFromCamera(mouseNDC, camera);
        if (raycaster.ray.intersectPlane(mousePlane, mouseWorld)) {
          group.updateMatrixWorld();
          cloud.material.uniforms.uMouse.value.copy(group.worldToLocal(mouseWorld.clone()));
          cloud.material.uniforms.uMouseF.value +=
            (1 - cloud.material.uniforms.uMouseF.value) * 0.08;
        }
      }

      renderer.render(scene, camera);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas id="gl-canvas" ref={canvasRef} aria-hidden="true" />;
}
