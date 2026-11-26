module.exports = (L, a) => {
  const {C, ground, sea, skyline, cship, crane, parcel, barrier, tag, flag, gavel} = L;
  return {
    sun: [1090, 130, 46],
    body: sea(440) + ground(500) +
      skyline('vn', 940, 500, 0.9, '#C5D0C0') +
      crane(190, 500, 1.0, C.navy) + parcel(320, 500, 1.0, C.gold) + parcel(380, 500, 0.9, C.teal) +
      cship(620, 470, 0.85, -1) +
      barrier(470, 500, 150) + tag(545, 300, 1.0, -8) +
      flag('us', 60, 150, 0.8, 150) + flag('vn', 1090, 340, 0.8, 150),
  };
};
