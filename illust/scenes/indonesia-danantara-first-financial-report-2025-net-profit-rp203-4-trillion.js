module.exports = (L, a) => {
  const {C, floor, skyline, bank, coins, bars, flag} = L;
  return {
    sun: [1090, 130, 48],
    body: skyline('id', 1030, 530, 1.1, '#CBD5E1') + floor(530) + bank(300, 530, 1.3) +
      coins(500, 530, 5, 1) + coins(580, 530, 3, 1) +
      bars(690, 520, 240, [0.35, 0.5, 0.7, 0.95], [C.navy, C.navy, C.navy, C.gold], 250) +
      flag('id', 90, 360, 0.9, 170),
  };
};
