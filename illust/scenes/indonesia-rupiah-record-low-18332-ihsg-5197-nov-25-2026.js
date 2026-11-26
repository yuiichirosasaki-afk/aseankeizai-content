module.exports = (L, a) => {
  const {C, floor, skyline, board, arrow, flag, coins} = L;
  return {
    sun: [1080, 120, 44],
    body: skyline('id', 1000, 530, 1.1, '#CBD5E1') + floor(530) +
      board(110, 130, 620, 340, [0.72, 0.62, 0.5, 0.36, 0.2], C.navy) +
      arrow(820, 250, 0.8, 'down', C.red) + coins(560, 530, 2, 0.8) + flag('id', 1090, 360, 0.9, 170),
  };
};
