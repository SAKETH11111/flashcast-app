import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  ShaderMaterial,
  Color,
  Vector2,
  Vector3,
  Raycaster,
  Object3D,
  MathUtils,
  LoadingManager,
  Mesh,
  BufferGeometry,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

import vertexShader from './../../shaders/brain.vertex.glsl?raw';
import fragmentShader from './../../shaders/brain.fragment.glsl?raw';
import { InstancedUniformsMesh } from 'three-instanced-uniforms-mesh';
import brainModelAssetPath from './../../static/brain.glb';

interface BrainAnimationProps extends React.HTMLAttributes<HTMLDivElement> {}

const BrainAnimation: React.FC<BrainAnimationProps> = React.memo(({ ...props }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);
  const [sizeSt, setSizeSt] = useState({ width: 0, height: 0 }); // Renamed to avoid conflict with 'size' in loadingManager

  const threeRef = useRef({
    scene: null as Scene | null,
    camera: null as PerspectiveCamera | null,
    renderer: null as WebGLRenderer | null,
    raycaster: null as Raycaster | null,
    brain: null as Mesh | null, // This will hold the loaded GLB mesh (used for raycasting)
    instancedMesh: null as InstancedUniformsMesh<ShaderMaterial> | null, // This is the particle effect
  });

  const colors = useMemo(
    () => [new Color(0x963cbd), new Color(0xff6f61), new Color(0xc5299b), new Color(0xfeae51)],
    [],
  );

  const uniformsRef = useRef({
    uHover: 0,
  });

  const isMobileRef = useRef(false);
  const mouseRef = useRef(new Vector2());
  const intersectsRef = useRef<any[]>([]);
  const hoverRef = useRef(false);
  const pointRef = useRef(new Vector3());

  const checkMobile = useCallback(() => {
    isMobileRef.current = window.innerWidth < 767;
  }, []);

  const onResize = useCallback(() => {
    if (containerRef.current && threeRef.current.camera && threeRef.current.renderer) {
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        threeRef.current.camera.aspect = newWidth / newHeight;
        threeRef.current.camera.updateProjectionMatrix();
        threeRef.current.renderer.setSize(newWidth, newHeight);
      }
      checkMobile();
    }
  }, [checkMobile]);
  
  const initThreeApp = useCallback(() => {
    if (isInitializedRef.current || !containerRef.current || threeRef.current.renderer) return;
    if (containerRef.current.clientWidth === 0 || containerRef.current.clientHeight === 0) return;

    isInitializedRef.current = true;
    const currentContainer = containerRef.current;

    threeRef.current.scene = new Scene();
    threeRef.current.camera = new PerspectiveCamera(75, currentContainer.clientWidth / currentContainer.clientHeight, 0.1, 100);
    threeRef.current.camera.position.set(0, 0, 1.2);

    threeRef.current.renderer = new WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio === 1,
    });
    threeRef.current.renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
    threeRef.current.renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight);
    currentContainer.appendChild(threeRef.current.renderer.domElement);

    threeRef.current.raycaster = new Raycaster();
    const loadingManager = new LoadingManager();
    loadingManager.onLoad = () => {
      document.documentElement.classList.add('model-loaded');
    };
    const gltfLoader = new GLTFLoader(loadingManager);

    gltfLoader.load(brainModelAssetPath, (gltf) => {
      const brainMesh = gltf.scene.children[0] as Mesh;
      threeRef.current.brain = brainMesh; // Store the loaded brain mesh (for raycasting)
                                          // Do NOT add brainMesh to the scene if we only want particles

      const geometry = new BoxGeometry(0.004, 0.004, 0.004, 1, 1, 1);
      const material = new ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        wireframe: true,
        uniforms: {
          uPointer: { value: new Vector3() },
          uColor: { value: new Color() },
          uRotation: { value: 0 },
          uSize: { value: 0 },
          uHover: { value: uniformsRef.current.uHover },
        },
      });

      if (brainMesh.geometry instanceof BufferGeometry) {
        const instancedMesh = new InstancedUniformsMesh<ShaderMaterial>(
          geometry,
          material,
          brainMesh.geometry.attributes.position.count,
        );
        threeRef.current.instancedMesh = instancedMesh;
        threeRef.current.scene!.add(instancedMesh); // Add the particle system

        const dummy = new Object3D();
        const positions = brainMesh.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          dummy.position.set(positions[i + 0], positions[i + 1], positions[i + 2]);
          dummy.updateMatrix();
          instancedMesh.setMatrixAt(i / 3, dummy.matrix);
          instancedMesh.setUniformAt('uRotation', i / 3, MathUtils.randFloat(-1, 1));
          instancedMesh.setUniformAt('uSize', i / 3, MathUtils.randFloat(0.3, 3));
          const colorIndex = MathUtils.randInt(0, colors.length - 1);
          instancedMesh.setUniformAt('uColor', i / 3, colors[colorIndex]);
        }
      }
    });
    
    checkMobile();
    onResize(); // Call onResize to set initial camera aspect and renderer size correctly
    addListeners();
    animate();
  }, [onResize, checkMobile, colors]); // Added dependencies

  const animate = useCallback(() => {
    if (!isInitializedRef.current) return;
    animationFrameRef.current = requestAnimationFrame(animate);
    update();
    renderThreeScene(); // Renamed to avoid conflict
  }, [/* update, renderThreeScene could be added */]);

  const update = useCallback(() => {
    if (threeRef.current.camera) {
      threeRef.current.camera.lookAt(0, 0, 0);
      threeRef.current.camera.position.z = isMobileRef.current ? 2.3 : 1.2;
    }
    // Update uniforms or other animations here if needed
    if (threeRef.current.instancedMesh) {
        // Example: Animate uHover based on mouseRef or other logic
        // This part was in onMousemove, but can be simplified or moved here for continuous animation
         const targetHover = hoverRef.current ? 1 : 0;
         uniformsRef.current.uHover += (targetHover - uniformsRef.current.uHover) * 0.1; // Smooth transition

        for (let i = 0; i < threeRef.current.instancedMesh.count; i++) {
            threeRef.current.instancedMesh.setUniformAt('uHover', i, uniformsRef.current.uHover);
            threeRef.current.instancedMesh.setUniformAt('uPointer', i, pointRef.current); // Update pointer for interaction
        }
    }

  }, [/* dependencies for update */]);

  const renderThreeScene = useCallback(() => { // Renamed
    if (threeRef.current.renderer && threeRef.current.scene && threeRef.current.camera) {
      threeRef.current.renderer.render(threeRef.current.scene, threeRef.current.camera);
    }
  }, []);
  
  const animateHoverUniform = useCallback((value: number) => { // This function might be redundant if uHover is animated in update()
    gsap.to(uniformsRef.current, {
      uHover: value,
      duration: 0.25,
      // onUpdate handled in main update loop now
    });
  }, []);

  const onMousemove = useCallback((e: MouseEvent) => {
    if (!containerRef.current || !threeRef.current.camera || !threeRef.current.raycaster || !threeRef.current.brain) return;
    
    const currentContainerSize = { width: containerRef.current.clientWidth, height: containerRef.current.clientHeight };
    if (currentContainerSize.width === 0 || currentContainerSize.height === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / currentContainerSize.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / currentContainerSize.height) * 2 + 1;
    mouseRef.current.set(x, y);

    gsap.to(threeRef.current.camera.position, { x: x * 0.2, y: -y * 0.2, duration: 0.5 });

    threeRef.current.raycaster.setFromCamera(mouseRef.current, threeRef.current.camera);
    intersectsRef.current = threeRef.current.raycaster.intersectObject(threeRef.current.brain, true); // Raycast against the invisible brain model

    if (intersectsRef.current.length === 0) {
      if (hoverRef.current) {
        hoverRef.current = false;
        // animateHoverUniform(0); // uHover is now animated in update loop
      }
    } else {
      if (!hoverRef.current) {
        hoverRef.current = true;
        // animateHoverUniform(1); // uHover is now animated in update loop
      }
      gsap.to(pointRef.current, {
        x: intersectsRef.current[0]?.point.x || 0,
        y: intersectsRef.current[0]?.point.y || 0,
        z: intersectsRef.current[0]?.point.z || 0,
        overwrite: true,
        duration: 0.3,
        // onUpdate handled in main update loop
      });
    }
  }, [/* animateHoverUniform removed if uHover is handled in update */]);

  const addListeners = useCallback(() => {
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('mousemove', onMousemove, { passive: true });
  }, [onResize, onMousemove]);

  const removeListeners = useCallback(() => {
    window.removeEventListener('resize', onResize);
    window.removeEventListener('mousemove', onMousemove);
  }, [onResize, onMousemove]);

  useEffect(() => {
    if (containerRef.current && (containerRef.current.clientWidth > 0 || containerRef.current.clientHeight > 0) && !isInitializedRef.current) {
      initThreeApp();
    }
    const currentContainer = containerRef.current;
    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      removeListeners();
      if (threeRef.current.renderer && currentContainer && currentContainer.contains(threeRef.current.renderer.domElement)) {
        currentContainer.removeChild(threeRef.current.renderer.domElement);
      }
      if (threeRef.current.renderer) threeRef.current.renderer.dispose();
      threeRef.current.renderer = null;
      threeRef.current.scene = null;
      threeRef.current.camera = null;
      isInitializedRef.current = false;
    };
  }, [initThreeApp, removeListeners]);

  useEffect(() => {
    const container = containerRef.current;
    let observer: ResizeObserver;
    if (container) {
      observer = new ResizeObserver(() => {
        if (containerRef.current && isInitializedRef.current) {
          onResize();
        } else if (containerRef.current && !isInitializedRef.current && containerRef.current.clientWidth > 0 && containerRef.current.clientHeight > 0) {
          initThreeApp();
        }
      });
      observer.observe(container);
    }
    return () => {
      if (container && observer) observer.unobserve(container);
    };
  }, [initThreeApp, onResize]);

  return <div {...props} ref={containerRef} data-brain-animation-container="true" style={{ width: '100%', height: '100%', touchAction: 'none', ...props.style }}></div>;
});

export default BrainAnimation;
