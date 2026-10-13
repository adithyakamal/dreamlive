import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCw, Layers } from 'lucide-react';
import { MESHY_OBJECT_PRESETS } from '../../data/dreamLiveContent';

export const Meshy3DViewer = ({
  initialPreset = 'device',
  allowPresetSwitch = true,
  className = '',
  height = '420px',
  interactive = true,
}) => {
  const mountRef = useRef(null);
  const [activePreset, setActivePreset] = useState(initialPreset);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const meshGroupRef = useRef(null);
  const particlesRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  const isRotatingRef = useRef(isRotating);
  const interactiveRef = useRef(interactive);

  useEffect(() => {
    isRotatingRef.current = isRotating;
    interactiveRef.current = interactive;
  }, [isRotating, interactive]);

  // Function to build/update 3D geometry
  const updateObjectGeometry = useCallback((presetId, isWireframe) => {
    const group = meshGroupRef.current;
    if (!group) return;

    // Clear existing
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    }

    if (presetId === 'device') {
      // 1. Futuristic Device: Center Core + Orbiting Holographic Rings
      const coreGeo = new THREE.CylinderGeometry(0.8, 1, 1.6, 32);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0x1e1b4b,
        metalness: 0.85,
        roughness: 0.2,
        clearcoat: 0.8,
        wireframe: isWireframe,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Glowing glass capsule
      const glassGeo = new THREE.SphereGeometry(1.2, 32, 32);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x8b5cf6,
        transmission: 0.7,
        opacity: 0.85,
        transparent: true,
        roughness: 0.1,
        ior: 1.5,
        wireframe: isWireframe,
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      group.add(glass);

      // Holographic Ring 1
      const ring1Geo = new THREE.TorusGeometry(1.7, 0.04, 16, 100);
      const ring1Mat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: isWireframe,
      });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.rotation.x = Math.PI / 3;
      group.add(ring1);

      // Holographic Ring 2
      const ring2Geo = new THREE.TorusGeometry(2.0, 0.03, 16, 100);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0xf472b6,
        wireframe: isWireframe,
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.y = Math.PI / 4;
      group.add(ring2);
    } else if (presetId === 'sculpture') {
      // 2. Faceted Crystal Sculpture
      const crystalGeo = new THREE.IcosahedronGeometry(1.4, 0);
      const crystalMat = new THREE.MeshPhysicalMaterial({
        color: 0xec4899,
        metalness: 0.2,
        roughness: 0.1,
        transmission: 0.8,
        ior: 1.7,
        wireframe: isWireframe,
      });
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      group.add(crystal);

      // Surrounding wireframe cage
      const cageGeo = new THREE.IcosahedronGeometry(1.7, 1);
      const cageMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const cage = new THREE.Mesh(cageGeo, cageMat);
      group.add(cage);
    } else if (presetId === 'sphere') {
      // 3. Quantum Digital Sphere
      const sphereGeo = new THREE.SphereGeometry(1.3, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.3,
        metalness: 0.8,
        wireframe: isWireframe,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      group.add(sphere);

      // Orbiting Ring
      const torusGeo = new THREE.TorusGeometry(1.8, 0.06, 16, 80);
      const torusMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        metalness: 0.9,
        wireframe: isWireframe,
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      torus.rotation.x = 1.2;
      group.add(torus);
    } else {
      // 4. Metallic Glass Obelisk
      const obeliskGeo = new THREE.OctahedronGeometry(1.5, 0);
      const obeliskMat = new THREE.MeshPhysicalMaterial({
        color: 0xf59e0b,
        metalness: 0.9,
        roughness: 0.15,
        clearcoat: 1.0,
        wireframe: isWireframe,
      });
      const obelisk = new THREE.Mesh(obeliskGeo, obeliskMat);
      group.add(obelisk);

      const orbitGeo = new THREE.TorusGeometry(2.1, 0.03, 16, 100);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: 0xfde047,
        wireframe: isWireframe,
      });
      const orbit = new THREE.Mesh(orbitGeo, orbitMat);
      orbit.rotation.z = Math.PI / 4;
      group.add(orbit);
    }
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 360;
    const heightVal = currentMount.clientHeight || 420;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / heightVal, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, heightVal);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    currentMount.innerHTML = '';
    currentMount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 3, 50);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 2.5, 50);
    pointLight2.position.set(-4, -3, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xec4899, 2, 50);
    pointLight3.position.set(0, 4, -3);
    scene.add(pointLight3);

    // Group for objects
    const group = new THREE.Group();
    meshGroupRef.current = group;
    scene.add(group);

    // Ambient floating particles
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 120;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 8;
      posArray[i + 1] = (Math.random() - 0.5) * 8;
      posArray[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xc084fc,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    scene.add(particles);

    // Build the initial 3D object
    updateObjectGeometry(activePreset, wireframeMode);

    // Animation Loop
    let animationFrameId;
    let isVisible = false;
    const startTime = performance.now();

    const animate = (currentTime = performance.now()) => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (currentTime - startTime) * 0.001;

      if (group) {
        if (isRotatingRef.current) {
          group.rotation.y = elapsedTime * 0.45;
          group.rotation.x = Math.sin(elapsedTime * 0.3) * 0.25;
        }

        // Mouse Parallax
        if (interactiveRef.current) {
          group.position.x += (mousePosRef.current.x * 0.8 - group.position.x) * 0.05;
          group.position.y += (-mousePosRef.current.y * 0.8 - group.position.y) * 0.05;
        }
      }

      if (particles) {
        particles.rotation.y = elapsedTime * 0.08;
      }

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible = true;
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(animate);
        } else {
          isVisible = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentMount);

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount) {
        currentMount.innerHTML = '';
      }
      renderer.dispose();
    };
  }, [activePreset, updateObjectGeometry, wireframeMode]);

  useEffect(() => {
    updateObjectGeometry(activePreset, wireframeMode);
  }, [activePreset, wireframeMode, updateObjectGeometry]);

  const handleMouseMove = (e) => {
    if (!mountRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mousePosRef.current = { x, y };
  };

  const currentPresetInfo =
    MESHY_OBJECT_PRESETS.find((p) => p.id === activePreset) || MESHY_OBJECT_PRESETS[0];

  return (
    <div
      className={`relative rounded-3xl glass-panel-glow border border-white/15 overflow-hidden flex flex-col ${className}`}
    >
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        onMouseMove={handleMouseMove}
        style={{ height }}
        className="w-full relative cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Top Floating Info Tag */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10">
          <div
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: currentPresetInfo.color }}
          />
          <span className="text-xs font-bold text-white tracking-wide">
            {currentPresetInfo.name}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase px-1.5 py-0.5 rounded bg-white/5">
            Meshy 3D
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`p-2 rounded-full border text-xs font-bold transition-all cursor-pointer ${
              wireframeMode
                ? 'bg-violet-600 text-white border-violet-400'
                : 'bg-black/60 text-slate-300 border-white/15 hover:text-white'
            }`}
            title="Toggle Hologram Wireframe"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-full border text-xs font-bold transition-all cursor-pointer ${
              isRotating
                ? 'bg-fuchsia-600 text-white border-fuchsia-400'
                : 'bg-black/60 text-slate-300 border-white/15 hover:text-white'
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Preset Switcher Carousel */}
      {allowPresetSwitch && (
        <div className="p-4 bg-slate-950/70 backdrop-blur-md border-t border-white/10 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          {MESHY_OBJECT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setActivePreset(preset.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activePreset === preset.id
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/30'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: preset.color }}
              />
              <span>{preset.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meshy3DViewer;
