module.exports = (L, a) => {
  const {C, sea, ground, flag, cship, crane, parcel, doc, stamp, route} = L;
  return {
    sun: [600, 120, 46],
    body: sea(460, [[90, 540, 60], [330, 600, 70], [880, 560, 60], [1040, 600, 80], [980, 520, 50]]) +
      `<rect x="0" y="400" width="430" height="62" fill="#C2A77E"/><rect x="770" y="400" width="430" height="62" fill="#B5BDCB"/>` +
      crane(330, 400, 0.8) + crane(840, 400, 0.8, C.navy) + parcel(120, 400, 1.0) + parcel(200, 400, 0.9, C.gold) + parcel(960, 400, 1.0) + parcel(1050, 400, 0.9, C.gold) +
      flag('th', 250, 230, 1, 170) + flag('no', 900, 230, 1, 170) + route([[300, 200], [600, 60], [900, 200]], C.navy, false) +
      doc(560, 330, 0.62, -8, 4) + doc(620, 336, 0.62, 6, 4) + stamp(660, 250, 0.7) + cship(600, 520, 0.62, -1),
  };
};
