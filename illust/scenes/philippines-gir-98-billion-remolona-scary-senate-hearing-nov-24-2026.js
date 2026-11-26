module.exports = (L, a) => {
  const {C, floor, bank, safe, coins, bars, arrow, flag, person, doc, thermo} = L;
  return {
    sun: [1100, 120, 44],
    body: floor(520) + bank(250, 520, 1.3) + safe(640, 520, 1.0) + coins(760, 520, 3, 0.9) +
      bars(840, 520, 90, [0.9, 0.68, 0.52], [C.gray, C.blue, C.red], 190) +
      arrow(1090, 300, 0.9, 'down', C.red) + flag('ph', 1000, 190, 0.8, 140) +
      person(520, 580, 0.9, C.navy) + person(570, 580, 0.9, C.teal),
  };
};
