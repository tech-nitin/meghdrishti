"use client";

/**
 * Procedural Rain & Thunder Synthesizer using Web Audio API
 * Generates natural, continuous rain and occasional distant thunder
 * without requiring any external audio files.
 */
class RainAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private gainNode: GainNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private masterVolume: number = 0.35;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  /**
   * Generates a 5-second seamless buffer of filtered pink/brown noise
   * for authentic gentle rain texture.
   */
  private createRainNoiseBuffer(): AudioBuffer | null {
    if (!this.ctx) return null;
    const sampleRate = this.ctx.sampleRate;
    const duration = 5;
    const bufferSize = sampleRate * duration;
    const buffer = this.ctx.createBuffer(2, bufferSize, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise filter approximation
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;
        // Scale and add soft random droplet transients
        const dropletClick = Math.random() < 0.003 ? (Math.random() - 0.5) * 0.25 : 0;
        data[i] = pink * 0.08 + dropletClick;
      }
    }
    return buffer;
  }

  public async start(): Promise<boolean> {
    try {
      this.initContext();
      if (!this.ctx) return false;

      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }

      if (this.isPlaying) return true;

      const buffer = this.createRainNoiseBuffer();
      if (!buffer) return false;

      this.noiseSource = this.ctx.createBufferSource();
      this.noiseSource.buffer = buffer;
      this.noiseSource.loop = true;

      // Filter: warm, earthy monsoon low-pass
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = "lowpass";
      this.filterNode.frequency.setValueAtTime(1400, this.ctx.currentTime);

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(this.masterVolume, this.ctx.currentTime + 1.2);

      this.noiseSource.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.noiseSource.start();
      this.isPlaying = true;
      return true;
    } catch {
      return false;
    }
  }

  public stop(): void {
    if (!this.ctx || !this.isPlaying) return;
    try {
      if (this.gainNode) {
        this.gainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
        setTimeout(() => {
          this.noiseSource?.stop();
          this.noiseSource?.disconnect();
          this.isPlaying = false;
        }, 650);
      } else {
        this.noiseSource?.stop();
        this.isPlaying = false;
      }
    } catch {
      this.isPlaying = false;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setIntensity(intensity: "drizzle" | "moderate" | "heavy" | "storm"): void {
    if (!this.ctx || !this.filterNode || !this.gainNode) return;
    const now = this.ctx.currentTime;
    switch (intensity) {
      case "drizzle":
        this.filterNode.frequency.setTargetAtTime(900, now, 0.5);
        this.gainNode.gain.setTargetAtTime(this.masterVolume * 0.6, now, 0.5);
        break;
      case "moderate":
        this.filterNode.frequency.setTargetAtTime(1400, now, 0.5);
        this.gainNode.gain.setTargetAtTime(this.masterVolume, now, 0.5);
        break;
      case "heavy":
        this.filterNode.frequency.setTargetAtTime(2200, now, 0.5);
        this.gainNode.gain.setTargetAtTime(this.masterVolume * 1.3, now, 0.5);
        break;
      case "storm":
        this.filterNode.frequency.setTargetAtTime(2800, now, 0.5);
        this.gainNode.gain.setTargetAtTime(this.masterVolume * 1.6, now, 0.5);
        break;
    }
  }

  /**
   * Distant procedural thunder rumble triggered on lightning flash
   */
  public triggerThunder(): void {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      // Low-frequency rumble oscillator
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      const thunderFilter = this.ctx.createBiquadFilter();

      thunderFilter.type = "lowpass";
      thunderFilter.frequency.setValueAtTime(130, now);

      osc.type = "sine";
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 1.8);

      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(0.25, now + 0.3);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      osc.connect(thunderFilter);
      thunderFilter.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.6);
    } catch {
      // Ignore audio glitches safely
    }
  }
}

export const rainAudio = new RainAudioSynthesizer();
