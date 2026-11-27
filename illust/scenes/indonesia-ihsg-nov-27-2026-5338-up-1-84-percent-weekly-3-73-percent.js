module.exports = (L, a) => {
  const {C, floor, clouds, skyline, bank, candles, coins, arrow, flag, tag, person} = L;
  return {
    sun: [1100, 120, 48],
    body: clouds([[620, 110, 1.0], [880, 150, 0.8]]) + skyline('id', 1000, 510, 1.1, '#C5D0DC') + floor(510) +
      bank(190, 510, 1.1) + person(360, 515, 1.0, C.navy) + person(420, 515, 1.0, '#5B6B85') +
      candles(500, 150, 310, 220, [[0.3, 0.2], [0.2, 0.35], [0.35, 0.3], [0.3, 0.5], [0.5, 0.45], [0.45, 0.7], [0.7, 0.9]]) +
      coins(560, 520, 4, 0.9) + arrow(930, 340, 0.6, 'up', '#3E9C6A') + tag(900, 250, 0.8, -8) + flag('id', 140, 230, 0.9, 140),
  };
};
