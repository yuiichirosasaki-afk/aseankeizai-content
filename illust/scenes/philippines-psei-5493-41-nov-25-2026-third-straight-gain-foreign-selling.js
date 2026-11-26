module.exports = (L, a) => {
  const {C, floor, skyline, candles, bell, board, arrow, coins, flag, person} = L;
  return {
    sun: [1100, 110, 44],
    body: skyline('ph', 980, 540, 1.0, '#CBD5E1') + floor(540) +
      board(160, 130, 440, 260, [0.2, 0.3, 0.28, 0.46, 0.6, 0.72], '#3E9C6A') +
      candles(660, 400, 280, 220, [[0.3, 0.45], [0.4, 0.6], [0.55, 0.5], [0.5, 0.72], [0.7, 0.85]]) +
      bell(300, 540, 0.9) + coins(420, 540, 4, 0.9) + arrow(1060, 330, 0.8, 'up', '#3E9C6A') +
      flag('ph', 1090, 380, 0.8, 140) + person(560, 580, 0.9, C.navy) + person(610, 580, 0.9, C.teal),
  };
};
