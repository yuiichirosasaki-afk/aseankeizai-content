module.exports = (L, a) => {
  const {C, ground, skyline, bank, safe, coins, doc, stamp, bars, clouds, route, flag} = L;
  return {
    sun: [1080, 120, 50],
    body: clouds([[620, 110, 1.1], [900, 160, 0.8]]) + ground(470, '#D8CBB0') +
      skyline('sg', 300, 470, 1.0, '#C5D0DC') + bank(620, 470, 1.2) +
      safe(850, 470, 1.0) + coins(960, 470, 5, 1.0) + coins(1060, 470, 3, 1.0) +
      bars(150, 560, 200, [0.3, 0.45, 0.6, 0.8], [C.gold, C.gold, C.gold, C.gold], 150) +
      doc(500, 580, 0.9, -4, 4) + stamp(570, 540, 0.8) +
      route([[700, 330], [780, 280], [850, 330]], C.teal, true),
  };
};
