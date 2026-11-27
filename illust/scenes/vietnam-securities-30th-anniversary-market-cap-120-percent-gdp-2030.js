module.exports = (L, a) => {
  const {C, hills, ground, floor, clouds, skyline, bell, board, coins, bars, arrow, flag, sprout} = L;
  return {
    sun: [1090, 120, 50],
    body: clouds([[600, 110, 1.0], [880, 160, 0.8]]) + skyline('vn', 1000, 500, 1.0, '#C5D0DC') + floor(500) +
      bell(220, 330, 1.1) + coins(120, 520, 5, 0.9) + coins(330, 525, 4, 0.9) +
      board(470, 130, 330, 220, [0.2, 0.3, 0.28, 0.45, 0.6, 0.85], '#3E9C6A') +
      bars(560, 560, 180, [0.55, 0.8], [C.navy, C.red], 130) +
      arrow(960, 330, 0.6, 'up', '#3E9C6A') + flag('vn', 870, 250, 0.9, 150) + sprout(790, 560, 0.9),
  };
};
