module.exports = (L, a) => {
  const {C, floor, bank, doc, stamp, coins, sprout, flag, bell, tag, person} = L;
  return {
    sun: [1090, 120, 46],
    body: floor(540) + bank(260, 540, 1.4) + sprout(620, 540, 1.3) +
      doc(830, 500, 1.1, -6, 5, [0, 2]) + stamp(880, 440, 0.9) + coins(660, 560, 4, 0.9) + coins(960, 560, 3, 0.9) +
      bell(980, 320, 0.85) + flag('ph', 1080, 360, 0.8, 170) + tag(590, 250, 0.8, -8) + person(110, 540, 1, C.navy) + person(170, 540, 1, C.teal),
  };
};
