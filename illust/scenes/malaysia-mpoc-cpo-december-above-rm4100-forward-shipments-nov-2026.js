module.exports = (L, a) => {
  const {C, ground, sea, palm, cship, board, parcel} = L;
  return {
    sun: [1090, 130, 46],
    body: sea(430) + ground(500) +
      palm(110, 500, 1.3) + palm(230, 500, 1.1) +
      parcel(340, 500, 1.0, C.gold) + parcel(400, 500, 1.0, C.gold) +
      board(470, 300, 280, 140, [0.9, 0.8, 0.7, 0.55, 0.45], C.navy) +
      cship(980, 460, 0.8, 1),
  };
};
