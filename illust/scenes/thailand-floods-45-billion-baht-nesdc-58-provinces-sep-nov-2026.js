module.exports = (L, a) => {
  const {C, ground, hills, clouds, house, factory, palm, waves, person, arrow, warn, coins, skyline} = L;
  return {
    top: '#DCE3EA', bot: '#EDE6D6',
    body: clouds([[300, 120, 1.2], [700, 90, 1.4], [980, 150, 1.0]]) + hills(430) + ground(430, '#C9B68A') +
      skyline('th', 960, 470, 0.7, '#C5D0DC') +
      house(520, 500, 1.4, false) + house(700, 505, 1.2, false) + house(850, 505, 1.1, false) +
      factory(250, 500, 1.2, '#B9C3D0') + palm(110, 500, 1) +
      `<rect x="0" y="478" width="1200" height="152" fill="#6FA8C9" opacity="0.88"/>` +
      waves([[60, 520, 80], [300, 560, 90], [540, 600, 70], [820, 540, 90], [1000, 590, 80], [1120, 520, 60]]) +
      person(430, 520, 0.9, C.navy) + warn(1110, 330, 0.8) + arrow(620, 330, 0.5, 'down', C.red) + coins(1080, 590, 3, 0.8),
  };
};
