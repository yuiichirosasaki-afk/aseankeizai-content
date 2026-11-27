module.exports = (L, a) => ({
  sun: [1060, 120, 50],
  top: '#EEF2F8', bot: '#DCE6F2',
  body: L.clouds([[200, 200, 1], [900, 240, 0.9], [620, 130, 0.7]]) +
    L.hills(480) + L.ground(480) + L.palm(1080, 500, 1) + L.palm(1000, 500, 0.8) +
    L.flag('no', 150, 360, 1, 130) + L.flag('th', 960, 340, 1, 150) +
    L.route([[240, 330], [600, 150], [940, 330]], L.C.navy, true) +
    L.plane(600, 300, 1.1) + L.barrier(420, 560, 360) + L.warn(180, 540, 1),
});
