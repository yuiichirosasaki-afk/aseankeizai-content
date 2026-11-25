module.exports = (L, a) => {
  const {C, ground, sea, clouds, gasPlant, lng, pylon, wire, flag, factory} = L;
  return {
    sun: [1060, 130, 55],
    body: clouds([[700, 150, 1], [300, 190, 0.8]]) + sea(400, [[100, 440, 120], [420, 470, 140], [760, 450, 120]]) +
      lng(240, 410, 1.3) + ground(470, '#C9B68A') +
      gasPlant(640, 500, 1.4) + gasPlant(820, 500, 1.4) +
      pylon(1085, 500, 1.1) + flag('vn', 130, 330, 0.8, 150),
  };
};
