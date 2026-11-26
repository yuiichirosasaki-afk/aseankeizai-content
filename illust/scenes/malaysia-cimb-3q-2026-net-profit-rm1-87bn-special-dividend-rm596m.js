module.exports = (L, a) => {
  const {C, floor, skyline, bank, coins, bars, arrow, flag, person, safe, note} = L;
  return {
    sun: [1100, 120, 44],
    body: skyline('my', 960, 520, 1.1, '#CBD5E1') + floor(520) + bank(240, 520, 1.3) +
      bars(560, 520, 90, [0.9, 0.78], [C.gray, C.blue], 190) +
      coins(780, 520, 5, 0.9) + note(860, 500, 0.9, -8, C.gold) + safe(1060, 520, 0.8) +
      arrow(700, 300, 0.7, 'down', C.red) + flag('my', 480, 190, 0.8, 140) +
      person(400, 580, 0.9, C.navy) + person(460, 580, 0.9, C.teal),
  };
};
