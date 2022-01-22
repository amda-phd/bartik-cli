const g = 9.8;

// TODO: Tuneable precission
const round = (number) => Math.round(number * 100) / 100;

module.exports = ({ initialVelocity: v, alpha, degrees }) => ({
  h_max: round((v * v) / (2 * g)),
  x_max: round(
    (2 * v * Math.sin(degrees ? (Math.PI * alpha) / 180 : alpha)) / g
  ),
});
