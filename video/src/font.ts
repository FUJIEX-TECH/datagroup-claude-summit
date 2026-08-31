import {continueRender, delayRender, staticFile} from 'remotion';

let started = false;

/** Carrega a General Sans local antes do primeiro quadro sair. */
export const useBrandFont = () => {
  if (started || typeof document === 'undefined') return;
  started = true;
  const handle = delayRender('carregando General Sans');
  const style = document.createElement('style');
  style.textContent = `@font-face{font-family:'General Sans';src:url('${staticFile(
    'GeneralSans-Variable.woff2'
  )}') format('woff2');font-weight:200 700;font-style:normal;font-display:block;}`;
  document.head.appendChild(style);
  document.fonts
    .load("600 48px 'General Sans'")
    .then(() => document.fonts.load("400 48px 'General Sans'"))
    .then(() => continueRender(handle))
    .catch(() => continueRender(handle));
};
