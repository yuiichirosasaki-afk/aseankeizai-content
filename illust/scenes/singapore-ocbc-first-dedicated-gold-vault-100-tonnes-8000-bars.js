module.exports = (L, a) => {
  const {C, ground, skyline, bank, safe, coins, clouds, flag} = L;
  return {
    sun: [1080, 120, 50],
    body: clouds([[620, 110, 1.1], [900, 160, 0.8]]) + ground(470, '#D8CBB0') +
      skyline('sg', 330, 470, 1.0, '#C5D0DC') + bank(640, 470, 1.2) +
      safe(900, 470, 1.4) + coins(1040, 470, 6, 1.0) + coins(150, 470, 4, 1.0) +
      coins(1100, 470, 3, 0.9) + flag('sg', 760, 270, 0.9, 150),
  };
};
