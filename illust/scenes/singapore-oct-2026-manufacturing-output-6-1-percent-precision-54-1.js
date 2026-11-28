module.exports = (L, a) => {
  const {C, ground, skyline, factory, chip, bars, arrow, flag, hills} = L;
  return {
    sun: [1090, 130, 48],
    body: hills(470) + ground(480) + skyline('sg', 150, 480, 1.1, '#CBD5E1') +
      factory(400, 480, 1.2) + chip(740, 430, 1.1) +
      bars(900, 480, 170, [0.9, 0.3, 0.2, 0.1], [C.red, C.blue, C.teal, C.gray], 240) +
      arrow(640, 190, 0.7, 'up', C.red) + flag('sg', 1060, 320, 0.8, 160),
  };
};
