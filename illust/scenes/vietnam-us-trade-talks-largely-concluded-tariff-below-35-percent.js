module.exports = (L, a) => {
  const {C, hills, ground, sea, clouds, cship, crane, parcel, flag, doc, stamp, arrow, tag, skyline, barrier} = L;
  return {
    sun: [1080, 130, 54],
    body: clouds([[620, 110, 1.0], [900, 160, 0.8]]) + hills(430) + skyline('vn', 960, 430, 0.9, '#C5D0DC') +
      sea(430, [[80, 470, 90], [520, 490, 110]]) + ground(430, '#D8CBB0') +
      crane(130, 520, 1.2, C.navy) + parcel(260, 535, 0.9, C.gold) + parcel(330, 540, 0.8, '#C9A15A') +
      cship(520, 575, 1.0, 1) +
      flag('vn', 600, 230, 1.0, 160) + flag('us', 760, 230, 1.0, 160) +
      doc(680, 470, 1.1, -4, 5, [1, 3]) + stamp(740, 480, 0.9) +
      arrow(1040, 360, 0.6, 'down', '#3E9C6A') + tag(930, 330, 0.9, -8),
  };
};
