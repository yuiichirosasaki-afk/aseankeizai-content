module.exports = (L, a) => {
  const {C, hills, ground, factory, skyline, gavel, doc, clouds, flag} = L;
  return {
    sun: [1090, 130, 50],
    body: hills(470) + ground(470, C.green) + clouds([[560, 150, 1], [760, 200, 0.8]]) +
      factory(110, 530, 1.2, C.gold) + skyline('th', 560, 470, 0.9) +
      doc(760, 500, 0.8, -6, 5) + gavel(930, 470, 0.55) + flag('th', 1060, 340, 0.9, 170),
  };
};
