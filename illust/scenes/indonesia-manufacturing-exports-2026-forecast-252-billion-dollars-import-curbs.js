module.exports = (L, a) => {
  const {C, ground, skyline, factory, cship, crane, sea, parcel, bars, arrow, barrier, flag, clouds} = L;
  return {
    sun: [1080, 130, 52],
    body: clouds([[600, 120, 1.0], [880, 170, 0.8]]) + skyline('id', 980, 440, 0.8, '#C5D0DC') +
      sea(440, [[100, 470, 90], [500, 490, 110]]) + ground(440, '#D8CBB0') +
      factory(110, 520, 1.3, C.gold) + factory(330, 520, 1.1, C.gold) +
      crane(620, 520, 1.2, C.navy) + parcel(740, 530, 0.9, C.gold) + parcel(810, 535, 0.8, '#C9A15A') +
      cship(900, 575, 1.0, 1) +
      bars(380, 600, 180, [0.35, 0.5, 0.7, 0.9], [C.navy, C.navy, C.navy, C.red], 130) +
      arrow(1090, 330, 0.6, 'up', '#3E9C6A') + flag('id', 160, 250, 0.9, 150),
  };
};
