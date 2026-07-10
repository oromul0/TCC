// ============================================================================
// Tabela "Função/Subsistema × Opções" — estilo do PRINT (acadêmico/booktabs).
// Fundo claro, fonte serifada, cabeçalho em negrito centralizado com filetes,
// zebra alternada, 1ª coluna em negrito (sem caixa-alta), SEM coluna de destaque.
// Tabela NATIVA do PowerPoint (100% editável).
// ============================================================================
const pptxgen = require("pptxgenjs");

const T = {
  font:     "Times New Roman", // serifada, como no print
  bg:       "FFFFFF",          // fundo claro
  headerTx: "000000",          // texto do cabeçalho (preto)
  bodyTx:   "000000",          // texto do corpo (preto)
  zebra:    "EFEBE4",          // faixa bege bem clara das linhas alternadas
  rule:     "000000",          // filetes horizontais do cabeçalho (preto)
  hair:     "BBBBBB",          // fio sutil entre linhas do corpo
};

// header: [texto], rows: [[célula|{text,options}]], opts: { title, x, y, w, colW }
function addPrintTable(slide, header, rows, opts = {}) {
  const none = { type: "none" };
  const HROW = 0.62;
  const BROW = 0.58;
  const topRule    = { type: "solid", color: T.rule, pt: 1.5 };
  const headerRule = { type: "solid", color: T.rule, pt: 1.0 };
  const hair       = { type: "solid", color: T.hair, pt: 0.5 };
  const bottomRule = { type: "solid", color: T.rule, pt: 1.5 };

  // Cabeçalho: negrito, centralizado; regra grossa em cima e fina embaixo.
  const headRow = header.map((h, ci) => ({
    text: String(h),
    options: {
      bold: true, color: T.headerTx, fontFace: T.font, fontSize: 15,
      align: "center", valign: "middle", fill: { color: T.bg },
      margin: [3, 6, 3, 6],
      border: [topRule, none, headerRule, none],
    },
  }));

  const lastIdx = rows.length - 1;
  const bodyRows = rows.map((r, ri) => {
    const isEven = ri % 2 === 1;            // zebra: 2ª, 4ª... linha com faixa
    const isLast = ri === lastIdx;
    const bottom = isLast ? bottomRule : hair;
    return r.map((cell, ci) => {
      const c = typeof cell === "object" ? cell : { text: String(cell) };
      const isFirst = ci === 0;
      return {
        text: c.text,
        options: {
          color: T.bodyTx, fontFace: T.font, fontSize: 13,
          bold: isFirst,
          align: isFirst ? "left" : "center", valign: "middle",
          fill: { color: isEven ? T.zebra : T.bg },
          margin: [3, 8, 3, 8],
          border: [none, none, bottom, none],
          ...(c.options || {}),
        },
      };
    });
  });

  if (opts.title) {
    slide.addText(opts.title, {
      x: opts.x, y: opts.y - 0.9, w: opts.w, h: 0.7,
      fontFace: T.font, fontSize: 24, bold: true, color: T.bodyTx,
      align: "center", valign: "bottom",
    });
  }

  slide.addTable([headRow, ...bodyRows], {
    x: opts.x, y: opts.y, w: opts.w, colW: opts.colW,
    rowH: [HROW, ...bodyRows.map(() => BROW)],
    valign: "middle", border: none, autoPage: false,
  });
}

const pptx = new pptxgen();
pptx.defineLayout({ name: "WIDE", width: 20, height: 11.25 });
pptx.layout = "WIDE";

const s = pptx.addSlide();
s.background = { color: T.bg };

const D = "—"; // travessão para célula vazia
// Célula com itálico parcial: "Heltec " normal + "Wireless Tracker" em itálico.
const heltecWT = { text: [
  { text: "Heltec ",           options: {} },
  { text: "Wireless Tracker",  options: { italic: true } },
] };

addPrintTable(
  s,
  ["Função/Subsistema", "Opção 1", "Opção 2", "Opção 3", "Opção 4", "Opção 5"],
  [
    ["Plataforma LoRa",       "Arduino MKR WAN 1310",          heltecWT, "Heltec WiFi LoRa 32 V4", "TTGO T-Beam", "RAK WisBlock"],
    ["Sistema GNSS",          "GNSS integrado",                "NEO-6M",     "NEO-M8N",   "L76K",      "GNSS externo"],
    ["Antena LoRa",           "Interna helicoidal",            "PCB",        "Externa 3 dBi", "Externa 5 dBi", "Modular"],
    ["Arquitetura de energia","Controlador externo + solar",   "Solar integrado", "Sem solar", "Sem recarga", "Sistema híbrido"],
    ["Controlador de carga",  "TP4056",                        "CN3065",     "MCP73831",  "BQ24074",   "PMIC integrado"],
    ["Painel solar",          "1 W",                           "0,15 W",     "0,25 W",    "0,5 W",     "Flexível"],
    ["Invólucro",             "Caixa para cabresto",           "Brinco",     D,           D,           D],
  ],
  {
    title: "",
    x: 1.0, y: 1.6, w: 18.0,
    colW: [3.4, 3.2, 2.9, 3.0, 2.9, 2.6],
  }
);

pptx.writeFile({ fileName: "matriz-subsistemas.pptx" })
  .then((f) => console.log("OK:", f));
