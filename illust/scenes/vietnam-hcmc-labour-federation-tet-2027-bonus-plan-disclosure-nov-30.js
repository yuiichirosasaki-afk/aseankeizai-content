module.exports = (L, a) => ({
  sun: [1060, 140, 54],
  body: L.skyline('vn', 1010, 470, 0.95, '#C5D0C0') + L.ground(470) + L.floor(560) +
    L.factory(60, 540, 1.1, L.C.gold) +
    [330, 400, 470, 540].map((x, i) => L.person(x, 548, 0.95, [L.C.navy, L.C.red, L.C.blue, L.C.teal][i])).join('') +
    L.env(680, 470, 0.9) + L.env(760, 490, 0.8) + L.coins(640, 548, 4, 0.8) +
    L.doc(860, 520, 0.9, -5, 5, [1]) + L.stamp(900, 440, 0.8) + L.flag('vn', 1120, 250, 0.9, 180),
});
