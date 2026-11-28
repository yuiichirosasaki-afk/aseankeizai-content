module.exports = (L, a) => {
  const {C, skyline, floor, bank, bars, arrow, sprout, flag, coins, board} = L;
  return {
    sun: [1090, 120, 48],
    body: skyline('id', 1030, 540, 1.05, '#CBD5E1') + floor(540) +
      bank(220, 540, 1.25) + sprout(430, 540, 1.1) +
      bars(560, 540, 300, [0.38, 0.5, 0.62, 0.78, 0.95], [C.blue, C.blue, C.blue, C.navy, C.gold], 280) +
      arrow(900, 230, 0.7, 'up', '#3E9C6A') + coins(930, 540, 3, 0.85) + flag('id', 1140, 360, 0.85, 190),
  };
};
