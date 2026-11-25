module.exports = (L, a) => {
  const {C, floor, skyline, flag, doc, gavel, coins, bars} = L;
  return {
    sun: [1090, 120, 46],
    body: skyline('ph', 1010, 540, 1.0, '#CBD5E1') + floor(540) +
      flag('ph', 1120, 340, 0.9, 190) +
      doc(180, 520, 1.2, -5, 7) + doc(300, 530, 1.1, 6, 7) + gavel(240, 330, 1.0) +
      bars(520, 520, 300, [0.79, 1.0], ['#9AA7BD', C.navy], 300) + coins(900, 540, 4, 0.9),
  };
};
