#!/usr/bin/env node
import * as shelljs from "shelljs";

const ANGULAR_CLI_PACKAGE_NAME = "@angular/cli";
const SCHEMATICS_PACKAGE_NAME = "opinionated-schematics";

function main() {
  const args = process.argv.slice(2).join(" ");

  shelljs.config.silent = true;
  const globalNpmInstalls = shelljs.exec("npm list -g --depth=0");
  shelljs.config.silent = false;

  const isInList = globalNpmInstalls.includes(ANGULAR_CLI_PACKAGE_NAME);

  if (!isInList) {
    console.log("@angular/cli is not installed, please install it globally");
    return;
  }

  shelljs.exec(`ng g ${SCHEMATICS_PACKAGE_NAME}:${args}`);
}

main();
