module.exports = (L, a) => {
  const {C, sea, cship, signal, tower, flag, skyline, route, rack} = L;
  return {
    sun: [1090, 130, 48],
    body: sea(380, [[200, 450, 80], [600, 500, 90], [900, 470, 70]]) +
      skyline('vn', 130, 380, 1.1, '#CBD5E1') + skyline('sg', 1060, 380, 1.0, '#CBD5E1') +
      route([[240, 470], [600, 560], [960, 470]], C.gold, false) +
      cship(600, 400, 1.2, 1) + tower(220, 380, 0.9) + tower(980, 380, 0.9) +
      signal(600, 250, 36, C.gold) + flag('vn', 90, 300, 0.7, 120) + flag('sg', 1110, 300, 0.7, 120),
  };
};
