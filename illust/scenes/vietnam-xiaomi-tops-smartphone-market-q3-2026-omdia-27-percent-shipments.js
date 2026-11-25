module.exports = (L, a) => {
  const {C, floor, skyline, phone, bars, flag} = L;
  const scr = (col) => `<rect x="-42" y="-84" width="84" height="40" rx="8" fill="${col}"/>` +
    [0, 1, 2].map(i => `<rect x="-42" y="${-34 + i * 30}" width="84" height="22" rx="5" fill="#E1E8F0"/>`).join('');
  return {
    sun: [1080, 130, 46],
    body: skyline('vn', 1040, 530, 1.1, '#CBD5E1') + floor(530) +
      phone(200, 360, 1.3, scr(C.gold)) + phone(340, 380, 1.1, scr(C.blue)) + phone(460, 395, 0.95, scr(C.teal)) +
      bars(600, 520, 280, [0.8, 0.8, 0.56, 0.47, 0.18], [C.gold, C.blue, C.navy, C.navy, C.navy], 280) +
      flag('vn', 900, 330, 0.8, 170),
  };
};
