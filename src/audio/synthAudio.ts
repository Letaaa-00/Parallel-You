/**
 * Zero-dependency Web Audio synthesizer for ambient twilight chime sounds.
 * Muted by default; enabled only when the user toggles sound on.
 */
class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.initCtx();
      this.playSelect(0); // Welcome chime
    }
    return this.enabled;
  }

  public playHover() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(587.33, now + 0.08); // A4 -> D5

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  public playSelect(index = 0) {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    // Harmonic celestial triad based on choice index
    const scale = [523.25, 587.33, 659.25, 783.99, 880.0]; // C5, D5, E5, G5, A5
    const baseFreq = scale[index % scale.length];

    [0, 1].forEach((layer) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = layer === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq * (layer === 0 ? 1 : 1.5), now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * (layer === 0 ? 1.05 : 1.55), now + 0.4);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    });
  }

  public playPortalSwoosh() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.6);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.65);
  }
}

export const soundManager = new SoundManager();
