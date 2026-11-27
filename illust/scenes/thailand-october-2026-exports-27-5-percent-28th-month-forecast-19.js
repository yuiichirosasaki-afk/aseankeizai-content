module.exports = (L, a) => {
  const {C, hills, ground, sea, clouds, cship, crane, parcel, flag, factory, chip, bars, arrow, skyline} = L;
  return {
    sun: [1090, 130, 52],
    body: clouds([[640, 120, 1.0], [900, 170, 0.8]]) + hills(440) +
      sea(440, [[100, 470, 90], [520, 495, 110]]) + ground(440, '#D8CBB0') +
      factory(110, 525, 1.3, C.gold) + chip(350, 520, 0.9) + crane(500, 525, 1.2, C.navy) +
      parcel(590, 535, 0.9, C.gold) + parcel(660, 540, 0.8, '#C9A15A') + cship(850, 580, 1.0, 1) +
      bars(780, 400, 210, [0.3, 0.45, 0.62, 0.82, 1.0], [C.navy, C.navy, C.navy, C.navy, C.red], 170) +
      arrow(1080, 300, 0.6, 'up', '#3E9C6A') + flag('th', 190, 250, 0.9, 140),
  };
};
