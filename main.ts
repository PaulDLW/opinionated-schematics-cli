#!/usr/bin/env node
import * as schematicCli from '@angular-devkit/schematics-cli/bin/schematics';

const PACKAGE_NAME = 'opinionated-schematics';

export async function main() {
  // ignore the first two arguments, they contain the path to the node exe
  // and the path to the script file
  const args = process.argv.slice(2);

  // grab the schematic name from the first arg, use the rest of the array as
  // as parameters for the schematic
  const argsForNormalising = [`${PACKAGE_NAME}:${args[0]}`, ...args.slice(1)];

  const normalisedArgs = argsForNormalising.reduce(
    (normArgs, arg) => [...normArgs, ...normaliseArg(arg)],
    [] as string[]
  );

  await schematicCli.main({ args: normalisedArgs });
}

function normaliseArg(arg: string) {
  if (arg.includes('=true')) {
    const splitArg = arg.split('=') as any;
    splitArg[1] = true;
    return splitArg;
  } else if (arg.includes('=false')) {
    const splitArg = arg.split('=') as any;
    splitArg[1] = false;
    return splitArg;
  } else {
    const normArg = arg === 'true' ? true : arg === 'false' ? false : arg;

    return [normArg] as string[];
  }
}

main();
