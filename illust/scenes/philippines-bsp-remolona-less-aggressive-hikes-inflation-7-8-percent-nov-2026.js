module.exports = (L, a) => {
  const {C, floor, bank, thermo, sprout, flag, arrow} = L;
  return {
    sun: [1090, 120, 44],
    body: floor(540) + bank(300, 540, 1.2) + thermo(640, 500, 1.1, 0.9) + arrow(780, 330, 0.6, 'up', C.red) +
      sprout(900, 520, 0.6) + flag('ph', 1010, 330, 0.9, 175),
  };
};
