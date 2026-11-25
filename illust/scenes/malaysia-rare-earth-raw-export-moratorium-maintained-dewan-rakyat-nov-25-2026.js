module.exports = (L, a) => {
  const {C, floor, skyline, factory, barrier, parcel, gavel} = L;
  return {
    sun: [1090, 130, 46],
    body: skyline('my', 1070, 530, 1.05, '#C5D0C0') + floor(530) +
      factory(160, 530, 1.4, C.gold) +
      barrier(460, 420, 240) +
      parcel(540, 400, 1.0, C.gray) + parcel(630, 400, 0.9, C.gray) +
      gavel(830, 470, 0.9),
  };
};
