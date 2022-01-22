const { writeFileSync } = require("fs");

module.exports = (response, fileName) => {
  writeFileSync(fileName, JSON.stringify(response, null, 4));
  console.log(`The trajectory has been saved to ${fileName}`);
};
