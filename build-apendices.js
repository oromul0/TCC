// ============================================================================
// APÊNDICES B1–B4 da defesa, no PADRÃO DO DECK (slide 8).
//   B1 · Matriz de decisão + desempate   (TCC Tabelas 5 e 6 + §5.2.5)
//   B2 · Balanço energético              (TCC Tabela 13 + §6.4)
//   B3 · RSSI, faixas e PDR              (TCC Tabela 14 + §5.4/§6.2/§6.7)
//   B4 · Modelo de dados e pipeline      (TCC §6.5)
// Arial, creme F5F0E7, barra marrom 3B2A1A arredondada 14%, fios bege C7BAA6,
// peso/destaques em caramelo 9C6B43. Tabelas NATIVAS e editáveis.
// Todo número é rastreável à monografia (nada inventado).
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

function addStyledTable(slide, header, rows, opts = {}) {
  const accentCols = new Set([].concat(opts.accentCol ?? []));
  const noBorder = { type: "none" };
  const HROW = opts.headH || 0.66;
  const BROW = opts.rowH  || 0.60;
  const rowSep = [noBorder, noBorder,
    { type: "solid", color: T.hair, pt: 0.75 }, noBorder];

  slide.addShape("roundRect", {
    x: opts.x, y: opts.y, w: opts.w, h: HROW,
    rectRadius: HROW * 0.14, fill: { color: T.headerBg }, line: { type: "none" },
  });

  const headRow = header.map((h, ci) => ({
    text: String(h),
    options: {
      bold: true, color: T.headerTx, fontFace: T.font,
      fontSize: opts.headSize || 14,
      align: ci === 0 ? "left" : "center", valign: "middle",
      margin: [3, 8, 3, 8], border: noBorder,
    },
  }));

  const bodyRows = rows.map((r) =>
    r.map((cell, ci) => {
      const c = typeof cell === "object" && !Array.isArray(cell)
        ? cell : { text: cell };
      const isFirst = ci === 0;
      const isAccent = accentCols.has(ci);
      let text = c.text;
      if (isFirst && opts.firstColUpper && typeof text === "string") {
        text = text.toUpperCase();
      }
      return {
        text,
        options: {
          color: isAccent ? T.accent : T.bodyTx,
          fontFace: T.font, fontSize: opts.bodySize || 13,
          bold: isFirst || isAccent,
          align: isFirst ? "left" : "center", valign: "middle",
          margin: [3, 8, 3, 8], border: rowSep,
          ...(c.options || {}),
        },
      };
    })
  );

  slide.addTable([headRow, ...bodyRows], {
    x: opts.x, y: opts.y, w: opts.w, colW: opts.colW,
    rowH: [HROW, ...bodyRows.map(() => BROW)],
    valign: "middle", border: noBorder, autoPage: false,
  });
}

// Cabeçalho do slide (eyebrow + título) e rodapé padrão dos apêndices.
function slideChrome(slide, bTag, title) {
  slide.background = { color: T.bg };
  slide.addText(`APÊNDICE · ${bTag}`, {
    x: 0.75, y: 0.72, w: 12, h: 0.4,
    fontFace: T.font, fontSize: 13, bold: true, color: T.accent,
    charSpacing: 3, align: "left", valign: "bottom",
  });
  slide.addText(title, {
    x: 0.75, y: 1.06, w: 18.5, h: 0.85,
    fontFace: T.font, fontSize: 30, bold: true, color: T.bodyTx,
    align: "left", valign: "bottom",
  });
  slide.addText("UFES · Engenharia de Produção · CT", {
    x: 0.75, y: 10.55, w: 9, h: 0.35, fontFace: T.font, fontSize: 11,
    color: T.accent, align: "left", valign: "middle",
  });
  slide.addText(`Apêndice · ${bTag}`, {
    x: 10.75, y: 10.55, w: 8.5, h: 0.35, fontFace: T.font, fontSize: 11,
    color: T.accent, align: "right", valign: "middle",
  });
}

function note(slide, text, y, opts = {}) {
  slide.addText(text, {
    x: opts.x ?? 0.75, y, w: opts.w ?? 18.5, h: opts.h ?? 0.55,
    fontFace: T.font, fontSize: opts.size || 12.5,
    color: opts.color || T.bodyTx, bold: !!opts.bold,
    align: "left", valign: "middle",
  });
}

const pptx = new pptxgen();
pptx.defineLayout({ name: "WIDE", width: 20, height: 11.25 });
pptx.layout = "WIDE";

const D = "—";

// ============================ B1 — MATRIZ DE DECISÃO ========================
{
  const s = pptx.addSlide();
  slideChrome(s, "B1", "MATRIZ DE DECISÃO + DESEMPATE");
  const res = (t) => ({ text: t, options: { color: T.accent, bold: true } });
  addStyledTable(
    s,
    ["Critério", "Peso", "A", "B", "C", "D", "E"],
    [
      ["Integração eletrônica",   "0,20", "4", "3", "2", "4", "3"],
      ["Integração GNSS",         "0,15", "5", "2", "2", "5", "4"],
      ["Integração energética",   "0,15", "3", "5", "2", "3", "3"],
      ["Volume no invólucro",     "0,15", "4", "3", "2", "4", "3"],
      ["Facilidade de montagem",  "0,10", "3", "3", "2", "4", "2"],
      ["Robustez mecânica",       "0,10", "3", "3", "2", "3", "4"],
      ["Adequação ao cabresto",   "0,10", "4", "3", "2", "4", "3"],
      ["Custo e disponibilidade", "0,05", "5", "3", "4", "4", "3"],
      ["Resultado ponderado", { text: D, options: { color: T.accent } },
        res("3,85"), res("3,15"), res("2,10"), res("3,90"), res("3,15")],
    ],
    { x: 0.75, y: 2.35, w: 18.5, colW: [4.7, 1.6, 2.44, 2.44, 2.44, 2.44, 2.44],
      firstColUpper: true, accentCol: 1, rowH: 0.56, bodySize: 13 }
  );
  note(s, "A = SELECIONADO  ·  D = maior pontuação bruta  —  Δ 0,05 em escala de 5, " +
    "dentro da margem subjetiva; desempate por fatores de projeto (§5.2.5).",
    8.30, { bold: true, color: T.accent });
  note(s, "Desempate — por que A sobre D:   i. receptor UC6580 multiconstelação " +
    "L1/L5 (T-Beam restrito a L1)   ·   ii. formato estreito, sem conector UHF " +
    "frontal — compatível com o invólucro de 34 mm   ·   iii. disponibilidade " +
    "comercial nacional no prazo e custo do cronograma.",
    8.90, { h: 0.85 });
}

// ============================ B2 — BALANÇO ENERGÉTICO =======================
{
  const s = pptx.addSlide();
  slideChrome(s, "B2", "BALANÇO ENERGÉTICO");
  const hl = (t) => ({ text: t, options: { color: T.accent, bold: true } });
  addStyledTable(
    s,
    ["Intervalo", "Ciclos/dia", "Consumo (mAh/dia)",
     "Saldo η = 0,60 (mAh)", "Saldo η = 0,30 (mAh)", "Autonomia sem solar"],
    [
      ["5 min",  "288", "117,4", "+4,2",   "−56,6", "8,5 dias"],
      ["10 min", "144", "59,0",  "+62,6",  "+1,8",  "16,9 dias"],
      [hl("15 min"), hl("96"), hl("39,6"), hl("+82,0"), hl("+21,2"), hl("25,3 dias")],
      ["30 min", "48",  "20,1",  "+101,5", "+40,7", "49,7 dias"],
    ],
    { x: 0.75, y: 2.5, w: 18.5, colW: [2.6, 2.6, 3.4, 3.5, 3.5, 2.9],
      rowH: 0.68, bodySize: 13.5 }
  );
  note(s, "Geração solar líquida (5 h efetivas de sol):  121,6 mAh/dia (η = 0,60)  ·  " +
    "60,8 mAh/dia (η = 0,30)  —  painel 0,15 Wp (5 V / 30 mA), bateria LiPo 1.000 mAh.",
    6.55);
  note(s, "15 min = referência operacional: margem de ~35% da geração diária no " +
    "cenário conservador. Hibernação com GNSS e LoRa desenergizados (Vext) e " +
    "display desligado entre ciclos.", 7.15, { h: 0.8 });
  note(s, "Validação em campo: operação contínua no período, 0 interrupções por " +
    "depleção de bateria (§6.4).", 8.05, { bold: true, color: T.accent });
}

// ============================ B3 — RSSI, FAIXAS E PDR =======================
{
  const s = pptx.addSlide();
  slideChrome(s, "B3", "RSSI, FAIXAS E PDR");
  addStyledTable(
    s,
    ["Faixa de RSSI (dBm)", "Qualidade do enlace"],
    [
      ["Acima de −80",  "Excelente — curta distância / linha de visada"],
      ["−80 a −100",    "Bom a moderado — plenamente funcional"],
      ["−100 a −110",   "Fraco, porém operante"],
      ["−115 a −120",   "Limiar de sensibilidade — recepção intermitente"],
    ],
    { x: 0.75, y: 2.5, w: 8.7, colW: [2.9, 5.8], rowH: 0.72, bodySize: 12.5 }
  );
  addStyledTable(
    s,
    ["Parâmetro", "Valor em campo"],
    [
      ["Payload",      "30 bytes (binário)"],
      ["Modulação",    "SF7 · CR 4/5 · BW 125 kHz"],
      ["Frequência",   "915 MHz — ISM 902–928 (ANATEL)"],
      ["Potência TX",  "~14 dBm  ·  time-on-air ~60 ms"],
      ["RSSI medido",  "−116 a −46 dBm (limites da área)"],
    ],
    { x: 9.95, y: 2.5, w: 9.3, colW: [3.0, 6.3], rowH: 0.72, bodySize: 12.5 }
  );
  note(s, "PDR: recepção e persistência integrais dos uplinks registrados; o ensaio " +
    "controlado — distância medida e razão transmitidos/recebidos — permanece como " +
    "desdobramento (§6.2).", 7.55, { h: 0.8 });
  note(s, "Contraste com a literatura: dos Reis et al. (2021) reportam perda de " +
    "40–60% com encaminhamento direto por gateway de canal único; aqui, servidor " +
    "LoRaWAN gerenciado (TTN) com de-duplicação (§6.7).",
    8.45, { bold: true, color: T.accent, h: 0.8 });
}

// ======================= B4 — MODELO DE DADOS E PIPELINE ====================
{
  const s = pptx.addSlide();
  slideChrome(s, "B4", "MODELO DE DADOS E PIPELINE");
  addStyledTable(
    s,
    ["Domínio", "Conteúdo"],
    [
      ["01 · Proprietários e imóveis", "Cadastro fundiário — vínculo permanente"],
      ["02 · Rebanho e eventos",       "Eventos zootécnicos ao longo da vida"],
      ["03 · Telemetria",              "Posições brutas — rastreáveis até o dispositivo"],
    ],
    { x: 0.75, y: 2.5, w: 8.9, colW: [3.7, 5.2], rowH: 0.72, bodySize: 12.5 }
  );
  addStyledTable(
    s,
    ["Cadeia de ingestão", "Função"],
    [
      ["Node",                 "Aquisição GNSS + uplink LoRa (30 bytes)"],
      ["Gateway",              "Recepção 915 MHz → encaminhamento IP"],
      ["The Things Network",   "De-duplicação + metadados (RSSI, SNR)"],
      ["Webhook",              "HTTP POST (JSON) à plataforma"],
      ["Edge Function",        "Validação e persistência do registro"],
      ["PostgreSQL · PostGIS", "SQL geoespacial · RLS por propriedade"],
    ],
    { x: 10.15, y: 2.5, w: 9.1, colW: [3.4, 5.7], rowH: 0.62, bodySize: 12.5 }
  );
  note(s, "Vínculo dispositivo–animal é temporal — resolvido pelo histórico de " +
    "eventos, preservando a integridade da telemetria (§6.5). Mapa consulta por " +
    "RPC de última posição.", 7.6, { h: 0.8 });
  note(s, "Stack: Next.js / React · Vercel · Supabase (PostgreSQL + PostGIS, " +
    "sa-east-1) · Mapbox GL JS · Auth + RLS.",
    8.5, { bold: true, color: T.accent });
}

pptx.writeFile({ fileName: "apendices-B1-B4.pptx" })
  .then((f) => console.log("OK:", f));
