module.exports = (L, a) => {
  const {C, ground, skyline, floor, doc, stamp, gavel, person, coins, flag, safe, arrow, g} = L;
  return {
    sun: [1090, 130, 50],
    body: skyline('th', 760, 470, 1.0, '#D6C9B0') + ground(470, '#C9B68A') +
      doc(150, 520, 1.0, -6, 6, [1, 3]) + doc(260, 530, 0.9, 5, 6, [2]) + stamp(330, 450, 0.9) +
      person(470, 560, 1.0, C.navy) + person(540, 560, 1.0, C.teal) + person(610, 560, 1.0, C.gold) +
      coins(760, 560, 5, 0.9) + gavel(880, 500, 0.75) + safe(1040, 540, 0.8) +
      flag('th', 1080, 250, 0.8, 150),
  };
};
