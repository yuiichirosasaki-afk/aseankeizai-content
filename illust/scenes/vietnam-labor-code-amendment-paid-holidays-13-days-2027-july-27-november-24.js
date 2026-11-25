module.exports = (L, a) => {
  const {C, floor, factory, person, doc, stamp, flag, g} = L;
  let cal = '';
  for (let i = 0; i < 13; i++) {
    cal += `<rect x="${560 + (i % 5) * 52}" y="${150 + Math.floor(i / 5) * 52}" width="44" height="44" rx="6" fill="${i >= 11 ? C.gold : C.navy}"/>`;
  }
  return {
    sun: [1080, 130, 46],
    body: floor(540) + factory(130, 540, 1.3, '#F3C95C') + person(380, 540, 1, C.blue, '#FFFFFF') + person(450, 540, 1, C.teal, '#FFFFFF') +
      g(0, 0, 1, cal) + doc(960, 420, 0.9, 6, 5) + stamp(1010, 330, 0.9) + flag('vn', 760, 400, 0.8, 160),
  };
};
