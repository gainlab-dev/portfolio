/**
 * Synthesizes a premium, soft UI scroll click sound effect programmatically
 * using a shared, user-unlocked Web Audio API context.
 */

let sharedCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (sharedCtx) return sharedCtx;

  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;

  sharedCtx = new AudioContextClass();
  return sharedCtx;
}

/**
 * Resumes and unlocks the Web Audio API context. Must be invoked from a direct
 * user interaction callback (like clicking the speaker toggle).
 */
export function unlockAudio() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  
  // Play a brief silent note to force-unlock WebKit's audio engine on iOS
  if (ctx) {
    try {
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch (e) {
      // Ignore errors
    }
  }
}

/**
 * Plays the scroll click sound effect using the shared, unlocked context.
 */
export function playScrollTick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // On mobile, if the audio context is still suspended, do not attempt to play
    if (ctx.state === "suspended") {
      return;
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    
    // Short pitch sweep from 350Hz down to 100Hz
    osc.frequency.setValueAtTime(350, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);

    // Short exponential volume decay envelope (total duration 80ms)
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // Fail silently
  }
}
