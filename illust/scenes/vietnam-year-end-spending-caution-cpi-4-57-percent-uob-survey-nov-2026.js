module.exports = (L, a) => {
  const {C, floor, skyline, stall, person, safe, coins, flag} = L;
  return {
    sun: [1090, 130, 44],
    body: skyline('vn', 1000, 530, 1.1, '#CBD5E1') + floor(530) +
      stall(160, 545, 0.95, C.red) + person(290, 545, 0.95, C.navy) + person(360, 545, 0.85, C.gold) +
      safe(560, 540, 1.1) + coins(700, 540, 4, 0.9) + flag('vn', 1090, 340, 0.9, 175),
  };
};
