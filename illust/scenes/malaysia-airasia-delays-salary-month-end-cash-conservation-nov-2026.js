module.exports = (L, a) => {
  const {C, clouds, skyline, ground, hills, plane, flag, person, coins, doc, env, g} = L;
  return {
    sun: [1060, 130, 56],
    body: clouds([[700, 140, 1], [380, 190, 0.8]]) + hills(470) + skyline('my', 1010, 470, 1.0, '#C5D0C0') + ground(470, C.green) +
      plane(560, 270, 1.7) + plane(250, 380, 0.6) +
      person(120, 570, 1.0, C.navy) + person(190, 570, 1.0, '#5B6B85') + person(260, 570, 1.0, C.navy) +
      env(420, 560, 0.9) + doc(520, 560, 0.8, -6, 4) + coins(700, 570, 2, 0.85) + flag('my', 1130, 300, 0.8, 170),
  };
};
