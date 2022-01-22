#!/usr/bin/env node

require("module-alias/register");
const { program } = require("commander");
const chalk = require("chalk");
const { log } = console;

const { version, description, name } = require("@pack");

program
  .name(name)
  .description(description)
  .version(version)
  .option("-v0, --initialVelocity <velocity>")
  .parse();

log(chalk.blue("Hello World!"));
const options = program.opts();
if (options.initialVelocity) console.log(options.initialVelocity);

// TODO: Introduce the following data using the command line
// TODO: Validate input, set default inputs
// TODO: Select the way to introduce the data (JSON or Manual)
// TODO: Compute the maximum height of the projectile
// TODO: Compute the maximum traveled distance
// TODO: Save the computed data (Inputs + Results) into a file
