module.exports = (L, a) => {
  const {C, ground, sea, skyline, factory, cship, crane, parcel, barrier, tag, flag} = L;
  return {
    sun: [1080, 130, 50],
    body: sea(440) + ground(500) +
      skyline('id', 940, 500, 0.9, '#C5D0C0') +
      factory(120, 500, 1.1, C.gold) + parcel(300, 500, 1.0, C.gray) + parcel(360, 500, 0.9, C.gold) +
      cship(640, 470, 0.8, -1) +
      barrier(470, 500, 150) + tag(545, 300, 1.0, -8) +
      flag('us', 60, 150, 0.8, 150) + flag('id', 1090, 340, 0.8, 150),
  };
};
