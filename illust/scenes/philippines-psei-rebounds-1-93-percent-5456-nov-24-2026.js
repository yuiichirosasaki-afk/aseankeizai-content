module.exports = (L, a) => ({
  top: '#F7F1E6', bot: '#EBDCC2',
  body: L.hills(470) + L.ground(470)
    + L.skyline('ph', 150, 470, 1.2)
    + L.bank(820, 470, 1.4)
    + L.candles(420, 400, 300, 220, [[0.3,0.2],[0.2,0.1],[0.15,0.35],[0.35,0.5],[0.45,0.7],[0.6,0.85]])
    + L.arrow(1010, 330, 1, 'up', L.C.green)
    + L.flag('ph', 1090, 470, 0.9, 120),
});
