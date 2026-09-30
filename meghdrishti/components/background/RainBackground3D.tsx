"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useApp } from "@/lib/context/AppContext";
import { rainAudio } from "@/lib/audio/rain-audio";
import {
  CloudRain,
  Volume2,
  VolumeX,
  Zap,
  ZapOff,
  Wind,
  Sliders,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

export type WeatherPreset = "drizzle" | "active" | "heavy" | "storm";

interface RainDrop3D {
  x: number;
  y: number;
  z: number;
  speed: number;
  length: number;
  opacity: number;
}

interface Splash3D {
  x: number;
  y: number;
  z: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  active: boolean;
}

export function RainBackground3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { selectedPhase, language } = useApp();

  // Atmosphere user-configurable states
  const [preset, setPreset] = useState<WeatherPreset>("active");
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [lightningEnabled, setLightningEnabled] = useState<boolean>(true);
  const [windEffect, setWindEffect] = useState<boolean>(true);
  const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
  const [fpsAlert, setFpsAlert] = useState<boolean>(false);

  // Sync preset with AppContext selectedPhase on mount or change
  useEffect(() => {
    if (selectedPhase === "break") {
      setPreset("drizzle");
      rainAudio.setIntensity("drizzle");
    } else if (selectedPhase === "revival") {
      setPreset("heavy");
      rainAudio.setIntensity("heavy");
    } else {
      setPreset("active");
      rainAudio.setIntensity("moderate");
    }
  }, [selectedPhase]);

  // Audio toggle
  const toggleAudio = useCallback(() => {
    const isNowPlaying = rainAudio.toggle();
    setAudioEnabled(isNowPlaying);
    if (isNowPlaying) {
      rainAudio.setIntensity(
        preset === "drizzle"
          ? "drizzle"
          : preset === "heavy"
          ? "heavy"
          : preset === "storm"
          ? "storm"
          : "moderate"
      );
    }
  }, [preset]);

  // Change preset handler
  const handlePresetChange = (newPreset: WeatherPreset) => {
    setPreset(newPreset);
    if (audioEnabled) {
      rainAudio.setIntensity(
        newPreset === "drizzle"
          ? "drizzle"
          : newPreset === "heavy"
          ? "heavy"
          : newPreset === "storm"
          ? "storm"
          : "moderate"
      );
    }
  };

  // Three.js Engine Setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera, WebGLRenderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0e201b, 0.0035);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 75);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);
    } catch {
      setFpsAlert(true);
      return;
    }

    // 2. Lighting setup
    const ambientLight = new THREE.AmbientLight(0x76a599, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xb0d8f0, 1.8);
    dirLight.position.set(20, 80, 40);
    scene.add(dirLight);

    // Lightning Flash Light
    const lightningLight = new THREE.PointLight(0xd4f0ff, 0, 450, 1.2);
    lightningLight.position.set(0, 70, 20);
    scene.add(lightningLight);

    // 3. Raindrops Setup (LineSegments BufferGeometry for optimal 60fps)
    const getDropCount = (p: WeatherPreset) => {
      switch (p) {
        case "drizzle":
          return 1400;
        case "active":
          return 2800;
        case "heavy":
          return 4200;
        case "storm":
          return 5600;
      }
    };

    const maxDrops = 5600;
    const activeCount = getDropCount(preset);

    const positions = new Float32Array(maxDrops * 2 * 3); // 2 vertices per line (start & end)
    const colors = new Float32Array(maxDrops * 2 * 3);

    const drops: RainDrop3D[] = [];
    const baseColor = new THREE.Color(0xa9d3ea);
    const deepColor = new THREE.Color(0x579fc4);

    for (let i = 0; i < maxDrops; i++) {
      const drop: RainDrop3D = {
        x: (Math.random() - 0.5) * 220,
        y: (Math.random() - 0.5) * 160 + 10,
        z: (Math.random() - 0.5) * 140,
        speed: 1.8 + Math.random() * 2.4,
        length: 2.2 + Math.random() * 3.4,
        opacity: 0.12 + Math.random() * 0.2,
      };
      drops.push(drop);

      // Color variation based on depth (near = brighter, far = deeper blue)
      const depthRatio = THREE.MathUtils.clamp((drop.z + 70) / 140, 0, 1);
      const dropColor = deepColor.clone().lerp(baseColor, depthRatio);

      // Vertex 0 (tail)
      colors[i * 6 + 0] = dropColor.r;
      colors[i * 6 + 1] = dropColor.g;
      colors[i * 6 + 2] = dropColor.b;
      // Vertex 1 (head)
      colors[i * 6 + 3] = dropColor.r * 1.25;
      colors[i * 6 + 4] = dropColor.g * 1.25;
      colors[i * 6 + 5] = dropColor.b * 1.25;
    }

    const rainGeometry = new THREE.BufferGeometry();
    rainGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    rainGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const rainMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5,
    });

    const rainSystem = new THREE.LineSegments(rainGeometry, rainMaterial);
    scene.add(rainSystem);

    // 4. Ground & Glass Splashes (Expanding 3D Rings)
    const splashCount = 45;
    const splashes: Splash3D[] = [];
    const splashRings: THREE.Mesh[] = [];
    const ringGeo = new THREE.RingGeometry(0.1, 0.45, 16);

    for (let i = 0; i < splashCount; i++) {
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x98cde8,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(ringGeo, ringMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = -45;
      scene.add(mesh);
      splashRings.push(mesh);

      splashes.push({
        x: 0,
        y: -45,
        z: 0,
        radius: 0.1,
        maxRadius: 1.2 + Math.random() * 1.5,
        opacity: 0,
        active: false,
      });
    }

    // 5. Drifting Volumetric Mist / Monsoon Cloud Layers
    const cloudParticles: THREE.Mesh[] = [];
    const cloudCount = 18;
    const cloudGeo = new THREE.PlaneGeometry(60, 40);

    // Create procedural soft circular cloud texture
    const cloudCanvas = document.createElement("canvas");
    cloudCanvas.width = 128;
    cloudCanvas.height = 128;
    const cloudCtx = cloudCanvas.getContext("2d");
    if (cloudCtx) {
      const grad = cloudCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(180, 215, 205, 0.28)");
      grad.addColorStop(0.5, "rgba(120, 175, 165, 0.12)");
      grad.addColorStop(1, "rgba(80, 130, 120, 0)");
      cloudCtx.fillStyle = grad;
      cloudCtx.fillRect(0, 0, 128, 128);
    }
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);

    const cloudMaterial = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    for (let i = 0; i < cloudCount; i++) {
      const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        (Math.random() - 0.5) * 180,
        20 + Math.random() * 35,
        -40 - Math.random() * 60
      );
      cloud.rotation.z = Math.random() * Math.PI * 2;
      scene.add(cloud);
      cloudParticles.push(cloud);
    }

    // 6. Interactive Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. Lightning Simulation Loop
    let lastLightning = performance.now();
    let isFlashing = false;
    let flashStage = 0;
    let flashTimer = 0;

    const triggerLightning = () => {
      isFlashing = true;
      flashStage = 1;
      flashTimer = 0;
      if (lightningEnabled && audioEnabled) {
        rainAudio.triggerThunder();
      }
    };

    // 8. Animation & Render Loop
    let animationFrameId: number;
    let lastFrameTime = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((time - lastFrameTime) / 1000, 0.1);
      lastFrameTime = time;

      // Mouse Parallax smooth lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      camera.position.x = currentMouseX * 12;
      camera.position.y = -currentMouseY * 8;
      camera.lookAt(0, 0, 0);

      // Wind Vector based on preset & windEffect toggle
      const windSpeed = windEffect
        ? (preset === "storm" ? 22 : preset === "heavy" ? 14 : preset === "active" ? 9 : 4)
        : 0;
      const windX = (windSpeed / 30) * Math.sin(time * 0.0006) + (windSpeed / 50);

      // Lightning Logic
      if (lightningEnabled) {
        if (!isFlashing && time - lastLightning > (preset === "storm" ? 6000 : 15000)) {
          if (Math.random() < 0.02) {
            triggerLightning();
            lastLightning = time;
          }
        }

        if (isFlashing) {
          flashTimer += delta;
          if (flashStage === 1) {
            // First sharp pulse
            lightningLight.intensity = THREE.MathUtils.lerp(0, 4.2, flashTimer / 0.06);
            if (flashTimer > 0.06) {
              flashStage = 2;
              flashTimer = 0;
            }
          } else if (flashStage === 2) {
            // Quick dip
            lightningLight.intensity = THREE.MathUtils.lerp(4.2, 0.4, flashTimer / 0.05);
            if (flashTimer > 0.05) {
              flashStage = 3;
              flashTimer = 0;
            }
          } else if (flashStage === 3) {
            // Second lingering flash
            lightningLight.intensity = THREE.MathUtils.lerp(0.4, 3.2, flashTimer / 0.08);
            if (flashTimer > 0.08) {
              flashStage = 4;
              flashTimer = 0;
            }
          } else if (flashStage === 4) {
            // Smooth decay
            lightningLight.intensity = THREE.MathUtils.lerp(3.2, 0, flashTimer / 0.35);
            if (flashTimer > 0.35) {
              lightningLight.intensity = 0;
              isFlashing = false;
            }
          }
        }
      } else {
        lightningLight.intensity = 0;
      }

      // Update Raindrop Positions
      const posAttr = rainGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      const currentDropCount = getDropCount(preset);
      const speedMultiplier = preset === "storm" ? 1.6 : preset === "heavy" ? 1.3 : preset === "drizzle" ? 0.75 : 1.0;

      for (let i = 0; i < maxDrops; i++) {
        const drop = drops[i];

        if (i < currentDropCount) {
          // Drop moves down
          drop.y -= drop.speed * speedMultiplier * delta * 60;
          drop.x += windX * delta * 60;

          // Check if drop hits ground/bottom
          if (drop.y < -45) {
            // Trigger splash with probability
            if (Math.random() < 0.25) {
              const inactiveSplash = splashes.find((s) => !s.active);
              if (inactiveSplash) {
                inactiveSplash.active = true;
                inactiveSplash.x = drop.x;
                inactiveSplash.y = -45;
                inactiveSplash.z = drop.z;
                inactiveSplash.radius = 0.1;
                inactiveSplash.opacity = 0.6;
              }
            }
            // Reset drop to top
            drop.y = 80 + Math.random() * 20;
            drop.x = (Math.random() - 0.5) * 220;
            drop.z = (Math.random() - 0.5) * 140;
          }

          // Tail vertex
          posArray[i * 6 + 0] = drop.x - windX * 0.45;
          posArray[i * 6 + 1] = drop.y + drop.length * (preset === "storm" ? 1.4 : 1.0);
          posArray[i * 6 + 2] = drop.z;

          // Head vertex
          posArray[i * 6 + 3] = drop.x;
          posArray[i * 6 + 4] = drop.y;
          posArray[i * 6 + 5] = drop.z;
        } else {
          // Hide unused drops off-screen
          posArray[i * 6 + 0] = 0;
          posArray[i * 6 + 1] = -999;
          posArray[i * 6 + 2] = 0;
          posArray[i * 6 + 3] = 0;
          posArray[i * 6 + 4] = -999;
          posArray[i * 6 + 5] = 0;
        }
      }
      posAttr.needsUpdate = true;

      // Update Splashes
      for (let i = 0; i < splashCount; i++) {
        const s = splashes[i];
        const mesh = splashRings[i];
        if (s.active) {
          s.radius += 1.8 * delta;
          s.opacity -= 1.6 * delta;

          mesh.position.set(s.x, s.y, s.z);
          mesh.scale.set(s.radius, s.radius, 1);
          (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(s.opacity, 0);

          if (s.opacity <= 0) {
            s.active = false;
          }
        } else {
          (mesh.material as THREE.MeshBasicMaterial).opacity = 0;
        }
      }

      // Rotate & Drift Mist Clouds
      for (let i = 0; i < cloudCount; i++) {
        const cloud = cloudParticles[i];
        cloud.position.x += (windX * 0.15 + 0.05) * delta * 20;
        cloud.rotation.z += 0.0003;
        if (cloud.position.x > 120) {
          cloud.position.x = -120;
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize Listener
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      // Dispose Three.js resources
      rainGeometry.dispose();
      rainMaterial.dispose();
      ringGeo.dispose();
      cloudGeo.dispose();
      cloudTexture.dispose();
      cloudMaterial.dispose();
      splashRings.forEach((r) => {
        (r.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [preset, lightningEnabled, windEffect]);

  return (
    <>
      {/* 1. Fullscreen Fixed 3D WebGL Canvas Layer */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, #10241E 0%, #153229 35%, #183B2E 70%, #1E4638 100%)",
        }}
      >
        {/* Organic Monsoon Lighting Washes behind 3D Rain */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2E614F_0%,transparent_65%)] opacity-40" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#5B91A8]/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#126B4F]/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[350px] bg-[#3B775C]/15 blur-3xl" />
      </div>

      {/* 2. Interactive Atmosphere Floating Command Bar (Creative Floating Instrument) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Expanded Atmosphere Tuning Panel */}
        {isWidgetOpen && (
          <div className="w-72 sm:w-80 p-4 rounded-2xl bg-[#0D241D]/90 border border-[#2F6B55]/50 shadow-2xl backdrop-blur-xl text-white space-y-3.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2F6B55]/40 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#176B4D] flex items-center justify-center text-white shadow-xs">
                  <CloudRain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#A8DAC5]">
                    {language === "hi" ? "3D वायुमंडलीय सिमुलेशन" : "3D Monsoon Simulation"}
                  </div>
                  <div className="text-[10px] text-gray-300">WebGL Hardware Accelerated</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsWidgetOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
                title="Minimize"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Weather Preset Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
                {language === "hi" ? "वर्षा तीव्रता" : "Rainfall Intensity"}
              </label>
              <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-black/30 border border-[#2F6B55]/30">
                {(["drizzle", "active", "heavy", "storm"] as const).map((p) => {
                  const isActive = preset === p;
                  const labels = {
                    drizzle: language === "hi" ? "रिमझिम" : "Drizzle",
                    active: language === "hi" ? "सक्रिय" : "Active",
                    heavy: language === "hi" ? "भारी" : "Heavy",
                    storm: language === "hi" ? "तूफान" : "Storm",
                  };
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePresetChange(p)}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all capitalize cursor-pointer ${
                        isActive
                          ? "bg-[#176B4D] text-white shadow-md scale-102"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {labels[p]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Atmosphere Toggles (Audio, Lightning, Wind) */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#2F6B55]/30">
              {/* Procedural Web Audio Sound */}
              <button
                type="button"
                onClick={toggleAudio}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  audioEnabled
                    ? "bg-[#176B4D]/60 border-[#38A179] text-white shadow-sm"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
                title="Procedural Rain Sound (Web Audio)"
              >
                {audioEnabled ? (
                  <Volume2 className="w-4 h-4 text-[#4ADE80] animate-pulse" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
                <span className="text-[10px] font-semibold mt-1">
                  {audioEnabled ? "Audio On" : "Muted"}
                </span>
              </button>

              {/* Lightning Atmospheric Flash */}
              <button
                type="button"
                onClick={() => setLightningEnabled(!lightningEnabled)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  lightningEnabled
                    ? "bg-[#176B4D]/60 border-[#38A179] text-white shadow-sm"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
                title="Toggle Lightning Flashes"
              >
                {lightningEnabled ? (
                  <Zap className="w-4 h-4 text-[#FACC15]" />
                ) : (
                  <ZapOff className="w-4 h-4" />
                )}
                <span className="text-[10px] font-semibold mt-1">
                  {lightningEnabled ? "Lightning" : "Off"}
                </span>
              </button>

              {/* Wind & Mist */}
              <button
                type="button"
                onClick={() => setWindEffect(!windEffect)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  windEffect
                    ? "bg-[#176B4D]/60 border-[#38A179] text-white shadow-sm"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
                title="Toggle Wind & Mist Drifting"
              >
                <Wind className={`w-4 h-4 ${windEffect ? "text-[#38BDF8]" : ""}`} />
                <span className="text-[10px] font-semibold mt-1">
                  {windEffect ? "Wind Active" : "Calm"}
                </span>
              </button>
            </div>

            {/* Quick Status Info */}
            <div className="flex items-center justify-between text-[10px] text-gray-300 pt-1">
              <span>Monsoon Phase: <strong className="text-[#4ADE80] uppercase">{selectedPhase}</strong></span>
              <span className="flex items-center gap-1 text-[#38BDF8]">
                <Sparkles className="w-3 h-3" /> 3D Depth Active
              </span>
            </div>
          </div>
        )}

        {/* Floating Trigger Pill */}
        <button
          type="button"
          onClick={() => setIsWidgetOpen(!isWidgetOpen)}
          className="group inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#0D241D]/90 border border-[#2F6B55]/60 hover:border-[#4ADE80] text-white shadow-xl backdrop-blur-md transition-all hover:scale-104 cursor-pointer"
          title="Customize 3D Rain & Atmosphere"
        >
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#4ADE80] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]" />
          </div>
          <CloudRain className="w-4 h-4 text-[#38BDF8]" />
          <span className="text-xs font-bold tracking-wide">
            3D Rain: <span className="capitalize text-[#4ADE80]">{preset}</span>
          </span>
          {audioEnabled && <Volume2 className="w-3.5 h-3.5 text-[#4ADE80] animate-pulse" />}
          {isWidgetOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
          )}
        </button>
      </div>
    </>
  );
}

export default RainBackground3D;
