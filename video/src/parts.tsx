import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, GRAD} from './theme';

/** Fundo padrao: Abyss + a mesma malha de blueprint da landing page. */
export const Backdrop: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{backgroundColor: C.abyss, fontFamily: FONT}}>
    <AbsoluteFill
      style={{
        backgroundImage: `linear-gradient(90deg, ${C.line} 1px, transparent 1px), linear-gradient(${C.line} 1px, transparent 1px)`,
        backgroundSize: '96px 96px',
        opacity: 0.55,
      }}
    />
    <AbsoluteFill
      style={{
        background: `radial-gradient(70% 55% at 50% 45%, rgba(2,79,250,.18) 0%, transparent 70%)`,
      }}
    />
    {children}
  </AbsoluteFill>
);

/** Etiqueta tecnica — mesmo tratamento do .tech-label do site. */
export const TechLabel: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
}> = ({children, color = C.faintOnDark, size = 22}) => (
  <span
    style={{
      fontSize: size,
      fontWeight: 600,
      letterSpacing: '.22em',
      textTransform: 'uppercase',
      color,
    }}
  >
    {children}
  </span>
);

/** Ponto do gradiente da marca — as duas primarias sempre juntas. */
export const Dot: React.FC<{size?: number}> = ({size = 10}) => (
  <span
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      borderRadius: 999,
      background: GRAD,
      flexShrink: 0,
    }}
  />
);

/** Sobe + aparece, com o easing do site. */
export const Rise: React.FC<{
  children: React.ReactNode;
  start: number;
  dur?: number;
  y?: number;
  style?: React.CSSProperties;
}> = ({children, start, dur = 18, y = 28, style}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  return (
    <div style={{opacity: p, transform: `translateY(${(1 - p) * y}px)`, ...style}}>
      {children}
    </div>
  );
};

/** Escreve o texto caractere a caractere, com cursor. */
export const Typed: React.FC<{
  text: string;
  start: number;
  cps?: number;
  style?: React.CSSProperties;
  cursor?: boolean;
}> = ({text, start, cps = 26, style, cursor = true}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - start) / 30;
  const n = Math.min(text.length, Math.floor(elapsed * cps));
  const done = n >= text.length;
  const blink = Math.floor(frame / 8) % 2 === 0;
  return (
    <span style={style}>
      {text.slice(0, n)}
      {cursor && frame >= start && (!done || blink) ? (
        <span style={{color: C.teal, fontWeight: 400}}>▌</span>
      ) : null}
    </span>
  );
};

/**
 * O spark da Anthropic, desenhado a partir do mesmo contorno vetorizado que a
 * landing page usa. E um asterisco de 12 bracos — nao e a interface da Anthropic,
 * e a marca grafica deles aplicada como acento, igual no hero.
 */
export const Spark: React.FC<{size: number; rotate: number; opacity?: number}> = ({
  size,
  rotate,
  opacity = 1,
}) => {
  const arms = 12;
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" style={{opacity}}>
      <g transform={`rotate(${rotate})`}>
        {Array.from({length: arms}).map((_, i) => (
          <rect
            key={i}
            x={-3.4}
            y={-46}
            width={6.8}
            height={46}
            rx={3.4}
            fill={C.clay}
            transform={`rotate(${(360 / arms) * i})`}
          />
        ))}
        <circle r={9} fill={C.clay} />
      </g>
    </svg>
  );
};
