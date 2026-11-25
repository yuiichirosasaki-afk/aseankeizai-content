module.exports = (L, a) => {
  const {C, floor, skyline, flag, bell, doc, magnifier, stamp, coins} = L;
  return {
    sun: [1090, 120, 46],
    body: skyline('id', 1000, 530, 1.1, '#CBD5E1') + floor(530) +
      flag('id', 1110, 330, 0.9, 200) +
      bell(250, 320, 1.0) + coins(240, 530, 4, 0.9) +
      doc(520, 510, 1.0, -6, 6) + doc(630, 520, 0.9, 7, 6) + magnifier(700, 420, 1.0) + stamp(430, 440, 0.8),
  };
};
