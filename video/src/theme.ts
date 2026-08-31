/**
 * Tokens da marca Data Group — os mesmos da landing page.
 * Fonte: clientes/grupo-data/marca/design-guide.md
 */
export const C = {
  abyss: '#1D1D1B',
  abyssDeep: '#141412',
  blue: '#024FFA',
  teal: '#35E8C8',
  navy: '#1E1F5E',
  clay: '#D97757', // cor da Anthropic — só no spark
  white: '#FFFFFF',
  mutedOnDark: 'rgba(255,255,255,.55)',
  faintOnDark: 'rgba(255,255,255,.28)',
  line: 'rgba(255,255,255,.10)',
};

export const GRAD = `linear-gradient(135deg, ${C.blue} 0%, ${C.teal} 100%)`;

export const FONT = "'General Sans', ui-sans-serif, system-ui, sans-serif";

export const FPS = 30;

/** easing do site: cubic-bezier(.16,1,.3,1) */
export const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
