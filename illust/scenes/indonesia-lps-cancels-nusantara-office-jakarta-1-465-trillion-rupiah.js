module.exports = (L, a) => {
  const {C, floor, skyline, bank, blocks, route, coins, arrow, flag, barrier, crane} = L;
  return {
    sun: [1090, 130, 44],
    body: floor(540) +
      blocks(90, 540, [[0, 60, 120], [70, 50, 80], [130, 70, 150]], '#C9D1DC') + crane(300, 540, 0.8, '#9AA5B8') +
      barrier(120, 470, 260) +
      route([[420, 380], [560, 250], [720, 380]], C.red) +
      skyline('id', 900, 540, 1.1, '#CBD5E1') + bank(1030, 540, 0.85) +
      coins(620, 540, 5, 1) + flag('id', 480, 280, 0.8, 170),
  };
};
