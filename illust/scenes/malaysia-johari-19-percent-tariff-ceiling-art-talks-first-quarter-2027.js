module.exports = (L, a) => {
  const {C, ground, sea, skyline, cship, crane, parcel, barrier, tag, flag, doc} = L;
  return {
    sun: [1080, 130, 48],
    body: sea(440) + ground(500) +
      skyline('my', 900, 500, 0.85, '#C5D0C0') +
      crane(200, 500, 1.0, C.navy) + parcel(330, 500, 1.0, C.gold) + parcel(390, 500, 0.9, C.red) +
      cship(640, 470, 0.8, -1) +
      barrier(470, 500, 150) + tag(545, 300, 1.0, -8) +
      doc(740, 560, 0.7, 6, 4, [1]) +
      flag('us', 60, 150, 0.8, 150) + flag('my', 1090, 340, 0.8, 150),
  };
};
