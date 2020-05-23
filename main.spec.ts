jest.mock('@angular-devkit/schematics-cli/bin/schematics');

import * as schematicCli from '@angular-devkit/schematics-cli/bin/schematics';
import { main } from './main';

describe('main function', () => {
  [
    { arg: '--name="carousel"', result: ['--name="carousel"'] },
    { arg: '--name carousel', result: ['--name carousel'] },
    { arg: '--moduleExport="false"', result: ['--moduleExport="false"'] },
    { arg: '--moduleExport="true"', result: ['--moduleExport="true"'] },
    { arg: '--moduleExport false', result: ['--moduleExport false'] },
    { arg: '--moduleExport true', result: ['--moduleExport true'] },
    { arg: '--moduleExport=false', result: ['--moduleExport', false] },
    { arg: '--moduleExport=true', result: ['--moduleExport', true] }
  ].forEach((test, index) => {
    it(`should normalise arguments (${test.arg})`, async () => {
      process.argv = ['', '', 'c', test.arg];

      const expected = {
        args: ['opinionated-schematics:c', ...test.result]
      };

      await main();

      expect((schematicCli.main as jest.Mock).mock.calls[index + 1][0]).toEqual(
        expected
      );
    });
  });
});
