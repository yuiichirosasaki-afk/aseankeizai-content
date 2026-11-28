module.exports = (L, a) => {
  const {C, ground, hills, skyline, rack, pylon, flag, signal, doc, stamp} = L;
  return {
    sun: [1090, 130, 48],
    body: hills(470) + ground(480) + skyline('th', 170, 480, 0.95) +
      rack(500, 480, 1.1) + rack(590, 480, 1.1) + rack(680, 480, 1.1) + signal(590, 250, 40, C.gold) +
      pylon(940, 480, 1.0) + doc(1080, 500, 0.7, -6, 4) + stamp(1115, 445, 0.65) + flag("th", 810, 290, 0.8, 150),
  };
};
