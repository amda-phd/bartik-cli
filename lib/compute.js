const g = 9.8;

// TODO: Tuneable precission
const round = (number) => Math.round(number * 100) / 100;
const degree2rad = (number) => (Math.PI * number) / 180;
const rad2degree = (number) => (number * 180) / Math.PI;

module.exports = ({ initialVelocity: v0, alpha, degrees }) => ({
  v0: round(v0),
  alpha_rad: round(degrees ? degree2rad(alpha) : alpha),
  alpha_degree: round(degrees ? alpha : rad2degree(alpha)),
  h_max: round((v0 * v0) / (2 * g)),
  x_max: round((2 * v0 * Math.sin(degrees ? degree2rad(alpha) : alpha)) / g),
});
