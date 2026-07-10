# Revisão da apresentação × monografia — Defesa 11/07, 14h

Auditoria célula a célula dos 34 slides contra as 93 páginas do TCC.
Legenda: 🔴 corrigir antes da defesa · 🟡 decidir/preparar resposta · 🟢 ok.

---

## 1. ERROS NO DECK (corrigir hoje)

### 🔴 1.1 Slide 14 — Painel solar "Silício Amorfo"
A monografia (Tabela 8) diz **policristalino** (Ecofly-Power). O slide diz "Silício Amorfo".
Contradição direta com o texto que a banca tem em mãos. → Trocar para "policristalino"
(ou confirmar na nota de compra qual é o real e alinhar os dois discursos).

### 🔴 1.2 Slide 10 — "PONTUAÇÃO PONDERADA (0–4)"
A escala da matriz é **0–5** (notas até 5; D=3,90 já estoura o teto de 4). → "(0–5)".

### 🔴 1.3 Slide 18 — "27 µA corrente em light-sleep"
Campo minado. O **texto** da monografia diz light-sleep total **~1–2,5 mA** com LCD
desligado (Tabela 7) e ~10 µA só do ESP32-S3. Mas a **Tabela 13** (balanço: 39,6 mAh/dia
@15 min) só fecha matematicamente com sleep ≈ **27 µA** (96 ciclos × 1.460 mA·s = 38,9 mAh
+ ~0,65 mAh de sleep). Com 2,5 mA seriam ~98 mAh/dia e o balanço solar conservador ficaria
NEGATIVO. Ou seja: o slide está coerente com a Tabela 13, mas contradiz a Tabela 7.
→ Opções: (a) manter 27 µA e **saber explicar** ("valor médio de hibernação assumido no
balanço, com GNSS/LoRa desenergizados via Vext e display desligado; a Tabela 7 traz o
envelope de pior caso do fabricante"); (b) tirar o número e dizer "consumo em hibernação
desprezível frente ao ciclo ativo (<2% do consumo diário)". Não deixe como está sem
resposta pronta — se um examinador fizer a conta, é a pergunta mais dura da defesa.

### 🔴 1.4 Slide 18 — "GERAÇÃO × CONSUMO (AH/DIA)"
Unidade errada: é **mAh/dia** (121,6 / 60,8 / 39,6).

### 🔴 1.5 Slide 20 — "Alcance máximo · nuvem de pontos ~800 m"
Os ~800 m são o **diâmetro** da nuvem de pontos (Figura 24 do TCC); o alcance máximo
node→gateway é **600–670 m**. Rotular 800 m como "alcance máximo" infla o resultado e
contradiz o próprio slide 28 (que diz 600–670 m). → "Diâmetro da nuvem de pontos ~800 m".

### 🔴 1.6 Slide 3 — Estatísticas com fonte/claim errados
- "**90% do desmatamento é illegal**": além do typo ("ilegal"), esse claim **não está na
  monografia**. O que o TCC diz (MapBiomas, 2024) é ">90% do desmatamento da Amazônia
  tem como destino **pastagem**".
- "75% da área desmatada vira pastagem" e "93% sobrepõe zonas SIF": no TCC, ambos são de
  **Barretto & Seraphim (2023)** (InfoBoi/FEBRABAN) — não "Radar Verde e IPAM (2023)".
  O Radar Verde citado na monografia é **Imazon, 2025**.
- "Aumento de 200% em 35 anos": **não está na monografia**. Ou remove, ou confirma na
  fonte primária (Infoamazônia/MapBiomas) e mantém sabendo defender.
→ Sugestão de slide 3 corrigido: "MapBiomas (2024): >90% do desmatamento da Amazônia vira
pastagem · Barretto & Seraphim (2023): 75% do desmatado em florestas públicas não
destinadas era pastagem em 2020; 93% do desmatado (2016–2020) sobrepõe zonas de compra
dos frigoríficos".

### 🔴 1.7 Slide 2 — "~80% do rebanho em sistema extensivo (ABIEC, 2025)"
**Não está na monografia** (nem em outra formulação). Ou você tem o Beef Report em mãos
para citar direto, ou troca por um dado que está no TCC (ex.: "SISBOV ≈ 4 mi de animais,
~2% do rebanho" — p. 23; ou "único grande exportador sem rastreabilidade individual
obrigatória" — Ramos et al., 2020, p. 24).

### 🔴 1.8 Slide 2 — "(ABIEC, 2024)" no card de 194 mi
A monografia cita **ABIEC, 2025** (dado de 2024, relatório de 2025). Unificar com o outro
card do mesmo slide, que já diz 2025.

### 🔴 1.9 Typos visíveis
- Slide 13: "**Gataway**" → Gateway; "Wi-fi" → Wi-Fi.
- Slide 5: "identificação individual **official**" → oficial.
- Slide 3: "illegal" → ilegal (já coberto em 1.6).
- Slide 19: sobra de texto "**Vista ex.**" antes de "Planta georreferenciada";
  "vertices" → vértices.
- Slide 9: "Heltec Automation technology" → Technology (menor).

### 🔴 1.10 Numeração de páginas dos slides quebrada
Rodapés misturam totais **/19, /20, /25** e repetem números (16/19 aparece 2×; 15/19
aparece 2×; 21/25 aparece 2×). Ou renumera tudo, ou **remove o contador** (mais rápido).

### 🔴 1.11 Slide 34 (Apêndice B5) — "(preencher)" à mostra
"Valores por item conforme a monografia (preencher)" — além do placeholder visível,
**a monografia não tem a composição por item** (só o total R$ 340,00 na Tabela 15).
→ Ou preenche com os valores reais das compras (você os tem), ou reformula: itens sem
preço + total ~R$ 340. Não deixe "(preencher)" projetável.

### 🟡 1.12 Slide 7 — Classificação metodológica incompleta
Deck: "aplicada e experimental · quantitativa". TCC (5.1): natureza **aplicada**,
objetivos **exploratória**, abordagem **quantitativa**, procedimentos **experimentais**.
Banca de Produção costuma cobrar exatamente isso. → Acrescentar "exploratória".

### 🟡 1.13 Slide 5 — Atribuição da "lavagem do gado"
Deck atribui a zu Ermgassen et al. (2020). Na monografia, lavagem = **Sevilla et al.
(2025)** (p. 14 e 23); zu Ermgassen é a fonte da **Figura 2** (diagrama da cadeia).
Defensável academicamente (o paper de zu Ermgassen trata do risco do fornecedor
indireto), mas se citarem a monografia, a referência é outra. → Trocar para Sevilla
(2025) ou manter sabendo a distinção.

### 🟡 1.14 Slide 21 — Faixas de RSSI
Slide: Limite −120/−115 · Regular −115/−100 · Bom −100/−80 · Excelente −80/−40.
TCC (Tabela 14): fraco-porém-operante é **−100 a −110** e limiar **abaixo de −115/−120**.
Os cortes não coincidem exatamente (o slide "some" com a faixa −110/−115). Menor, mas se
padronizar, use os da Tabela 14.

---

## 2. O QUE ESTÁ FALTANDO (e vale a pena)

### 🔴 2.1 Apêndices B1–B4 anunciados e inexistentes
O índice (slide 33) promete **B1–B7 + "Agricultura 1.0→4.0"**, mas só existem B5, B6 e
B7 (slides 34, 30, 31). Se um examinador pedir "vamos ao seu B3", não há slide.
→ Mais rápido: duplicar como apêndice o que já existe no deck principal
(B1 = slides 8–10 · B2 = slide 18 · B4 = slides 24–25) e montar só o **B3** (RSSI/PDR):
faixas da Tabela 14 + payload 30 bytes + SF7/CR 4/5/BW 125 kHz/915 MHz/14 dBm/ToA ~60 ms
+ o contraste com dos Reis (perda 40–60% vs. recepção integral aqui, explicada pelo
servidor LoRaWAN gerenciado — §6.7). Ou então **enxugar o índice** para B5–B7.

### 🟡 2.2 Identificação da área de teste (slide 19)
TCC tem: **Itaici, Muniz Freire (ES) · 49,34 ha · perímetro 3.416 m · 680–770 m de
altitude · SIRGAS 2000 · ~45% pastagem**. O slide diz só "região serrana do ES".
Uma linha resolve e antecipa pergunta certa da banca.

### 🟡 2.3 Autonomia sem sol (resposta pronta para "e se chover uma semana?")
Tabela 13: **25,3 dias sem recarga @15 min** (49,7 d @30 min; 8,5 d @5 min).
Cabe no slide 18 ou no B2 — é o número que blinda o balanço energético.

### 🟡 2.4 Nota de rodapé no "100%" (slide 21)
O TCC diz "totalidade das transmissões **registradas** foi recebida e persistida" e que a
PDR controlada ficou como desdobramento (§6.2). O slide 27 já cobre, mas o "100%" gigante
pede um asterisco: "*dos uplinks registrados; PDR controlada = desdobramento*". Sem isso,
a pergunta "100% de quê, se você não contou os transmitidos?" fica fácil demais.

### 🟡 2.5 Estudos futuros incompletos (slide 30 / B6)
TCC lista **5 frentes**; o B6 mostra 4. Faltam: **(ii) alcance/antenas/SF9–SF12/
multi-gateway** e **(v) SaaS + aplicações analíticas**. Adicionar os dois cards ou saber
justificar o recorte.

### 🟢 2.6 Opcionais (só se sobrar tempo)
- EUDR: Brasil "alto risco" → **9% das importações verificadas vs 1%** (Radar Verde 2025).
- Protocolo Brazil-China Compliance / IMAFLORA (2024) — corte 01/08/2020 (slide 4 só tem UE).
- Boi na Linha: 13 critérios, 7 verificáveis por geoespacial.
- Emissões: 74% dos GEE do Brasil = uso da terra (50%) + agropecuária (24%) (OC, 2024).
- Custo SISBOV R$ 4,34–24,76/animal (Ramos et al., 2020) — bom para "quanto custa a alternativa?".

---

## 3. O QUE NÃO PÔR / CORTAR

1. **Números sem lastro na monografia** (80% extensivo; 200% em 35 anos; 90% ilegal) —
   regra de ouro: todo número projetado deve existir no TCC ou você deve ter a fonte
   primária aberta na mesa.
2. **"Alcance ~800 m"** — não chame diâmetro de alcance (item 1.5).
3. **Slide 12** ("Aplicação web · Mapa e trilha", quase vazio) — se não vai receber
   print/demo, corte; slide vazio em defesa vira pergunta.
4. **"device cattletracker2"** (slide 19) — detalhe interno; inofensivo, mas dispensável.
5. **Não prometa PDR/acurácia/latência** — o deck (slide 27) e o TCC delimitam certinho
   como desdobramento. Resista à tentação de "vender" além disso na fala.

---

## 4. ERRATA DA MONOGRAFIA (para não ser pego de surpresa)

O PDF já foi entregue; não dá para mudar — mas **anote para reconhecer na arguição**:

1. **Sumário**: "6.5 Plataforma IoT" e "6.5 Integridade de dados" duplicados (corpo usa
   6.5/6.6/6.7 — a comparativa vira 6.7, não 6.6 como no sumário).
2. **Introdução** (p. 17) promete **nove** seções ("Seção 8 = estudos futuros; Seção 9 =
   conclusão"), mas o documento tem **oito** (estudos futuros estão dentro da Seção 7).
3. **Conclusão** (p. 88) cita "Figuras 28 e 29" para as telas da plataforma — são as
   **Figuras 31 e 32** (28 = ER; 29 = fluxo).
4. **Tabela 8**: bateria "80 × 30 × 40 mm" → **8 × 30 × 40 mm** (o modelo 803040 é
   8,0 × 30 × 40; a p. 52 traz o valor correto).
5. **Tabela 7 vs Tabela 13**: a tensão do light-sleep (item 1.3 acima) — tenha a
   explicação na ponta da língua.
6. p. 79: "refina o dimensionamento **refina**" (palavra duplicada).
7. p. 79: legenda "Figura 27: **Fonte:** Distribuição espacial..." ("Fonte:" duplicado).
8. p. 23: frase truncada "caracterizada pela transferência de animais oriundos de
   propriedades em situação irregular **são transferidos**...".
9. Tabela 14 (faixas RSSI): fonte "valores usuais" — se pedirem referência formal,
   admita que são faixas operacionais de mercado (TTN/Semtech) e ofereça complementar.

---

## 5. O QUE ESTÁ FORTE (não mexer)

- **Matriz de decisão (slides 8–10)**: conferida célula a célula contra a Tabela 5 —
  **100% correta**, incluindo pesos, e a soma ponderada (Tabela 6) fecha exata.
- **Slide 27 (honestidade científica)**: espelha fielmente §6.2, §6.3, §6.6 e §7.
  É o slide que desarma a banca — mantenha como está.
- **Resultados (slides 20–23)**: −116/−46 dBm, mediana 15,9 min, 64% em 13–17 min,
  5–11 satélites (média 7,1), HDOP 2,5 (64% ≤ 2,0), 0 interrupções, ~35% de margem —
  tudo confere com §6.2–6.4.
- **Comparativo (slide 28)** = Tabela 15 + §6.7, incluindo o contraste com dos Reis
  (40–60% de perda) e a ressalva de "ordem de grandeza".
- **Conclusão (slide 29)**: 8/8 objetivos, 15 min como equilíbrio, rastreável até o
  dispositivo — tudo lastreado na Seção 8.

## 6. Perguntas prováveis da banca (prepare 1 resposta curta cada)

1. Light-sleep: 2,5 mA ou 27 µA? (item 1.3 — a mais provável de todas)
2. Por que houve **interrupções noturnas** de aquisição? (§6.2 menciona sem explicar)
3. "100% de recepção" sem PDR controlada — como afirma? (item 2.4)
4. Por que A e não D, se D pontuou mais? (slides 9–10 já respondem — ensaie o trio
   UC6580 L1/L5 · 34 mm · disponibilidade)
5. Acurácia do GNSS: HDOP não é acurácia — quando vem o ensaio SIGEF? (§5.5.2/§6.3)
6. Escala: R$ 340/animal é viável? (tenha o custo SISBOV R$ 4,34–24,76 e o argumento
   de protótipo vs produto + B5)
7. 600–670 m cobrem uma fazenda real? (resposta: SF7 por escolha energética; SF9–SF12
   e multi-gateway como desdobramento — §5.5.1 e frente ii)
8. Datas/N do campo (18/09–03/10, 277 aquisições) não estão na monografia — esteja
   pronto para dizer de onde vêm (registro da plataforma).
