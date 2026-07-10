// ============================================================================
// Comparativo com a literatura (condensado) — PADRÃO DO DECK (slide 8/28).
// Cabeçalho marrom arredondado; colunas à esquerda (como no print); 1ª coluna
// negrito (citações — sem caixa-alta); travessão em célula vazia; LINHA FINAL
// destacada em barra caramelo arredondada ("Este trabalho"). Tabela NATIVA.
// Conteúdo = Tabela 15 / §6.7 da monografia.
// ============================================================================
const pptxgen = require("pptxgenjs");

const T = {
  font:     "Arial",
  bg:       "F5F0E7",
  headerBg: "3B2A1A",
  headerTx: "F5F0E7",
  bodyTx:   "3B2A1A",
  accent:   "9C6B43", // caramelo — barra de destaque
  hair:     "C7BAA6",
};

function addStyledTable(slide, header, rows, opts = {}) {
  const noBorder = { type: "none" };
  const HROW = 0.70;
  const BROW = opts.rowH || 0.66;
  const rowSep = [noBorder, noBorder,
    { type: "solid", color: T.hair, pt: 0.75 }, noBorder];
  const alignOf = (ci) =>
    opts.allLeft ? "left" : (ci === 0 ? "left" : "center");

  // barra arredondada do cabeçalho
  slide.addShape("roundRect", {
    x: opts.x, y: opts.y, w: opts.w, h: HROW,
    rectRadius: HROW * 0.14, fill: { color: T.headerBg }, line: { type: "none" },
  });

  // barra caramelo atrás da última linha (destaque "Este trabalho")
  const lastIdx = rows.length - 1;
  if (opts.highlightLast) {
    const yLast = opts.y + HROW + lastIdx * BROW;
    slide.addShape("roundRect", {
      x: opts.x, y: yLast, w: opts.w, h: BROW,
      rectRadius: BROW * 0.16, fill: { color: T.accent }, line: { type: "none" },
    });
  }

  const headRow = header.map((h, ci) => ({
    text: String(h),
    options: {
      bold: true, color: T.headerTx, fontFace: T.font, fontSize: 15,
      align: alignOf(ci), valign: "middle",
      margin: [3, 10, 3, 10], border: noBorder,
    },
  }));

  const bodyRows = rows.map((r, ri) => {
    const isLast = ri === lastIdx;
    const hot = opts.highlightLast && isLast;
    return r.map((cell, ci) => {
      const c = typeof cell === "object" && !Array.isArray(cell)
        ? cell : { text: cell };
      const isFirst = ci === 0;
      let text = c.text;
      if (isFirst && opts.firstColUpper && typeof text === "string") {
        text = text.toUpperCase();
      }
      return {
        text,
        options: {
          color: T.bodyTx, fontFace: T.font, fontSize: 13.5,
          bold: isFirst || hot,
          align: alignOf(ci), valign: "middle",
          margin: [3, 10, 3, 10],
          border: hot ? [noBorder, noBorder, noBorder, noBorder] : rowSep,
          ...(c.options || {}),
        },
      };
    });
  });

  if (opts.eyebrow) {
    slide.addText(opts.eyebrow.toUpperCase(), {
      x: opts.x, y: opts.y - 1.35, w: opts.w, h: 0.4,
      fontFace: T.font, fontSize: 13, bold: true, color: T.accent,
      charSpacing: 3, align: "left", valign: "bottom",
    });
  }
  if (opts.title) {
    slide.addText(opts.title, {
      x: opts.x, y: opts.y - 1.0, w: opts.w, h: 0.8,
      fontFace: T.font, fontSize: 30, bold: true, color: T.bodyTx,
      align: "left", valign: "bottom",
    });
  }

  slide.addTable([headRow, ...bodyRows], {
    x: opts.x, y: opts.y, w: opts.w, colW: opts.colW,
    rowH: [HROW, ...bodyRows.map(() => BROW)],
    valign: "middle", border: noBorder, autoPage: false,
  });

  if (opts.footnote) {
    const yFoot = opts.y + HROW + rows.length * BROW + 0.15;
    slide.addText(opts.footnote, {
      x: opts.x, y: yFoot, w: opts.w, h: 0.4,
      fontFace: T.font, fontSize: 11.5, italic: true, color: T.accent,
      align: "left", valign: "top",
    });
  }
}

const pptx = new pptxgen();
pptx.defineLayout({ name: "WIDE", width: 20, height: 11.25 });
pptx.layout = "WIDE";

const s = pptx.addSlide();
s.background = { color: T.bg };

const D = "—";

addStyledTable(
  s,
  ["Estudo", "Alcance", "Destaque"],
  [
    ["Tancredo et al. (2021)", "~5 km*",       "Longo alcance"],
    ["Ojo et al. (2021)",      "860–2.050 m",  "Modelagem de enlace"],
    ["Jaikaeo et al. (2022)",  D,              "~20 dias de autonomia"],
    ["dos Reis et al. (2021)", D,              "40–60% de perda de pacotes"],
    ["Carneiro (2019)",        D,              "Correlato nacional"],
    ["Este trabalho",          "600–670 m (SF7)",
      "Recepção 100% · multiconstelação + solar no cabresto"],
  ],
  {
    eyebrow: "Posicionamento",
    title:   "Comparativo com a literatura",
    x: 0.75, y: 2.7, w: 18.5,
    colW: [4.8, 3.2, 10.5],
    rowH: 0.70, allLeft: true, highlightLast: true,
    footnote: "* Biomas, plataformas e protocolos distintos — a comparação é por ordem de grandeza (§6.7).",
  }
);

pptx.writeFile({ fileName: "comparativo-literatura.pptx" })
  .then((f) => console.log("OK:", f));
