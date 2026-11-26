module.exports = (L, a) => {
  const {C, ground, skyline, factory, board, person, flag} = L;
  return {
    sun: [1090, 130, 46],
    body: skyline('th', 1000, 500, 1.0, '#C5D0C0') + ground(500) +
      factory(120, 500, 1.2, C.gold) +
      person(430, 500, 1.1, C.navy) + person(500, 500, 1.1, C.teal) +
      board(580, 330, 300, 160, [0.9, 0.7, 0.55, 0.4, 0.3], C.red) +
      flag('th', 1060, 330, 0.9, 120),
  };
};
