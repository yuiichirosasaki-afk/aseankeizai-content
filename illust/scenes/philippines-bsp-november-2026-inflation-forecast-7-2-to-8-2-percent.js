module.exports = (L, a) => {
  const {C, floor, bank, thermo, bulb, pump, flag, tag, coins, person} = L;
  return {
    sun: [1090, 120, 46],
    body: floor(540) + bank(250, 540, 1.4) + thermo(560, 540, 1.3, 0.75) +
      bulb(760, 500, 1.1) + pump(900, 540, 1.1) + coins(700, 560, 3, 0.9) +
      flag('ph', 1090, 360, 0.8, 170) + tag(620, 230, 0.8, -8) + person(110, 540, 1, C.navy) + person(170, 540, 1, C.teal),
  };
};
