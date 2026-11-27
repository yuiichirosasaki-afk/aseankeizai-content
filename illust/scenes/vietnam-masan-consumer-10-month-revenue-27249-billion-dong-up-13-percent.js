module.exports = (L, a) => ({
  sun: [1070, 140, 56],
  body: L.skyline('vn', 1020, 470, 0.9, '#C5D0C0') + L.ground(470) + L.floor(560) +
    L.shop(70, 520, 1.1, L.C.red) + L.stall(360, 540, 0.9, L.C.teal) +
    L.parcel(520, 540, 0.9, L.C.gold) + L.parcel(600, 545, 0.8, '#C9A15A') + L.parcel(560, 480, 0.75, L.C.gold) +
    L.person(250, 545, 0.95, L.C.navy) + L.person(440, 548, 0.9, L.C.blue) +
    L.bars(780, 540, 220, [0.35, 0.5, 0.62, 0.78], [L.C.navy, L.C.navy, L.C.navy, L.C.red], 260) +
    L.arrow(1090, 300, 0.6, 'up', '#3E9C6A') + L.flag('vn', 700, 230, 0.9, 180),
});
