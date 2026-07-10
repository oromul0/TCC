// ============================================================================
// Matriz de subsistemas no PADRÃO DO DECK (slide 8 — "MATRIZ DE DECISÃO").
// Extraído do próprio .pptx: Arial; creme F5F0E7; barra de cabeçalho marrom
// 3B2A1A com cantos arredondados 14%; fio bege C7BAA6 entre linhas; 1ª coluna
// negrito CAIXA-ALTA à esquerda. NEUTRO (sem coluna de destaque em caramelo).
// Tabela NATIVA e editável do PowerPoint.
// ============================================================================
const pptxgen = require("pptxgenjs");

const T = {
  font:     "Arial",
  bg:       "F5F0E7", // creme — fundo do slide
  headerBg: "3B2A1A", // marrom-café — barra do cabeçalho
  headerTx: "F5F0E7", // creme — texto do cabeçalho
  bodyTx:   "3B2A1A", // marrom-café — texto do corpo
  accent:   "9C6B43", // caramelo — eyebrow (não usado como coluna: tabela neutra)
  hair:     "C7BAA6", // bege — separador de linha (bem sutil)
};

function addStyledTable(slide, header, rows, opts = {}) {
  const noBorder = { type: "none" };
  const HROW = 0.70;
  const BROW = 0.66;
  const rowSep = [noBorder, noBorder,
    { type: "solid", color: T.hair, pt: 0.75 }, noBorder];

  // Barra arredondada ATRÁS do cabeçalho (cantos 14%, como o slide 8).
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
      const c = typeof cell === "object" ? cell : { text: String(cell) };
      const isFirst = ci === 0;
      let text = c.text;
      if (isFirst && opts.firstColUpper && typeof text === "string") {
        text = text.toUpperCase();
      }
      return {
        text,
        options: {
          color: T.bodyTx, fontFace: T.font, fontSize: 13.5,
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

const s = pptx.addSlide();
s.background = { color: T.bg };

const D = "—";
// Itálico parcial: "Heltec " normal + "Wireless Tracker" em itálico.
const heltecWT = { text: [
  { text: "Heltec ",          options: {} },
  { text: "Wireless Tracker", options: { italic: true } },
] };

addStyledTable(
  s,
  ["Função/Subsistema", "Opção 1", "Opção 2", "Opção 3", "Opção 4", "Opção 5"],
  [
    ["Plataforma LoRa",        "Arduino MKR WAN 1310",        heltecWT,          "Heltec WiFi LoRa 32 V4", "TTGO T-Beam", "RAK WisBlock"],
    ["Sistema GNSS",           "GNSS integrado",              "NEO-6M",          "NEO-M8N",   "L76K",       "GNSS externo"],
    ["Antena LoRa",            "Interna helicoidal",          "PCB",             "Externa 3 dBi", "Externa 5 dBi", "Modular"],
    ["Arquitetura de energia", "Controlador externo + solar", "Solar integrado", "Sem solar", "Sem recarga", "Sistema híbrido"],
    ["Controlador de carga",   "TP4056",                      "CN3065",          "MCP73831",  "BQ24074",    "PMIC integrado"],
    ["Painel solar",           "1 W",                         "0,15 W",          "0,25 W",    "0,5 W",      "Flexível"],
    ["Invólucro",              "Caixa para cabresto",         "Brinco",          D,           D,            D],
  ],
  {
    eyebrow: "Projeto conceitual",
    title:   "Matriz morfológica",
    x: 0.75, y: 2.7, w: 18.5,
    colW: [3.5, 3.0, 3.0, 3.0, 3.0, 3.0],
    firstColUpper: true,
  }
);

pptx.writeFile({ fileName: "matriz-subsistemas-deck.pptx" })
  .then((f) => console.log("OK:", f));
