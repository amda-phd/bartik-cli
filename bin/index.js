#!/usr/bin/env node

require("module-alias/register");
const { program } = require("commander");

const { version, description } = require("@pack");
const validate = require("@val");
const compute = require("@compute");

const DEFAULT_INPUT = "initialValues.json";
const DEFAULT_OUTPUT = "results.json;";

program
  .description(description)
  .version(version)
  .option(
    "-v0, --initialVelocity <v0>",
    "Projectile's initial velocity in m/s^2. Required for manual input"
  )
  .option(
    "-a, --alpha <alpha>",
    "Projectile's initial inclination in radians. Use the option --degrees for degrees"
  )
  .option(
    "-d, --degrees",
    "Add this in order to use alpha in degrees instead of radians"
  )
  .option(
    "-j, --JSON [inputFileName]",
    `Compute ballistics for the values contained in a JSON file. If no filename is provided, the program will look for ./${DEFAULT_INPUT}`
  )
  .option(
    "-o, --output [outputFileName]",
    `Name of the file where the results will be stored. If the option is not invoqued, the results will only be presented through the logshell. If no output file name is provided, the results will be saved on ${DEFAULT_OUTPUT}`,
    DEFAULT_OUTPUT
  )
  .parse();

const options = program.opts();
validate(options);
console.table(compute(options));

// TODO: Parse JSON input
// TODO: Parse JSON with multiple inputs
// TODO: Save the computed data (Inputs + Results) into a file
