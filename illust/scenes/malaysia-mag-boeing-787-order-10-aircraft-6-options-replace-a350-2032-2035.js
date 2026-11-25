module.exports = (L, a) => {
  const {C, clouds, skyline, ground, plane, flag, hills} = L;
  return {
    sun: [1060, 130, 56],
    body: clouds([[720, 150, 1], [360, 200, 0.8]]) + hills(500) + skyline('my', 1010, 500, 1.1, '#C5D0C0') + ground(500, C.green) +
      plane(520, 280, 1.9) + plane(250, 400, 0.7) + flag('my', 110, 330, 0.9, 170),
  };
};
