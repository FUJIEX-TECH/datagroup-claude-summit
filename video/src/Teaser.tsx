import React from 'react';
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {C, FONT, GRAD} from './theme';
import {Backdrop, Dot, Rise, Spark, TechLabel, Typed} from './parts';
import {useBrandFont} from './font';

const A = 96;   // abertura
const B = 186;  // sessao de trabalho
const D = 186;  // claude code
const E = 132;  // fecho
export const TEASER_DURATION = A + B + D + E; // 600 = 20s

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/** Entra e sai suave, para as cenas se atravessarem sem corte seco. */
const useSceneFade = (dur: number, inF = 14, outF = 14) => {
  const f = useCurrentFrame();
  return Math.min(
    interpolate(f, [0, inF], [0, 1], {extrapolateRight: 'clamp'}),
    interpolate(f, [dur - outF, dur], [1, 0], {extrapolateLeft: 'clamp'})
  );
};

/* ------------------------------------------------------------------ *
 * 01 — Abertura
 * ------------------------------------------------------------------ */
const Abertura: React.FC = () => {
  const f = useCurrentFrame();
  const op = useSceneFade(A, 10, 18);
  const grow = interpolate(f, [0, 70], [0.72, 1], {
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  return (
    <AbsoluteFill style={{opacity: op, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', transform: `scale(${grow})`}}>
        <Spark size={620} rotate={f * 0.32} opacity={0.9} />
      </div>
      <Rise start={16} style={{position: 'absolute', bottom: 168, textAlign: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center'}}>
          <Dot size={12} />
          <TechLabel color={C.mutedOnDark} size={26}>
            Claude Summit · Brasil · 2026
          </TechLabel>
        </div>
      </Rise>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ *
 * Painel — moldura neutra da marca Data Group.
 * Nao reproduz a interface do Claude: e um painel proprio, so para
 * mostrar o formato de trabalho (pedido -> resposta).
 * ------------------------------------------------------------------ */
const Painel: React.FC<{titulo: string; children: React.ReactNode}> = ({titulo, children}) => (
  <div
    style={{
      width: 1240,
      borderRadius: 30,
      background: 'rgba(255,255,255,.035)',
      border: `1px solid ${C.line}`,
      boxShadow: '0 60px 140px -60px rgba(0,0,0,.9)',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '22px 34px',
        borderBottom: `1px solid ${C.line}`,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <Dot size={9} />
        <TechLabel size={19}>{titulo}</TechLabel>
      </div>
      <TechLabel size={19}>Data Group</TechLabel>
    </div>
    <div style={{padding: '44px 48px 52px'}}>{children}</div>
  </div>
);

/* ------------------------------------------------------------------ *
 * 02 — Uma pergunta de negocio, respondida
 * ------------------------------------------------------------------ */
const RESPOSTAS = [
  '40 contratos lidos.',
  '7 vencem nos próximos 90 dias.',
  'Planilha gerada com prazo, valor e responsável.',
];

const Sessao: React.FC = () => {
  const op = useSceneFade(B);
  return (
    <AbsoluteFill style={{opacity: op, alignItems: 'center', justifyContent: 'center'}}>
      <Rise start={0} y={34}>
        <Painel titulo="Sessão de trabalho">
          <div style={{display: 'flex', gap: 20, alignItems: 'flex-start'}}>
            <span style={{fontSize: 40, lineHeight: 1.35, color: C.teal, fontWeight: 600}}>›</span>
            <Typed
              start={14}
              cps={30}
              text="Leia os contratos da pasta e diga quais vencem em 90 dias."
              style={{
                fontSize: 40,
                lineHeight: 1.35,
                color: C.white,
                fontWeight: 500,
                letterSpacing: '-.01em',
              }}
            />
          </div>

          <div style={{marginTop: 46, display: 'flex', flexDirection: 'column', gap: 22}}>
            {RESPOSTAS.map((linha, i) => (
              <Rise key={linha} start={86 + i * 20} dur={16} y={16}>
                <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
                  <span
                    style={{
                      width: 4,
                      height: 34,
                      borderRadius: 999,
                      background: GRAD,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{fontSize: 34, color: 'rgba(255,255,255,.82)', fontWeight: 400}}>
                    {linha}
                  </span>
                </div>
              </Rise>
            ))}
          </div>
        </Painel>
      </Rise>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ *
 * 03 — Claude Code e Skills (pilar 3 da agenda)
 * ------------------------------------------------------------------ */
const CODIGO = [
  {t: 'skill: fechamento-mensal', c: C.teal},
  {t: '  1. ler as vendas do mês', c: 'rgba(255,255,255,.78)'},
  {t: '  2. cruzar com as metas', c: 'rgba(255,255,255,.78)'},
  {t: '  3. gerar o relatório e enviar', c: 'rgba(255,255,255,.78)'},
];

const Codigo: React.FC = () => {
  const f = useCurrentFrame();
  const op = useSceneFade(D);
  return (
    <AbsoluteFill style={{opacity: op, alignItems: 'center', justifyContent: 'center'}}>
      <Rise start={0} y={34}>
        <Painel titulo="Claude Code · Skills">
          <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
            {CODIGO.map((linha, i) => (
              <div key={linha.t} style={{display: 'flex', gap: 26, alignItems: 'baseline'}}>
                <span style={{fontFamily: MONO, fontSize: 26, color: 'rgba(255,255,255,.22)'}}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Typed
                  start={18 + i * 26}
                  cps={34}
                  cursor={f < 18 + i * 26 + 40}
                  text={linha.t}
                  style={{
                    fontFamily: MONO,
                    fontSize: 34,
                    color: linha.c,
                    whiteSpace: 'pre',
                    letterSpacing: '-.01em',
                  }}
                />
              </div>
            ))}
          </div>

          <Rise start={140} dur={18} y={14} style={{marginTop: 48}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <span
                style={{
                  padding: '10px 20px',
                  borderRadius: 999,
                  background: GRAD,
                  color: C.abyss,
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                }}
              >
                Pronto para rodar
              </span>
              <TechLabel size={19}>Você sai do dia com isto funcionando</TechLabel>
            </div>
          </Rise>
        </Painel>
      </Rise>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ *
 * 04 — Fecho
 * ------------------------------------------------------------------ */
const Fecho: React.FC = () => {
  const f = useCurrentFrame();
  const op = useSceneFade(E, 14, 20);
  return (
    <AbsoluteFill style={{opacity: op, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', right: 150, top: 150, opacity: 0.16}}>
        <Spark size={520} rotate={f * 0.24} />
      </div>

      <div style={{width: 1240, display: 'flex', flexDirection: 'column', gap: 40}}>
        <Rise start={4} y={26}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <Dot size={11} />
            <TechLabel color={C.mutedOnDark} size={24}>
              Um dia de construção
            </TechLabel>
          </div>
        </Rise>

        <Rise start={14} y={34}>
          <h1
            style={{
              margin: 0,
              fontSize: 124,
              lineHeight: 0.97,
              fontWeight: 600,
              letterSpacing: '-.04em',
              color: C.white,
            }}
          >
            1º Claude Summit
            <br />
            <span
              style={{
                background: GRAD,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Brasil
            </span>
            <span style={{color: C.teal}}>.</span>
          </h1>
        </Rise>

        <Rise start={34} y={24}>
          <TechLabel color={C.mutedOnDark} size={26}>
            30 de setembro · Cubo Itaú, São Paulo · 08h30 às 17h30
          </TechLabel>
        </Rise>

        <Rise start={50} y={22} style={{marginTop: 26}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
            <Img src={staticFile('datagroup-white.png')} style={{height: 46}} />
            <span style={{width: 1, height: 34, background: 'rgba(255,255,255,.22)'}} />
            <Img src={staticFile('anthropic-white.png')} style={{height: 26, opacity: 0.85}} />
          </div>
        </Rise>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
export const Teaser: React.FC = () => {
  useBrandFont();
  return (
    <Backdrop>
      <AbsoluteFill style={{fontFamily: FONT}}>
        <Sequence durationInFrames={A}>
          <Abertura />
        </Sequence>
        <Sequence from={A} durationInFrames={B}>
          <Sessao />
        </Sequence>
        <Sequence from={A + B} durationInFrames={D}>
          <Codigo />
        </Sequence>
        <Sequence from={A + B + D} durationInFrames={E}>
          <Fecho />
        </Sequence>
      </AbsoluteFill>
    </Backdrop>
  );
};
