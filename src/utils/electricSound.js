/**
 * Web Audio Engine for DreamLive Electric Creator Network
 * Synthesizes charging surges, traveling lightning crackles, and impact pulses.
 * Includes audio-unlock system on user gesture and anti-spam state tracking.
 */

class ElectricSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.masterGain = null;
    this.unlocked = false;
    this.triggeredStates = new Set();
    this.lastPlayTime = 0;

    // Auto-bind unlock on first user gesture
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.unlockAudio();
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('wheel', unlock);
      };
      window.addEventListener('pointerdown', unlock, { once: true, passive: true });
      window.addEventListener('keydown', unlock, { once: true, passive: true });
      window.addEventListener('wheel', unlock, { once: true, passive: true });
    }
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn('Web Audio not available:', e);
    }
  }

  unlockAudio() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.unlocked = true;
  }

  setMuted(muted) {
    this.isMuted = muted;
    this.unlockAudio();
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.22, this.ctx.currentTime, 0.05);
    }
  }

  toggleMute() {
    this.unlockAudio();
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  /**
   * Tower activation sound with anti-spam check
   */
  playTowerActivation(towerIndex = 0) {
    const key = `tower-${towerIndex}`;
    if (this.triggeredStates.has(key)) return;
    this.triggeredStates.add(key);

    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    if (now - this.lastPlayTime < 0.12) return;
    this.lastPlayTime = now;

    const baseFreq = 160 + towerIndex * 30;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.5, now + 0.4);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, now);
    filter.frequency.exponentialRampToValueAtTime(2800, now + 0.35);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  /**
   * Traveling lightning crackle with anti-spam
   */
  playLightningArc(arcId = 0) {
    const key = `arc-${arcId}`;
    if (this.triggeredStates.has(key)) return;
    this.triggeredStates.add(key);

    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    if (now - this.lastPlayTime < 0.12) return;
    this.lastPlayTime = now;

    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(3800, now + 0.18);
    filter.Q.setValueAtTime(3.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.32);
  }

  /**
   * Final crescendo surge when all towers connect
   */
  playFinalNetworkSurge() {
    const key = 'final-surge';
    if (this.triggeredStates.has(key)) return;
    this.triggeredStates.add(key);

    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.6);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, now);
    filter.frequency.exponentialRampToValueAtTime(3500, now + 0.5);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.0);
  }

  resetTriggersOnReverse(progress) {
    if (progress < 0.05) {
      this.triggeredStates.clear();
    }
  }
}

export const electricAudio = new ElectricSoundEngine();
export default electricAudio;
