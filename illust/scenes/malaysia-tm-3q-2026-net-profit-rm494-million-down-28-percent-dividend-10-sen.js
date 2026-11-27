module.exports = (L, a) => ({
  sun: [1090, 120, 46],
  top: '#F2F5F8', bot: '#DDE5EE',
  body: L.skyline('my', 160, 470, 1, '#C5D0DC') + L.floor(470) +
    L.rack(480, 470, 1.2) + L.rack(560, 470, 1.2) + L.rack(640, 470, 1.2) + L.tower(820, 470, 1.2) +
    L.signal(822, 250, 30, L.C.teal) +
    L.board(260, 110, 340, 190, [0.8, 0.55, 0.3, 0.6, 0.45], L.C.red) + L.coins(960, 470, 3, 0.9),
});
