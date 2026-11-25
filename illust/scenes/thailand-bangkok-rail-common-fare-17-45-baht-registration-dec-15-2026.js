module.exports = (L, a) => {
  const {C, ground, skyline, track, phone, person, flag, coins, g} = L;
  // 旅客列車（3両）：貨物ではなく窓のある車両
  const car = (x, nose) => `<g transform="translate(${x},0)"><rect x="0" y="392" width="190" height="86" rx="14" fill="${nose ? C.navy : '#E8EDF5'}" stroke="${C.navy}" stroke-width="3"/>` +
    [0, 1, 2, 3].map(i => `<rect x="${16 + i * 42}" y="410" width="30" height="26" rx="4" fill="${C.blue}" opacity="0.75"/>`).join('') +
    `<rect x="0" y="452" width="190" height="8" fill="${C.red}"/><circle cx="40" cy="480" r="9" fill="${C.navy}"/><circle cx="150" cy="480" r="9" fill="${C.navy}"/></g>`;
  return {
    sun: [1080, 120, 50],
    body: skyline('th', 300, 330, 0.85, '#D6C9B0') + ground(330, '#C9B68A') +
      track(490) + g(0, 0, 1, car(90, true) + car(290, false) + car(490, false)) +
      ground(540, '#B9A47A') + person(780, 570, 1.0, C.navy) + person(870, 570, 1.0, C.teal) + person(960, 570, 1.0, C.gold) +
      phone(1060, 360, 0.9, `<rect x="-36" y="-60" width="72" height="44" rx="8" fill="${C.blue}"/><circle cx="0" cy="20" r="14" fill="${C.gold}"/>`) +
      flag('th', 1150, 200, 0.8, 150) + coins(700, 570, 3, 0.8),
  };
};
