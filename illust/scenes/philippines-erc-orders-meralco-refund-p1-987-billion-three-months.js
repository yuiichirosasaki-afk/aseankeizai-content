module.exports = (L, a) => {
  const {C, hills, ground, skyline, pylon, wire, house, bulb, coins, doc, stamp, route, clouds} = L;
  return {
    sun: [1060, 130, 55],
    body: clouds([[640, 120, 1.0], [900, 170, 0.8]]) + hills(470) + ground(470) +
      skyline('ph', 300, 470, 1.0, '#C5D0DC') +
      pylon(130, 470, 1.1) + pylon(520, 470, 1.1) + wire([130, 250], [520, 250], 20) +
      house(760, 470, 1.2, true) + house(900, 470, 1.0, true) +
      bulb(1040, 400, 1.0) + coins(640, 560, 6, 1.0) + doc(170, 560, 0.9, -4, 4) + stamp(235, 520, 0.8) +
      route([[640, 480], [700, 380], [760, 340]], C.teal, true),
  };
};
