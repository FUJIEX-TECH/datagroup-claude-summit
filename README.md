# Claude Summit Brasil — Data Group

Landing page do **1º Claude Summit Brasil**, evento do Data Group.

**30 de setembro de 2026 · Cubo Itaú, Vila Olímpia, São Paulo · 08h30 às 17h30**

## Estrutura

HTML estático de arquivo único, sem build. `index.html` na raiz, tudo o mais em `assets/`.

```
index.html                          página inteira: markup, CSS e JS
assets/
  claude-summit-teaser.mp4          vídeo da seção de abertura
  fonts/GeneralSans-Variable.woff2  tipografia (Fontshare, licença gratuita)
  images/                           logos, spark, imagem da seção Sobre
video/                              projeto Remotion que gera o teaser
```

## Rodar localmente

O servidor precisa aceitar requisições `Range`, senão o navegador trata o mp4 como
não-buscável. O `python3 -m http.server` não aceita:

```bash
npx serve -l 8000 .
```

## Gerar o vídeo

```bash
cd video
npm install
npm run studio    # pré-visualizar
npm run render    # renderiza em video/out/
```

Depois comprimir para a web:

```bash
ffmpeg -i video/out/claude-summit.mp4 -an -c:v libx264 -profile:v high \
  -pix_fmt yuv420p -crf 22 -preset slow -movflags +faststart \
  assets/claude-summit-teaser.mp4 -y
```

## Pendências

Procure por `<!-- PLACEHOLDER -->` no `index.html`:

1. **Link de inscrição** — trocar o `data-checkout` no `<body>`; os 10 CTAs da página seguem juntos.
2. **Palestrantes** — 5 cards com "A confirmar": faltam nome, cargo e foto (proporção 3:4).
3. **Títulos e descrições das três palestras** — os textos atuais são provisórios.
4. **Fotos do Cubo Itaú** — 5 imagens para o carrossel da seção "Mais informações".
5. **Política de desconto corporativo** — a resposta no FAQ está genérica.

## Deploy

Vercel, a partir da branch `main`. Framework Preset: **Other**, output na raiz.

---

Desenvolvido pela [Fujiex Tech](https://github.com/FUJIEX-TECH).
