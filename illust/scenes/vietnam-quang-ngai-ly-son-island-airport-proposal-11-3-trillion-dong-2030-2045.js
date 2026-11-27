module.exports = (L, a) => {
  const {C, sea, plane, palm, house, flag, doc, hills, ground, person} = L;
  return {
    sun: [1090, 130, 48],
    body: hills(430) + sea(430, [[150, 470, 90], [500, 510, 80], [850, 480, 100]]) +
      ground(540) + plane(700, 300, 1.4) + palm(300, 540, 1) + palm(380, 545, 0.9) +
      house(900, 540, 1.2, true) + doc(560, 530, 1, -5, 4, [1]) + flag('vn', 90, 360, 0.9, 170) +
      person(480, 540, 1, C.teal),
  };
};
