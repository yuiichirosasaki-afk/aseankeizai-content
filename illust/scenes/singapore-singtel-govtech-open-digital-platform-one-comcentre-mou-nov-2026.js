module.exports = (L, a) => {
  const {C, ground, hills, skyline, blocks, tower, signal, chip, rack, route, doc, stamp, flag, person} = L;
  return {
    sun: [1080, 120, 50],
    body: hills(470) + skyline('sg', 900, 500, 1.0, '#CBD5E1') + ground(500) +
      blocks(120, 500, [[0, 90, 250, C.navy], [100, 110, 330, C.blue], [220, 90, 200, C.deep]], C.navy) +
      tower(470, 500, 1.2) + signal(470, 220, 40, C.gold) + signal(470, 220, 70, C.gold) +
      rack(640, 500, 1.0) + chip(790, 440, 0.9) +
      route([[490, 300], [570, 250], [640, 300]], C.teal, true) +
      doc(330, 590, 0.9, -4, 4, [1]) + stamp(400, 585, 0.8) +
      flag('sg', 1040, 330, 0.7, 150),
  };
};
