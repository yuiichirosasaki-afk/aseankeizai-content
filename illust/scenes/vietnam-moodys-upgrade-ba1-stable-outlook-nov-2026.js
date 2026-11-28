module.exports = (L, a) => {
  const {C, floor, bank, arrow, flag, stamp, doc, skyline, coins} = L;
  return {
    body: skyline('vn', 1000, 540, 0.95, '#D3DBE5') + floor(540) + bank(300, 540, 1.2) +
      arrow(300, 160, 0.8, 'up', C.red) + flag('vn', 560, 330, 0.9, 210) +
      doc(740, 520, 0.9, -6, 5) + stamp(790, 440, 0.9) + coins(900, 545, 5, 0.9),
  };
};
