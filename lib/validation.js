const joi = require("joi");

const schema = joi
  .object({
    initialVelocity: joi
      .number()
      .min(0)
      .max((3 * 10) ^ 9),
    alpha: joi.when("degrees", {
      is: joi.exist(),
      then: joi.number().min(0).max(90),
      otherwise: joi
        .number()
        .min(0)
        .max(Math.PI / 2),
    }),
    degrees: joi.boolean(),
    JSON: joi.any(),
    output: joi.string(),
  })
  .with("initialVelocity", "alpha")
  .with("degrees", "alpha")
  .xor("initialVelocity", "JSON");

// TODO: Better error messages for hardcoded numerical 'logical' limits

module.exports = (options) => {
  try {
    joi.attempt(options, schema);
  } catch (error) {
    Error.stackTraceLimit = 0;
    throw new Error(error.message);
  }
};
