module.exports = (L, a) => {
  const {C, ground, skyline, cship, sea, factory, bars, flag} = L;
  return {
    sun: [1090, 130, 46],
    body: sea(470) + ground(500) +
      skyline('vn', 1000, 500, 0.9, '#C5D0C0') +
      cship(260, 470, 0.9, 1) +
      factory(620, 500, 1.0, C.gold) +
      bars(780, 500, 140, [0.35, 0.6, 0.9], [C.gray, C.gray, C.gold], 200) +
      flag('vn', 1060, 330, 0.9, 120),
  };
};
