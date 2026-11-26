module.exports = (L, a) => {
  const {C, sea, ground, palm, person, flag, coins, g, signal} = L;
  const arena = `<g transform="translate(560,0)"><path d="M0 470 L0 330 C0 270 80 240 190 240 C300 240 380 270 380 330 L380 470 Z" fill="#E8E1D2" stroke="${C.navy}" stroke-width="4"/>` +
    `<rect x="40" y="300" width="300" height="14" fill="${C.red}"/><rect x="40" y="330" width="300" height="10" fill="${C.gold}"/>` +
    [0,1,2,3,4,5,6].map(i => `<rect x="${52 + i * 40}" y="352" width="26" height="60" rx="4" fill="${C.blue}" opacity="0.75"/>`).join('') +
    `<rect x="150" y="430" width="80" height="40" rx="6" fill="${C.navy}"/><path d="M60 240 L320 240 L190 205 Z" fill="${C.navy}"/></g>`;
  const ring = `<g transform="translate(160,0)"><path d="M0 500 L260 500 L220 440 L40 440 Z" fill="#F7F1E6" stroke="${C.navy}" stroke-width="4"/>` +
    `<path d="M0 500 L0 400 M260 500 L260 400 M40 440 L40 360 M220 440 L220 360" stroke="${C.navy}" stroke-width="5"/>` +
    `<path d="M0 420 L260 420 M40 385 L220 385" stroke="${C.red}" stroke-width="5"/></g>`;
  return {
    sun: [1060, 130, 56],
    body: sea(470, [[120, 520, 70], [420, 560, 60], [980, 540, 80]]) + ground(500, '#E5D3A5') +
      ring + arena + palm(80, 500, 1.1) + palm(1150, 500, 1.0) +
      person(470, 580, 0.9, C.teal) + person(520, 580, 0.9, C.gold) + person(600, 585, 0.9, C.navy) +
      person(980, 585, 0.9, C.red) + flag('th', 1060, 300, 0.8, 150),
  };
};
