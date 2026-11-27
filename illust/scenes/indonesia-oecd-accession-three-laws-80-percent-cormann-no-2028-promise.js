module.exports = (L, a) => {
  const {C, floor, doc, stamp, gavel, flag, bank, magnifier, person, arrow} = L;
  return {
    sun: [1090, 130, 48],
    body: floor(530) + bank(330, 530, 1.5) +
      doc(620, 500, 1.1, -6, 5, [1]) + doc(760, 505, 1.1, 0, 5, [2]) + doc(900, 500, 1.1, 6, 5, [3]) +
      stamp(790, 420, 0.9) + gavel(1040, 520, 0.9) + magnifier(560, 520, 0.8) +
      flag('id', 90, 360, 0.9, 170) + person(480, 530, 1, C.navy),
  };
};
