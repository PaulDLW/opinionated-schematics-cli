#!/usr/bin/env node
import * as schematicCli from "@angular-devkit/schematics-cli/bin/schematics";

const PACKAGE_NAME = "opinionated-schematics";

async function main() {
  const args = process.argv.slice(2);

  const argsForNormalising = [`${PACKAGE_NAME}:${args[0]}`, ...args.slice(1)];

  const normalisedArgs = argsForNormalising.reduce(
    (args, arg) => [...args, ...normaliseArg(arg)],
    [] as string[]
  );

  console.log("normalisedArgs: ", normalisedArgs);

  await schematicCli.main({ args: normalisedArgs });
}

function normaliseArg(arg: string) {
  if (arg.includes("=true")) {
    const splitArg = arg.split("=") as any;
    splitArg[1] = true;
    return splitArg;
  } else if (arg.includes("=false")) {
    const splitArg = arg.split("=") as any;
    splitArg[1] = false;
    return splitArg;
  } else {
    const normArg = arg === "true" ? true : arg === "false" ? false : arg;

    return [normArg] as string[];
  }
}

main();
