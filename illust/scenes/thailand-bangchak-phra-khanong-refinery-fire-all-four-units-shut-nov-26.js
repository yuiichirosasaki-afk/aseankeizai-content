module.exports = (L, a) => ({
  sun: [1060, 140, 56],
  top: '#F3EDE3', bot: '#E6D7BE',
  body: L.hills(470) + L.ground(470) + L.skyline('th', 150, 470, 0.9, '#C5CDDB') +
    L.gasPlant(420, 470, 1.5) + L.gasPlant(640, 470, 1.2) + L.factory(820, 470, 1) +
    L.barrier(560, 560, 260) + L.warn(930, 500, 1.2) + L.flag('th', 1040, 330, 1, 150),
});
