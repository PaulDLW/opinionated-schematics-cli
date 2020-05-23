# opinionated-schematics-cli

This is essentially a proxy for 'ng g' but using the opinionated-schematics collection

This has a niche use where you want to use the schematics, but you are not allowed to leave a footprint of having opinionated-schematics saved as a dev-dependancy in your package.json

## Usage

use 'os' as the equivalent of 'ng g'. e.g.

`os c --projectName="" --name="carousel" --moduleName="" --moduleExport=false --path="features"`
