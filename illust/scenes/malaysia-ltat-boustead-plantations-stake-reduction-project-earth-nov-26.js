module.exports = (L, a) => ({
  sun: [1070, 130, 52],
  top: '#F3EFE4', bot: '#E8DDC3',
  body: L.hills(450) + L.ground(450, L.C.green) +
    L.palm(90, 470, 1.1) + L.palm(190, 475, 0.9) + L.palm(290, 470, 1) + L.palm(380, 478, 0.8) +
    L.bank(640, 470, 1.2) + L.pie(930, 280, 110, 0.35, L.C.gold) + L.coins(850, 470, 4, 0.9) +
    L.flag('my', 1060, 330, 0.9, 140),
});
