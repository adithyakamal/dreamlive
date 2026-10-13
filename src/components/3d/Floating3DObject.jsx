import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Floating3DObject = ({
  shape = 'torus', // 'torus', 'octahedron', 'dodecahedron', 'sphere'
  color = '#a855f7',
  size = 80,
  wireframe = false,
  className = '',
}) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = size;
    const height = size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    currentMount.innerHTML = '';
    currentMount.appendChild(renderer.domElement);

    // Light
    const pointLight = new THREE.PointLight(0xffffff, 2.5);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Geometry
    let geometry;
    if (shape === 'torus') {
      geometry = new THREE.TorusGeometry(0.8, 0.28, 16, 50);
    } else if (shape === 'octahedron') {
      geometry = new THREE.OctahedronGeometry(0.9, 0);
    } else if (shape === 'dodecahedron') {
      geometry = new THREE.DodecahedronGeometry(0.9, 0);
    } else {
      geometry = new THREE.SphereGeometry(0.9, 24, 24);
    }

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.2,
      metalness: 0.8,
      wireframe,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId;
    let isVisible = false;
    const startTime = performance.now();

    const animate = (currentTime = performance.now()) => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      const t = (currentTime - startTime) * 0.001;
      mesh.rotation.x = t * 0.8;
      mesh.rotation.y = t * 1.1;
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

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (currentMount) {
        currentMount.innerHTML = '';
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [shape, color, size, wireframe]);

  return (
    <div
      ref={mountRef}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`inline-block shrink-0 ${className}`}
    />
  );
};

export default React.memo(Floating3DObject);
