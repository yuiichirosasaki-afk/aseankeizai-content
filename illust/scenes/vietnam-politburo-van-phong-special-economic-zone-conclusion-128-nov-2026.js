module.exports = (L, a) => {
  const {C, hills, sea, ground, cship, crane, factory, blocks, doc, stamp, flag, sprout} = L;
  return {
    sun: [1060, 130, 54],
    body: hills(400) + sea(400, [[80, 450, 90], [300, 480, 110], [560, 540, 100]]) + ground(500) +
      crane(300, 500, 1.2, C.red) + cship(470, 440, 0.9, 1) +
      factory(640, 500, 1.1, C.gold) + blocks(820, 500, [[0, 80, 160, C.navy], [90, 70, 220, C.blue]], C.navy) +
      sprout(200, 500, 1.2) +
      doc(960, 585, 1.0, -3, 4, [0]) + stamp(1040, 580, 0.9) +
      flag('vn', 1100, 360, 0.7, 150),
  };
};
