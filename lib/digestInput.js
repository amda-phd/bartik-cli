const { resolve } = require("path");
const { readFileSync } = require("fs");

const validate = require("@val");

const DEFAULT_INPUT = "initialValues.json";

module.exports = ({ json, initialVelocity, alpha, degrees }) => {
  let input = { initialVelocity, alpha, degrees };
  if (!initialVelocity) {
    let fileName = DEFAULT_INPUT;
    if (typeof json === "string") fileName = json;
    if (!fileName.includes("json")) fileName = `${fileName}.json`;
    const path = resolve(fileName);
    try {
      readFileSync(path);
    } catch (error) {
      Error.stackTraceLimit = 0;
      throw new Error("Invalid source file name");
    }
    input = require(path);
    validate(input);
  }

  return input;
};
