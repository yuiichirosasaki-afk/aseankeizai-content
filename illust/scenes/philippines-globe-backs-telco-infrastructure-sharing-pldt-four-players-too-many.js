module.exports = (L, a) => {
  const {C, ground, skyline, tower, signal, person, coins, arrow, route, flag, clouds, palm} = L;
  return {
    sun: [1090, 120, 50],
    body: clouds([[600, 110, 1.0], [880, 160, 0.8]]) + skyline('ph', 940, 470, 0.9, '#C5D0DC') + ground(470, '#D8CBB0') +
      tower(250, 470, 1.3) + tower(560, 470, 1.3) + palm(90, 470, 1.0) +
      signal(250, 190, 40, C.blue) + signal(560, 190, 40, C.blue) +
      route([[290, 240], [400, 200], [520, 240]], C.teal, true) +
      coins(420, 540, 5, 1.0) + coins(500, 540, 3, 0.9) +
      person(700, 548, 0.95, C.navy) + person(780, 550, 0.9, C.red) +
      flag('ph', 840, 250, 0.9, 150),
  };
};
