#!/usr/bin/env node

require("module-alias/register");
const { program } = require("commander");
const chalk = require("chalk");
const { log } = console;

const { version, description } = require("@pack");

const DEFAULT_INPUT = "initialValues.json";
const DEFAULT_OUTPUT = "results.json;";

program
  .description(description)
  .version(version)
  .option(
    "-m, --manual <initialVelocity, alpha>",
    "Introduce initial velocity and inclination manually, separated by a comma"
  )
  .option(
    "-j, --JSON [inputFileName]",
    `Compute ballistics for the values contained in a JSON file. If no filename is provided, the program will look for ./${DEFAULT_INPUT}`,
    DEFAULT_INPUT
  )
  .option(
    "-o, --output [outputFileName]",
    `Name of the file where the results will be stored. If the option is not invoqued, the results will only be presented through the logshell. If no output file name is provided, the results will be saved on ${DEFAULT_OUTPUT}`,
    DEFAULT_OUTPUT
  )
  .parse();

log(chalk.blue("Hello World!"));
const options = program.opts();
if (options.initialVelocity) console.log(options.initialVelocity);

// TODO: Validate input, set default inputs
// TODO: Select the way to introduce the data (JSON or Manual)
// TODO: Compute the maximum height of the projectile
// TODO: Compute the maximum traveled distance
// TODO: Save the computed data (Inputs + Results) into a file
