module.exports = (L, a) => {
  const {C, ground, hills, skyline, track, train, doc, stamp, flag, person, clouds, palm} = L;
  return {
    sun: [1060, 130, 54],
    body: clouds([[600, 110, 1.1], [900, 170, 0.9]]) + hills(400) + skyline('ph', 780, 440, 1.0, '#C5D0DC') + ground(440, '#C9B68A') +
      palm(90, 470, 1) + track(500) + train(100, 500, 0.9, 4) +
      ground(540, '#B9A47A') + person(640, 575, 1.0, C.navy) + person(710, 575, 1.0, C.teal) +
      doc(960, 520, 1.0, -6, 5, [1]) + stamp(990, 470, 0.9) + flag('ph', 1090, 250, 0.75, 170),
  };
};
