// ============================================================================
// Mais duas matrizes no PADRÃO DO DECK (slide 8 — "MATRIZ DE DECISÃO").
//   Slide 1: Matriz morfológica do invólucro (Função/Subsistema × Opção 1-4)
//   Slide 2: Matriz de decisão (Conceito × Cálculo × Resultado)
// Mesmo estilo: Arial, creme F5F0E7, barra marrom 3B2A1A arredondada 14%,
// fios bege C7BAA6, 1ª coluna negrito CAIXA-ALTA, NEUTRO (sem destaque).
// Tabelas NATIVAS e editáveis.
// ============================================================================
const pptxgen = require("pptxgenjs");

const T = {
  font:     "Arial",
  bg:       "F5F0E7",
  headerBg: "3B2A1A",
  headerTx: "F5F0E7",
  bodyTx:   "3B2A1A",
  accent:   "9C6B43",
  hair:     "C7BAA6",
};

// Caixa-alta que também funciona em rich text (array de runs).
function upper(text) {
  if (Array.isArray(text)) {
    return text.map((run) => ({ ...run, text: String(run.text).toUpperCase() }));
  }
  return String(text).toUpperCase();
}

function addStyledTable(slide, header, rows, opts = {}) {
  const noBorder = { type: "none" };
  const HROW = 0.70;
  const BROW = opts.rowH || 0.66;
  const rowSep = [noBorder, noBorder,
    { type: "solid", color: T.hair, pt: 0.75 }, noBorder];

  slide.addShape("roundRect", {
    x: opts.x, y: opts.y, w: opts.w, h: HROW,
    rectRadius: HROW * 0.14, fill: { color: T.headerBg }, line: { type: "none" },
  });

  const headRow = header.map((h, ci) => ({
    text: String(h),
    options: {
      bold: true, color: T.headerTx, fontFace: T.font, fontSize: 15,
      align: ci === 0 ? "left" : "center", valign: "middle",
      margin: [3, 8, 3, 8], border: noBorder,
    },
  }));

  const bodyRows = rows.map((r) =>
    r.map((cell, ci) => {
      const c = typeof cell === "object" && !Array.isArray(cell)
        ? cell : { text: cell };
      const isFirst = ci === 0;
      let text = c.text;
      if (isFirst && opts.firstColUpper) text = upper(text);
      return {
        text,
        options: {
          color: T.bodyTx, fontFace: T.font, fontSize: opts.bodySize || 13.5,
          bold: isFirst,
          align: isFirst ? "left" : "center", valign: "middle",
          margin: [3, 8, 3, 8], border: rowSep,
          ...(c.options || {}),
        },
      };
    })
  );

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
}

const pptx = new pptxgen();
pptx.defineLayout({ name: "WIDE", width: 20, height: 11.25 });
pptx.layout = "WIDE";

const D = "—";
const it = (t) => ({ text: t, options: { italic: true } });          // célula toda itálico

// ---------- SLIDE 1: Matriz morfológica do invólucro (5 colunas) ----------
const s1 = pptx.addSlide();
s1.background = { color: T.bg };
addStyledTable(
  s1,
  ["Função/Subsistema", "Opção 1", "Opção 2", "Opção 3", "Opção 4"],
  [
    ["Material",          "ABS",                  "PETG",       "TPU",             it("Nylon")],
    ["Fabricação",        "FDM",                  "SLS",        "Injeção",         "Usinagem"],
    ["Vedação",           "Silicone",             it("O-ring"), "PU",              "Ultrassônica"],
    ["Painel solar",      "Superior",             "Inclinado",  "Lateral",         "Lateral oposta"],
    ["Proteção interna",  "Único compartimento",  "Separado",   "Amortecido",      "Modular"],
    ["Grau de proteção",  "IP54",                 "IP65",       "IP67",            "IP68"],
    ["Antena",            "Interna",              "SMA vedado", "Externa flexível","Encapsulada"],
    ["Passagem de cabos", "Canaletas",            "Tubos",      "Compartimento",   "Integrado"],
  ],
  {
    eyebrow: "Projeto conceitual",
    title:   "Matriz morfológica — invólucro",
    x: 0.75, y: 2.7, w: 18.5,
    colW: [4.0, 3.625, 3.625, 3.625, 3.625],
    firstColUpper: true, bodySize: 13.5,
  }
);

// ---------- SLIDE 2: Matriz de decisão (3 colunas) ----------
const s2 = pptx.addSlide();
s2.background = { color: T.bg };
const calc = (s) => s; // valores exatamente como no print
addStyledTable(
  s2,
  ["Conceito", "Cálculo", "Resultado"],
  [
    [[{ text: "A - Heltec " }, it("Wireless Tracker")], calc("0,80+0,75+0,45+0,60+0,30+0,30+0,40+0,25"), "3,85"],
    ["B - Heltec WiFi LoRa 32 V4",                      calc("0,60+0,30+0,75+0,45+0,30+0,30+0,30+0,15"), "3,15"],
    ["C - Arduino MKR WAN 1310",                        calc("0,40+0,30+0,30+0,30+0,20+0,20+0,20+0,20"), "2,1"],
    ["D - TTGO T-Beam",                                 calc("0,80+0,75+0,45+0,60+0,40+0,30+0,40+0,20"), "3,9"],
    ["E - RAK WisBlock",                                calc("0,60+0,60+0,45+0,45+0,20+0,40+0,30+0,15"), "3,15"],
  ],
  {
    eyebrow: "Projeto conceitual",
    title:   "Matriz de decisão",
    x: 0.75, y: 2.7, w: 18.5,
    colW: [5.0, 9.5, 4.0],
    firstColUpper: true, bodySize: 13.5, rowH: 0.74,
  }
);

pptx.writeFile({ fileName: "matrizes-involucro-decisao.pptx" })
  .then((f) => console.log("OK:", f));
