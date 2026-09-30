"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useApp } from "@/lib/context/AppContext";
import { rainAudio } from "@/lib/audio/rain-audio";
import {
  CloudRain,
  Sun,
  TreeDeciduous,
  Snowflake,
  Volume2,
  VolumeX,
  Zap,
  ZapOff,
  Wind,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

export type SeasonType = "rain" | "sunny" | "autumn" | "winter";

export type WeatherPreset = "drizzle" | "active" | "heavy" | "storm";

interface Particle3D {
  x: number;
  y: number;
  z: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
}

// ─── Season Configuration ───────────────────────────────────────────
const SEASON_CONFIG = {
  rain: {
    label: "Monsoon Rain",
    labelHi: "मानसून वर्षा",
    icon: CloudRain,
    bgGradient:
      "linear-gradient(180deg, #10241E 0%, #153229 35%, #183B2E 70%, #1E4638 100%)",
    fogColor: 0x0e201b,
    fogDensity: 0.0035,
    ambientColor: 0x76a599,
    ambientIntensity: 1.4,
    dirLightColor: 0xb0d8f0,
    dirLightIntensity: 1.8,
    accentGlow: "#2E614F",
    orb1: "#5B91A8",
    orb2: "#126B4F",
    orb3: "#3B775C",
  },
  sunny: {
    label: "Sunny Day",
    labelHi: "धूप का दिन",
    icon: Sun,
    bgGradient:
      "linear-gradient(180deg, #1A3A5C 0%, #2C5F8A 25%, #4A90C4 50%, #8BC4E8 75%, #C4E0F0 100%)",
    fogColor: 0x87ceeb,
    fogDensity: 0.001,
    ambientColor: 0xfff8dc,
    ambientIntensity: 2.2,
    dirLightColor: 0xffd700,
    dirLightIntensity: 3.0,
    accentGlow: "#FFC857",
    orb1: "#FFD700",
    orb2: "#FF8C00",
    orb3: "#87CEEB",
  },
  autumn: {
    label: "Autumn Fall",
    labelHi: "शरद ऋतु",
    icon: TreeDeciduous,
    bgGradient:
      "linear-gradient(180deg, #2A1810 0%, #3D2415 25%, #5C3820 50%, #7A4E30 75%, #2A1810 100%)",
    fogColor: 0x3d2415,
    fogDensity: 0.002,
    ambientColor: 0xd4a574,
    ambientIntensity: 1.8,
    dirLightColor: 0xff8c42,
    dirLightIntensity: 2.2,
    accentGlow: "#D4763D",
    orb1: "#D4763D",
    orb2: "#8B4513",
    orb3: "#CD853F",
  },
  winter: {
    label: "Winter Snow",
    labelHi: "सर्दी / बर्फबारी",
    icon: Snowflake,
    bgGradient:
      "linear-gradient(180deg, #0A1628 0%, #132240 25%, #1A3050 50%, #2A4060 75%, #0A1628 100%)",
    fogColor: 0x1a3050,
    fogDensity: 0.003,
    ambientColor: 0xadc8e6,
    ambientIntensity: 1.6,
    dirLightColor: 0xe8f0ff,
    dirLightIntensity: 2.0,
    accentGlow: "#4A7BAF",
    orb1: "#6BA3D6",
    orb2: "#3A6690",
    orb3: "#8BB8E0",
  },
};

// ─── Season button accent colors ────────────────────────────────────
const SEASON_ACCENT: Record<SeasonType, { bg: string; border: string; text: string; glow: string }> = {
  rain: { bg: "#176B4D", border: "#38A179", text: "#4ADE80", glow: "rgba(52,211,153,0.5)" },
  sunny: { bg: "#B8860B", border: "#FFD700", text: "#FFD700", glow: "rgba(255,215,0,0.5)" },
  autumn: { bg: "#8B4513", border: "#D4763D", text: "#FF8C42", glow: "rgba(212,118,61,0.5)" },
  winter: { bg: "#2A5080", border: "#6BA3D6", text: "#8BB8E0", glow: "rgba(107,163,214,0.5)" },
};

export function SeasonalBackground3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { selectedPhase, language } = useApp();

  const [season, setSeason] = useState<SeasonType>("rain");
  const [preset, setPreset] = useState<WeatherPreset>("active");
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [lightningEnabled, setLightningEnabled] = useState<boolean>(true);
  const [windEffect, setWindEffect] = useState<boolean>(true);
  const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);

  const accent = SEASON_ACCENT[season];
  const config = SEASON_CONFIG[season];

  // Sync preset with AppContext selectedPhase
  useEffect(() => {
    if (season !== "rain") return;
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
  }, [selectedPhase, season]);

  // Audio toggle (only for rain)
  const toggleAudio = useCallback(() => {
    if (season !== "rain") return;
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
  }, [preset, season]);

  // Change rain preset
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

  // Season change handler — stop rain audio if switching away from rain
  const handleSeasonChange = useCallback(
    (newSeason: SeasonType) => {
      if (season === "rain" && newSeason !== "rain" && audioEnabled) {
        rainAudio.stop();
        setAudioEnabled(false);
      }
      setSeason(newSeason);
    },
    [season, audioEnabled]
  );

  // ─── Three.js Engine ───────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const cfg = SEASON_CONFIG[season];

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(cfg.fogColor, cfg.fogDensity);

    // Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 75);

    // Renderer
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
      renderer.toneMappingExposure = season === "sunny" ? 1.5 : 1.1;
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(cfg.ambientColor, cfg.ambientIntensity);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(cfg.dirLightColor, cfg.dirLightIntensity);
    dirLight.position.set(20, 80, 40);
    scene.add(dirLight);

    // Lightning Light (rain & storm only)
    const lightningLight = new THREE.PointLight(0xd4f0ff, 0, 450, 1.2);
    lightningLight.position.set(0, 70, 20);
    scene.add(lightningLight);

    // ───────────────────────────────────────────────────────────────
    // RAIN PARTICLES
    // ───────────────────────────────────────────────────────────────
    let rainGeometry: THREE.BufferGeometry | null = null;
    let rainSystem: THREE.LineSegments | null = null;
    let rainMaterial: THREE.LineBasicMaterial | null = null;

    interface RainDrop {
      x: number; y: number; z: number;
      speed: number; length: number; opacity: number;
    }
    const rainDrops: RainDrop[] = [];
    const maxRainDrops = 5600;

    interface SplashData {
      x: number; y: number; z: number;
      radius: number; maxRadius: number; opacity: number; active: boolean;
    }
    const splashes: SplashData[] = [];
    const splashRings: THREE.Mesh[] = [];
    const splashCount = 45;

    if (season === "rain") {
      const positions = new Float32Array(maxRainDrops * 2 * 3);
      const colors = new Float32Array(maxRainDrops * 2 * 3);
      const baseColor = new THREE.Color(0xa9d3ea);
      const deepColor = new THREE.Color(0x579fc4);

      for (let i = 0; i < maxRainDrops; i++) {
        const drop: RainDrop = {
          x: (Math.random() - 0.5) * 220,
          y: (Math.random() - 0.5) * 160 + 10,
          z: (Math.random() - 0.5) * 140,
          speed: 1.8 + Math.random() * 2.4,
          length: 2.2 + Math.random() * 3.4,
          opacity: 0.12 + Math.random() * 0.22,
        };
        rainDrops.push(drop);
        const depthRatio = THREE.MathUtils.clamp((drop.z + 70) / 140, 0, 1);
        const dropColor = deepColor.clone().lerp(baseColor, depthRatio);
        colors[i * 6] = dropColor.r;
        colors[i * 6 + 1] = dropColor.g;
        colors[i * 6 + 2] = dropColor.b;
        colors[i * 6 + 3] = dropColor.r * 1.25;
        colors[i * 6 + 4] = dropColor.g * 1.25;
        colors[i * 6 + 5] = dropColor.b * 1.25;
      }

      rainGeometry = new THREE.BufferGeometry();
      rainGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      rainGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      rainMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.26,
        blending: THREE.AdditiveBlending,
        linewidth: 1.5,
      });

      rainSystem = new THREE.LineSegments(rainGeometry, rainMaterial);
      scene.add(rainSystem);

      // Splashes
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
          x: 0, y: -45, z: 0,
          radius: 0.1, maxRadius: 1.2 + Math.random() * 1.5,
          opacity: 0, active: false,
        });
      }
    }

    // ───────────────────────────────────────────────────────────────
    // SUNNY PARTICLES (floating golden dust / light rays)
    // ───────────────────────────────────────────────────────────────
    let sunParticleSystem: THREE.Points | null = null;
    let sunParticleGeo: THREE.BufferGeometry | null = null;
    const sunParticles: Particle3D[] = [];
    const sunParticleCount = 800;

    // Sun glow sphere
    let sunGlowMesh: THREE.Mesh | null = null;

    // God-ray planes
    const godRays: THREE.Mesh[] = [];

    if (season === "sunny") {
      // Golden floating dust
      const sunPositions = new Float32Array(sunParticleCount * 3);
      const sunSizes = new Float32Array(sunParticleCount);
      const sunColors = new Float32Array(sunParticleCount * 3);
      const dustColors = [
        new THREE.Color(0xffd700),
        new THREE.Color(0xffec8b),
        new THREE.Color(0xfff8dc),
        new THREE.Color(0xffa500),
      ];

      for (let i = 0; i < sunParticleCount; i++) {
        const p: Particle3D = {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 120,
          z: (Math.random() - 0.5) * 140,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -0.05 + Math.random() * 0.15,
          speedZ: (Math.random() - 0.5) * 0.1,
          rotationSpeed: Math.random() * 0.02,
          scale: 0.3 + Math.random() * 1.2,
          opacity: 0.3 + Math.random() * 0.7,
        };
        sunParticles.push(p);
        sunPositions[i * 3] = p.x;
        sunPositions[i * 3 + 1] = p.y;
        sunPositions[i * 3 + 2] = p.z;
        sunSizes[i] = p.scale;
        const c = dustColors[Math.floor(Math.random() * dustColors.length)];
        sunColors[i * 3] = c.r;
        sunColors[i * 3 + 1] = c.g;
        sunColors[i * 3 + 2] = c.b;
      }

      sunParticleGeo = new THREE.BufferGeometry();
      sunParticleGeo.setAttribute("position", new THREE.BufferAttribute(sunPositions, 3));
      sunParticleGeo.setAttribute("size", new THREE.BufferAttribute(sunSizes, 1));
      sunParticleGeo.setAttribute("color", new THREE.BufferAttribute(sunColors, 3));

      // Create circular point texture
      const pointCanvas = document.createElement("canvas");
      pointCanvas.width = 32;
      pointCanvas.height = 32;
      const pCtx = pointCanvas.getContext("2d");
      if (pCtx) {
        const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, "rgba(255,215,0,1)");
        grad.addColorStop(0.4, "rgba(255,236,139,0.6)");
        grad.addColorStop(1, "rgba(255,215,0,0)");
        pCtx.fillStyle = grad;
        pCtx.fillRect(0, 0, 32, 32);
      }
      const pointTexture = new THREE.CanvasTexture(pointCanvas);

      const sunMat = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        map: pointTexture,
        sizeAttenuation: true,
      });

      sunParticleSystem = new THREE.Points(sunParticleGeo, sunMat);
      scene.add(sunParticleSystem);

      // Sun Glow Sphere — large luminous sphere in top-right
      const sunGlowGeo = new THREE.SphereGeometry(12, 32, 32);
      const sunGlowMat = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      sunGlowMesh = new THREE.Mesh(sunGlowGeo, sunGlowMat);
      sunGlowMesh.position.set(55, 50, -40);
      scene.add(sunGlowMesh);

      // Inner brighter core
      const coreMesh = new THREE.Mesh(
        new THREE.SphereGeometry(5, 24, 24),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      coreMesh.position.copy(sunGlowMesh.position);
      scene.add(coreMesh);

      // God Rays — angled translucent planes from sun position
      for (let i = 0; i < 5; i++) {
        const rayGeo = new THREE.PlaneGeometry(8 + Math.random() * 12, 120);
        const rayMat = new THREE.MeshBasicMaterial({
          color: 0xffd700,
          transparent: true,
          opacity: 0.04 + Math.random() * 0.04,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const ray = new THREE.Mesh(rayGeo, rayMat);
        ray.position.set(55 - i * 18, 10, -30 + i * 5);
        ray.rotation.z = -0.3 + Math.random() * 0.15;
        ray.rotation.y = Math.random() * 0.3;
        scene.add(ray);
        godRays.push(ray);
      }
    }

    // ───────────────────────────────────────────────────────────────
    // AUTUMN PARTICLES (falling leaves)
    // ───────────────────────────────────────────────────────────────
    let leafSystem: THREE.Points | null = null;
    let leafGeo: THREE.BufferGeometry | null = null;
    const leafParticles: Particle3D[] = [];
    const leafCount = 600;

    if (season === "autumn") {
      const leafPositions = new Float32Array(leafCount * 3);
      const leafSizes = new Float32Array(leafCount);
      const leafColors = new Float32Array(leafCount * 3);
      const autumnColors = [
        new THREE.Color(0xd4763d), // warm orange
        new THREE.Color(0xc0392b), // crimson red
        new THREE.Color(0xf39c12), // golden yellow
        new THREE.Color(0x8b4513), // saddle brown
        new THREE.Color(0xcd853f), // peru
        new THREE.Color(0xe67e22), // carrot
      ];

      for (let i = 0; i < leafCount; i++) {
        const p: Particle3D = {
          x: (Math.random() - 0.5) * 220,
          y: (Math.random() - 0.5) * 160 + 30,
          z: (Math.random() - 0.5) * 140,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: -(0.3 + Math.random() * 0.6),
          speedZ: (Math.random() - 0.5) * 0.2,
          rotationSpeed: 0.01 + Math.random() * 0.04,
          scale: 1.5 + Math.random() * 3.0,
          opacity: 0.5 + Math.random() * 0.5,
        };
        leafParticles.push(p);
        leafPositions[i * 3] = p.x;
        leafPositions[i * 3 + 1] = p.y;
        leafPositions[i * 3 + 2] = p.z;
        leafSizes[i] = p.scale;
        const c = autumnColors[Math.floor(Math.random() * autumnColors.length)];
        leafColors[i * 3] = c.r;
        leafColors[i * 3 + 1] = c.g;
        leafColors[i * 3 + 2] = c.b;
      }

      leafGeo = new THREE.BufferGeometry();
      leafGeo.setAttribute("position", new THREE.BufferAttribute(leafPositions, 3));
      leafGeo.setAttribute("size", new THREE.BufferAttribute(leafSizes, 1));
      leafGeo.setAttribute("color", new THREE.BufferAttribute(leafColors, 3));

      // Leaf-shaped texture
      const leafCanvas = document.createElement("canvas");
      leafCanvas.width = 32;
      leafCanvas.height = 32;
      const lCtx = leafCanvas.getContext("2d");
      if (lCtx) {
        lCtx.clearRect(0, 0, 32, 32);
        // Draw a leaf shape
        lCtx.fillStyle = "rgba(212,118,61,1)";
        lCtx.beginPath();
        lCtx.moveTo(16, 2);
        lCtx.bezierCurveTo(24, 6, 30, 16, 16, 30);
        lCtx.bezierCurveTo(2, 16, 8, 6, 16, 2);
        lCtx.fill();
        // Leaf vein
        lCtx.strokeStyle = "rgba(139,69,19,0.6)";
        lCtx.lineWidth = 1;
        lCtx.beginPath();
        lCtx.moveTo(16, 4);
        lCtx.lineTo(16, 26);
        lCtx.stroke();
      }
      const leafTexture = new THREE.CanvasTexture(leafCanvas);

      const leafMat = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.NormalBlending,
        depthWrite: false,
        map: leafTexture,
        sizeAttenuation: true,
      });

      leafSystem = new THREE.Points(leafGeo, leafMat);
      scene.add(leafSystem);
    }

    // ───────────────────────────────────────────────────────────────
    // WINTER PARTICLES (snowflakes)
    // ───────────────────────────────────────────────────────────────
    let snowSystem: THREE.Points | null = null;
    let snowGeo: THREE.BufferGeometry | null = null;
    const snowParticles: Particle3D[] = [];
    const snowCount = 1200;

    if (season === "winter") {
      const snowPositions = new Float32Array(snowCount * 3);
      const snowSizes = new Float32Array(snowCount);
      const snowColors = new Float32Array(snowCount * 3);
      const winterColors = [
        new THREE.Color(0xffffff),
        new THREE.Color(0xe8f0ff),
        new THREE.Color(0xd0e4ff),
        new THREE.Color(0xb8d4f0),
      ];

      for (let i = 0; i < snowCount; i++) {
        const p: Particle3D = {
          x: (Math.random() - 0.5) * 220,
          y: (Math.random() - 0.5) * 160 + 20,
          z: (Math.random() - 0.5) * 140,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: -(0.2 + Math.random() * 0.4),
          speedZ: (Math.random() - 0.5) * 0.1,
          rotationSpeed: 0.005 + Math.random() * 0.02,
          scale: 0.5 + Math.random() * 2.0,
          opacity: 0.5 + Math.random() * 0.5,
        };
        snowParticles.push(p);
        snowPositions[i * 3] = p.x;
        snowPositions[i * 3 + 1] = p.y;
        snowPositions[i * 3 + 2] = p.z;
        snowSizes[i] = p.scale;
        const c = winterColors[Math.floor(Math.random() * winterColors.length)];
        snowColors[i * 3] = c.r;
        snowColors[i * 3 + 1] = c.g;
        snowColors[i * 3 + 2] = c.b;
      }

      snowGeo = new THREE.BufferGeometry();
      snowGeo.setAttribute("position", new THREE.BufferAttribute(snowPositions, 3));
      snowGeo.setAttribute("size", new THREE.BufferAttribute(snowSizes, 1));
      snowGeo.setAttribute("color", new THREE.BufferAttribute(snowColors, 3));

      // Snowflake texture
      const snowCanvas = document.createElement("canvas");
      snowCanvas.width = 32;
      snowCanvas.height = 32;
      const sCtx = snowCanvas.getContext("2d");
      if (sCtx) {
        const grad = sCtx.createRadialGradient(16, 16, 0, 16, 16, 14);
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(0.3, "rgba(220,235,255,0.8)");
        grad.addColorStop(0.6, "rgba(200,220,255,0.4)");
        grad.addColorStop(1, "rgba(180,210,255,0)");
        sCtx.fillStyle = grad;
        sCtx.fillRect(0, 0, 32, 32);
        // Cross pattern for snowflake
        sCtx.strokeStyle = "rgba(255,255,255,0.6)";
        sCtx.lineWidth = 0.8;
        for (let a = 0; a < 6; a++) {
          sCtx.save();
          sCtx.translate(16, 16);
          sCtx.rotate((a * Math.PI) / 3);
          sCtx.beginPath();
          sCtx.moveTo(0, -12);
          sCtx.lineTo(0, 12);
          sCtx.stroke();
          sCtx.restore();
        }
      }
      const snowTexture = new THREE.CanvasTexture(snowCanvas);

      const snowMat = new THREE.PointsMaterial({
        size: 2.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        map: snowTexture,
        sizeAttenuation: true,
      });

      snowSystem = new THREE.Points(snowGeo, snowMat);
      scene.add(snowSystem);
    }

    // ───────────────────────────────────────────────────────────────
    // CLOUD / MIST LAYERS (all seasons, with color variations)
    // ───────────────────────────────────────────────────────────────
    const cloudParticles: THREE.Mesh[] = [];
    const cloudCount = season === "sunny" ? 8 : season === "winter" ? 14 : 18;
    const cloudGeo = new THREE.PlaneGeometry(60, 40);

    const cloudCanvas = document.createElement("canvas");
    cloudCanvas.width = 128;
    cloudCanvas.height = 128;
    const cloudCtx = cloudCanvas.getContext("2d");
    if (cloudCtx) {
      const grad = cloudCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      if (season === "sunny") {
        grad.addColorStop(0, "rgba(255,255,255,0.15)");
        grad.addColorStop(0.5, "rgba(200,230,255,0.06)");
        grad.addColorStop(1, "rgba(135,206,235,0)");
      } else if (season === "autumn") {
        grad.addColorStop(0, "rgba(210,150,80,0.2)");
        grad.addColorStop(0.5, "rgba(180,120,60,0.08)");
        grad.addColorStop(1, "rgba(139,69,19,0)");
      } else if (season === "winter") {
        grad.addColorStop(0, "rgba(200,220,240,0.25)");
        grad.addColorStop(0.5, "rgba(160,190,220,0.1)");
        grad.addColorStop(1, "rgba(100,150,200,0)");
      } else {
        grad.addColorStop(0, "rgba(180,215,205,0.28)");
        grad.addColorStop(0.5, "rgba(120,175,165,0.12)");
        grad.addColorStop(1, "rgba(80,130,120,0)");
      }
      cloudCtx.fillStyle = grad;
      cloudCtx.fillRect(0, 0, 128, 128);
    }
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);

    const cloudMaterial = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: season === "sunny" ? 0.2 : 0.35,
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

    // ─── Mouse Parallax ──────────────────────────────────────────
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // ─── Lightning (rain only) ───────────────────────────────────
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

    // ─── Animation Loop ──────────────────────────────────────────
    let animationFrameId: number;
    let lastFrameTime = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((time - lastFrameTime) / 1000, 0.1);
      lastFrameTime = time;

      // Mouse parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;
      camera.position.x = currentMouseX * 12;
      camera.position.y = -currentMouseY * 8;
      camera.lookAt(0, 0, 0);

      // Wind
      const windSpeed = windEffect
        ? season === "rain"
          ? preset === "storm" ? 22 : preset === "heavy" ? 14 : preset === "active" ? 9 : 4
          : season === "autumn" ? 8
          : season === "winter" ? 5
          : 3
        : 0;
      const windX = (windSpeed / 30) * Math.sin(time * 0.0006) + windSpeed / 50;

      // ── RAIN ANIMATION ──
      if (season === "rain" && rainGeometry) {
        // Lightning
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
              lightningLight.intensity = THREE.MathUtils.lerp(0, 4.2, flashTimer / 0.06);
              if (flashTimer > 0.06) { flashStage = 2; flashTimer = 0; }
            } else if (flashStage === 2) {
              lightningLight.intensity = THREE.MathUtils.lerp(4.2, 0.4, flashTimer / 0.05);
              if (flashTimer > 0.05) { flashStage = 3; flashTimer = 0; }
            } else if (flashStage === 3) {
              lightningLight.intensity = THREE.MathUtils.lerp(0.4, 3.2, flashTimer / 0.08);
              if (flashTimer > 0.08) { flashStage = 4; flashTimer = 0; }
            } else if (flashStage === 4) {
              lightningLight.intensity = THREE.MathUtils.lerp(3.2, 0, flashTimer / 0.35);
              if (flashTimer > 0.35) { lightningLight.intensity = 0; isFlashing = false; }
            }
          }
        } else {
          lightningLight.intensity = 0;
        }

        const getDropCount = (p: WeatherPreset) => {
          switch (p) {
            case "drizzle": return 1400;
            case "active": return 2800;
            case "heavy": return 4200;
            case "storm": return 5600;
          }
        };
        const currentDropCount = getDropCount(preset);
        const speedMul = preset === "storm" ? 1.6 : preset === "heavy" ? 1.3 : preset === "drizzle" ? 0.75 : 1.0;

        const posAttr = rainGeometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < maxRainDrops; i++) {
          const drop = rainDrops[i];
          if (i < currentDropCount) {
            drop.y -= drop.speed * speedMul * delta * 60;
            drop.x += windX * delta * 60;
            if (drop.y < -45) {
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
              drop.y = 80 + Math.random() * 20;
              drop.x = (Math.random() - 0.5) * 220;
              drop.z = (Math.random() - 0.5) * 140;
            }
            posArray[i * 6] = drop.x - windX * 0.45;
            posArray[i * 6 + 1] = drop.y + drop.length * (preset === "storm" ? 1.4 : 1.0);
            posArray[i * 6 + 2] = drop.z;
            posArray[i * 6 + 3] = drop.x;
            posArray[i * 6 + 4] = drop.y;
            posArray[i * 6 + 5] = drop.z;
          } else {
            posArray[i * 6] = 0;     posArray[i * 6 + 1] = -999; posArray[i * 6 + 2] = 0;
            posArray[i * 6 + 3] = 0; posArray[i * 6 + 4] = -999; posArray[i * 6 + 5] = 0;
          }
        }
        posAttr.needsUpdate = true;

        // Splashes
        for (let i = 0; i < splashCount; i++) {
          const s = splashes[i];
          const mesh = splashRings[i];
          if (s.active) {
            s.radius += 1.8 * delta;
            s.opacity -= 1.6 * delta;
            mesh.position.set(s.x, s.y, s.z);
            mesh.scale.set(s.radius, s.radius, 1);
            (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(s.opacity, 0);
            if (s.opacity <= 0) s.active = false;
          } else {
            (mesh.material as THREE.MeshBasicMaterial).opacity = 0;
          }
        }
      }

      // ── SUNNY ANIMATION ──
      if (season === "sunny" && sunParticleGeo) {
        const sunPosAttr = sunParticleGeo.attributes.position as THREE.BufferAttribute;
        const sunPosArr = sunPosAttr.array as Float32Array;

        for (let i = 0; i < sunParticleCount; i++) {
          const p = sunParticles[i];
          // Gentle floating drift
          p.x += (p.speedX + windX * 0.3) * delta * 30;
          p.y += Math.sin(time * 0.001 + i * 0.5) * 0.02 + p.speedY * delta * 10;
          p.z += p.speedZ * delta * 10;

          // Wrap around
          if (p.x > 110) p.x = -110;
          if (p.x < -110) p.x = 110;
          if (p.y < -70) {
            p.y = 70;
            p.x = (Math.random() - 0.5) * 200;
          }
          if (p.y > 70) p.y = -70;

          sunPosArr[i * 3] = p.x;
          sunPosArr[i * 3 + 1] = p.y;
          sunPosArr[i * 3 + 2] = p.z;
        }
        sunPosAttr.needsUpdate = true;

        // Animate sun glow pulsation
        if (sunGlowMesh) {
          const pulse = 1.0 + Math.sin(time * 0.0015) * 0.1;
          sunGlowMesh.scale.setScalar(pulse);
          (sunGlowMesh.material as THREE.MeshBasicMaterial).opacity = 0.25 + Math.sin(time * 0.001) * 0.08;
        }

        // Animate god rays subtle sway
        for (let i = 0; i < godRays.length; i++) {
          const ray = godRays[i];
          (ray.material as THREE.MeshBasicMaterial).opacity =
            0.03 + Math.sin(time * 0.0008 + i * 1.2) * 0.025;
          ray.rotation.z = -0.3 + Math.sin(time * 0.0003 + i) * 0.03;
        }
      }

      // ── AUTUMN ANIMATION ──
      if (season === "autumn" && leafGeo) {
        const leafPosAttr = leafGeo.attributes.position as THREE.BufferAttribute;
        const leafPosArr = leafPosAttr.array as Float32Array;

        for (let i = 0; i < leafCount; i++) {
          const p = leafParticles[i];
          // Swaying + drifting fall
          p.x += (p.speedX + windX * 0.5) * delta * 25;
          p.y += p.speedY * delta * 30;
          // Gentle sway
          p.x += Math.sin(time * 0.001 + i * 0.3) * 0.15 * delta * 30;
          p.z += Math.cos(time * 0.0008 + i * 0.7) * 0.05 * delta * 20;

          // Reset when fallen
          if (p.y < -50) {
            p.y = 80 + Math.random() * 20;
            p.x = (Math.random() - 0.5) * 220;
            p.z = (Math.random() - 0.5) * 140;
          }
          if (p.x > 120) p.x = -120;
          if (p.x < -120) p.x = 120;

          leafPosArr[i * 3] = p.x;
          leafPosArr[i * 3 + 1] = p.y;
          leafPosArr[i * 3 + 2] = p.z;
        }
        leafPosAttr.needsUpdate = true;
      }

      // ── WINTER ANIMATION ──
      if (season === "winter" && snowGeo) {
        const snowPosAttr = snowGeo.attributes.position as THREE.BufferAttribute;
        const snowPosArr = snowPosAttr.array as Float32Array;

        for (let i = 0; i < snowCount; i++) {
          const p = snowParticles[i];
          // Gentle drift downward with wind sway
          p.x += (p.speedX + windX * 0.25) * delta * 20;
          p.y += p.speedY * delta * 25;
          p.z += p.speedZ * delta * 10;
          // Swirl effect
          p.x += Math.sin(time * 0.0005 + i * 0.2) * 0.1 * delta * 20;

          // Reset when fallen
          if (p.y < -50) {
            p.y = 80 + Math.random() * 20;
            p.x = (Math.random() - 0.5) * 220;
            p.z = (Math.random() - 0.5) * 140;
          }
          if (p.x > 120) p.x = -120;
          if (p.x < -120) p.x = 120;

          snowPosArr[i * 3] = p.x;
          snowPosArr[i * 3 + 1] = p.y;
          snowPosArr[i * 3 + 2] = p.z;
        }
        snowPosAttr.needsUpdate = true;
      }

      // Drift clouds (all seasons)
      for (let i = 0; i < cloudCount; i++) {
        const cloud = cloudParticles[i];
        cloud.position.x += (windX * 0.15 + 0.05) * delta * 20;
        cloud.rotation.z += 0.0003;
        if (cloud.position.x > 120) cloud.position.x = -120;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize
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

      // Dispose everything
      rainGeometry?.dispose();
      rainMaterial?.dispose();
      sunParticleGeo?.dispose();
      sunParticleSystem?.material && (sunParticleSystem.material as THREE.Material).dispose();
      leafGeo?.dispose();
      leafSystem?.material && (leafSystem.material as THREE.Material).dispose();
      snowGeo?.dispose();
      snowSystem?.material && (snowSystem.material as THREE.Material).dispose();
      cloudGeo.dispose();
      cloudTexture.dispose();
      cloudMaterial.dispose();
      splashRings.forEach((r) => (r.material as THREE.Material).dispose());
      godRays.forEach((r) => {
        (r.material as THREE.Material).dispose();
        r.geometry.dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [season, preset, lightningEnabled, windEffect]);

  // ─── Season icon component ────────────────────────────────────
  const SeasonIcon = config.icon;

  return (
    <>
      {/* 1. Fullscreen 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
        style={{ background: config.bgGradient }}
      >
        {/* Organic lighting washes */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at top, ${config.accentGlow} 0%, transparent 65%)`,
          }}
        />
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${config.orb1}33` }}
        />
        <div
          className="absolute top-1/3 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${config.orb2}40` }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[600px] h-[350px] blur-3xl"
          style={{ backgroundColor: `${config.orb3}26` }}
        />
      </div>

      {/* 2. Floating Atmosphere Control Panel */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {isWidgetOpen && (
          <div
            className="w-72 sm:w-80 p-4 rounded-2xl shadow-2xl backdrop-blur-xl text-white space-y-3.5 animate-in fade-in slide-in-from-bottom-3 duration-200"
            style={{
              background: "rgba(12, 20, 30, 0.92)",
              border: `1px solid ${accent.border}50`,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between pb-2.5"
              style={{ borderBottom: `1px solid ${accent.border}40` }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: accent.bg }}
                >
                  <SeasonIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: accent.text }}
                  >
                    {language === "hi"
                      ? "3D वायुमंडलीय सिमुलेशन"
                      : "3D Atmosphere Simulation"}
                  </div>
                  <div className="text-[10px] text-gray-300">
                    WebGL Hardware Accelerated
                  </div>
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

            {/* Season Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
                {language === "hi" ? "मौसम चुनें" : "Season / Weather"}
              </label>
              <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-black/30 border border-white/10">
                {(["rain", "sunny", "autumn", "winter"] as const).map((s) => {
                  const isActive = season === s;
                  const sConfig = SEASON_CONFIG[s];
                  const SIcon = sConfig.icon;
                  const sAccent = SEASON_ACCENT[s];
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSeasonChange(s)}
                      className="flex flex-col items-center gap-1 px-1.5 py-2 rounded-lg text-[10px] font-bold transition-all capitalize cursor-pointer"
                      style={
                        isActive
                          ? {
                              backgroundColor: sAccent.bg,
                              color: "white",
                              boxShadow: `0 0 12px ${sAccent.glow}`,
                            }
                          : { color: "#9CA3AF" }
                      }
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.color = "white";
                          (e.currentTarget as HTMLElement).style.backgroundColor =
                            "rgba(255,255,255,0.08)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.color = "#9CA3AF";
                          (e.currentTarget as HTMLElement).style.backgroundColor =
                            "transparent";
                        }
                      }}
                    >
                      <SIcon className="w-4 h-4" />
                      <span>
                        {language === "hi" ? sConfig.labelHi.split(" ")[0] : sConfig.label.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rain Intensity Presets (only for rain season) */}
            {season === "rain" && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
                  {language === "hi" ? "वर्षा तीव्रता" : "Rainfall Intensity"}
                </label>
                <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-black/30 border border-white/10">
                  {(["drizzle", "active", "heavy", "storm"] as const).map(
                    (p) => {
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
                              ? "bg-[#176B4D] text-white shadow-md"
                              : "text-gray-300 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {labels[p]}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* Atmosphere Toggles */}
            <div
              className="grid gap-2 pt-1"
              style={{
                gridTemplateColumns: season === "rain" ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
                borderTop: `1px solid ${accent.border}30`,
              }}
            >
              {/* Audio (rain only) */}
              {season === "rain" && (
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer"
                  style={
                    audioEnabled
                      ? {
                          backgroundColor: `${accent.bg}99`,
                          borderColor: accent.border,
                          color: "white",
                        }
                      : {
                          backgroundColor: "rgba(255,255,255,0.05)",
                          borderColor: "rgba(255,255,255,0.1)",
                          color: "#9CA3AF",
                        }
                  }
                  title="Procedural Rain Sound"
                >
                  {audioEnabled ? (
                    <Volume2
                      className="w-4 h-4 animate-pulse"
                      style={{ color: accent.text }}
                    />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                  <span className="text-[10px] font-semibold mt-1">
                    {audioEnabled ? "Audio On" : "Muted"}
                  </span>
                </button>
              )}

              {/* Lightning (rain only) */}
              {season === "rain" && (
                <button
                  type="button"
                  onClick={() => setLightningEnabled(!lightningEnabled)}
                  className="flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer"
                  style={
                    lightningEnabled
                      ? {
                          backgroundColor: `${accent.bg}99`,
                          borderColor: accent.border,
                          color: "white",
                        }
                      : {
                          backgroundColor: "rgba(255,255,255,0.05)",
                          borderColor: "rgba(255,255,255,0.1)",
                          color: "#9CA3AF",
                        }
                  }
                  title="Toggle Lightning"
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
              )}

              {/* Wind (all seasons) */}
              <button
                type="button"
                onClick={() => setWindEffect(!windEffect)}
                className="flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer"
                style={
                  windEffect
                    ? {
                        backgroundColor: `${accent.bg}99`,
                        borderColor: accent.border,
                        color: "white",
                      }
                    : {
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.1)",
                        color: "#9CA3AF",
                      }
                }
                title="Toggle Wind"
              >
                <Wind
                  className="w-4 h-4"
                  style={{ color: windEffect ? accent.text : undefined }}
                />
                <span className="text-[10px] font-semibold mt-1">
                  {windEffect
                    ? language === "hi"
                      ? "हवा चालू"
                      : "Wind Active"
                    : language === "hi"
                    ? "शांत"
                    : "Calm"}
                </span>
              </button>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between text-[10px] text-gray-300 pt-1">
              <span>
                {language === "hi" ? "मौसम" : "Season"}:{" "}
                <strong style={{ color: accent.text }} className="uppercase">
                  {language === "hi" ? config.labelHi : config.label}
                </strong>
              </span>
              <span className="flex items-center gap-1" style={{ color: accent.text }}>
                <Sparkles className="w-3 h-3" /> 3D Active
              </span>
            </div>
          </div>
        )}

        {/* Floating Trigger Pill */}
        <button
          type="button"
          onClick={() => setIsWidgetOpen(!isWidgetOpen)}
          className="group inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full text-white shadow-xl backdrop-blur-md transition-all cursor-pointer"
          style={{
            background: "rgba(12, 20, 30, 0.9)",
            border: `1px solid ${accent.border}60`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = accent.text;
            (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = `${accent.border}60`;
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
          title="Customize 3D Atmosphere"
        >
          <div className="relative flex items-center justify-center">
            <span
              className="animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-60"
              style={{ backgroundColor: accent.text }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: accent.text }}
            />
          </div>
          <SeasonIcon className="w-4 h-4" style={{ color: accent.text }} />
          <span className="text-xs font-bold tracking-wide">
            {config.label.split(" ")[0]}:{" "}
            <span style={{ color: accent.text }} className="capitalize">
              {season === "rain" ? preset : "Active"}
            </span>
          </span>
          {season === "rain" && audioEnabled && (
            <Volume2
              className="w-3.5 h-3.5 animate-pulse"
              style={{ color: accent.text }}
            />
          )}
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

export default SeasonalBackground3D;
