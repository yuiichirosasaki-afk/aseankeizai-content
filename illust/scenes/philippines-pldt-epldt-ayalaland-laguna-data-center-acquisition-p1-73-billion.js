module.exports = (L, a) => {
  const {C, floor, rack, signal, coins, flag, blocks, doc, stamp, tower, person} = L;
  return {
    sun: [1090, 130, 48],
    body: floor(530) + blocks(560, 530, [[0, 120, 190, C.navy], [140, 110, 150, C.blue]], C.navy) +
      rack(700, 530, 1.2) + rack(780, 530, 1.2) + rack(860, 530, 1.2) +
      signal(780, 270, 40, C.gold) + tower(980, 530, 1) +
      coins(430, 530, 4, 1) + doc(330, 510, 1, -4, 4, [1]) + stamp(330, 420, 0.8) +
      flag('ph', 90, 360, 0.9, 170) + person(500, 530, 1, C.red),
  };
};
