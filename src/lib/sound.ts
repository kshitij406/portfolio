/**
 * Synthesized UI sound, no audio files, just oscillator/noise envelopes.
 *
 * Two independent volume gates:
 * - `sound.*` (terminal, RetroWindow): off by default, opt in only via the
 *   terminal's `unmute` command. Nobody stumbles into it.
 * - `tileSound.*` (the Off the Clock tile effects): always on. Those tiles
 *   are a visible, public interaction, not a hidden easter egg, so clicking
 *   one should just make a sound.
 */

const STORAGE_KEY = 'kj-sound';
let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function isSoundOn(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(STORAGE_KEY) === 'on';
}

export function setSoundOn(on: boolean) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
}

type Tone = { freq: number; duration: number; type?: OscillatorType; gain?: number };

function playTone({ freq, duration, type = 'square', gain = 0.05 }: Tone) {
  const audio = getContext();
  if (!audio) return;

  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, audio.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
  osc.connect(g).connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + duration);
}

type Noise = { duration: number; gain?: number; freq?: number; q?: number };

/** A filtered noise swell, the building block for wave/wind/crackle/static. */
function playNoise({ duration, gain = 0.08, freq = 600, q = 0.6 }: Noise) {
  const audio = getContext();
  if (!audio) return;

  const bufferSize = Math.max(1, Math.floor(audio.sampleRate * duration));
  const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const source = audio.createBufferSource();
  source.buffer = buffer;

  const filter = audio.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = freq;
  filter.Q.value = q;

  const g = audio.createGain();
  g.gain.setValueAtTime(0.0001, audio.currentTime);
  g.gain.exponentialRampToValueAtTime(gain, audio.currentTime + duration * 0.35);
  g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);

  source.connect(filter).connect(g).connect(audio.destination);
  source.start();
  source.stop(audio.currentTime + duration);
}

function beep(tone: Tone) {
  if (!isSoundOn()) return;
  playTone(tone);
}

export const sound = {
  tick: () => beep({ freq: 740, duration: 0.05 }),
  open: () => beep({ freq: 220, duration: 0.12, gain: 0.06 }),
  close: () => beep({ freq: 160, duration: 0.1 }),
  error: () => beep({ freq: 110, duration: 0.18, type: 'sawtooth' }),
};

export const tileSound = {
  /** Underwater: a filtered noise swell, low-passed like a wave breaking. */
  flood: () => playNoise({ duration: 1.3, gain: 0.1, freq: 500, q: 0.5 }),
  /** Souls-likes: a couple of short crackle bursts. */
  bonfire: () => {
    playNoise({ duration: 0.3, gain: 0.06, freq: 1800, q: 1.4 });
    setTimeout(() => playNoise({ duration: 0.22, gain: 0.05, freq: 2400, q: 1.6 }), 180);
  },
  /** Fedora/KDE: a quick keyboard-ish tick train. */
  reinstall: () => {
    [0, 90, 170, 260].forEach((delay) => {
      setTimeout(() => playTone({ freq: 1800 + Math.random() * 400, duration: 0.03, gain: 0.03 }), delay);
    });
  },
  /** Robots: a two-tone alarm blip. */
  estop: () => {
    playTone({ freq: 700, duration: 0.14, type: 'square', gain: 0.06 });
    setTimeout(() => playTone({ freq: 500, duration: 0.16, type: 'square', gain: 0.06 }), 150);
  },
  /** Films: a soft shutter-ish click-clack for the bars sliding in. */
  letterbox: () => {
    playTone({ freq: 300, duration: 0.05, type: 'square', gain: 0.05 });
    setTimeout(() => playTone({ freq: 220, duration: 0.05, type: 'square', gain: 0.05 }), 90);
  },
  /** Philosophy and music: a soft major-ish chord. */
  waveform: () => {
    [440, 554, 659].forEach((freq) => playTone({ freq, duration: 0.9, type: 'sine', gain: 0.035 }));
  },
};
