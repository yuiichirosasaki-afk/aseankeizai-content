module.exports = (L, a) => {
  const {C, floor, skyline, pump, car, bars, arrow} = L;
  return {
    sun: [1090, 130, 46],
    body: skyline('my', 1040, 530, 1.05, '#C5D0C0') + floor(530) +
      pump(160, 530, 1.25) + car(450, 530, 1.4, C.blue) +
      bars(700, 520, 240, [0.9, 0.78, 0.62], [C.gray, C.gray, C.gold], 260) +
      arrow(880, 250, 0.7, 'down', C.teal),
  };
};
