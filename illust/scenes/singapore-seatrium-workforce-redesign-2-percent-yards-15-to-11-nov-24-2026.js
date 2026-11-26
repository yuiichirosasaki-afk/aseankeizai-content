module.exports = (L, a) => {
  const {C, ground, sea, cship, crane, person, tag, flag, doc} = L;
  return {
    sun: [1080, 130, 50],
    body: sea(430) + ground(500) +
      crane(180, 500, 1.1, C.navy) + crane(400, 500, 0.9, C.blue) +
      cship(760, 470, 1.0, 1) +
      person(560, 540, 1, C.navy, '#FFFFFF') + person(620, 540, 1, C.teal, '#FFFFFF') + person(680, 540, 1, C.gold, '#FFFFFF') +
      doc(900, 560, 0.7, 6, 4, [1]) + flag('sg', 1090, 340, 0.8, 150),
  };
};
