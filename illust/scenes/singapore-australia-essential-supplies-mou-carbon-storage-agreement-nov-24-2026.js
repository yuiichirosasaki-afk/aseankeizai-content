module.exports = (L, a) => {
  const {C, sea, skyline, ground, cship, crane, parcel, factory, route, clouds, bulb, doc, stamp} = L;
  return {
    sun: [1080, 120, 50],
    body: clouds([[620, 110, 1.1], [900, 160, 0.8]]) + sea(470, [[160, 520, 80], [420, 560, 90], [700, 520, 90], [950, 575, 80]]) +
      ground(470, '#C9B68A') + skyline('sg', 330, 470, 1.0, '#C5D0DC') + crane(560, 470, 1.0, C.red) +
      parcel(640, 470, 1, '#C9A36B') + parcel(700, 470, 0.9, '#B98F55') +
      cship(520, 560, 1.0, 1) + factory(1000, 470, 1.0, '#B9C3D0') +
      route([[1000, 330], [820, 250], [650, 330]], C.teal, true) + doc(150, 570, 0.9, -5, 4) + stamp(215, 520, 0.8),
  };
};
