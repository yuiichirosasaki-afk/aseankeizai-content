module.exports = (L, a) => {
  const {C, ground, skyline, bank, bars, coins, tag, safe, flag, person, g} = L;
  return {
    sun: [1060, 130, 55],
    body: skyline('vn', 330, 400, 0.9, '#D6C9B0') + ground(400, '#C9B68A') +
      bank(170, 470, 1.2) + safe(520, 470, 1.0) +
      bars(700, 470, 300, [0.45, 0.6, 0.72, 0.9], [C.blue, C.blue, C.navy, C.gold], 240) +
      tag(600, 190, 1.0, -8) + coins(900, 560, 4, 0.9) + coins(380, 570, 2, 0.8) +
      person(1060, 570, 1.0, C.navy) + flag('vn', 1140, 280, 0.8, 160),
  };
};
