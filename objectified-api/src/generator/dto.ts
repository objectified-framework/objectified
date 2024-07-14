/**
 * This is a purpose-built Data Type Object (DTO) generator.
 *
 * It reads the openapi.yaml file, traverses the `#/components/schemas` section, and generates DTO objects
 * compatible for use with NestJS and React applications.  These DTO objects are decorated with
 * annotations from the NestJS Swagger library.
 */
import {generateDtos} from './nestjs';

const VERSION: string = '0.1.1';
const DTO_DIRECTORY: string = 'src/generated/dto';

(async () => {
  const fs = require('fs');
  const yaml = require('yaml');
  const { Command, Option } = require('commander');
  const program = new Command();
  const fileData = fs.readFileSync('./api/openapi.yaml', 'utf8');
  const openapi = yaml.parse(fileData);
  const generatorDirectories = fs.readdirSync('./', { recursive: true, withFileTypes: false })
    .filter((x) => {
      if (x.startsWith('node_modules')) {
        return false;
      }

      if (!x.startsWith('dist/')) {
        return false;
      }

      const stat = fs.statSync(x);

      return stat.isDirectory();
    })
    .map((x) => x.substring(x.lastIndexOf('/') + 1));

  program
    .option('-o, --out <directory>', 'output directory for generated DTOs', DTO_DIRECTORY)
    .addOption(new Option('-g <generator>', 'output generator to use').choices(generatorDirectories))
    .parse();

  console.log(`DTO Generator: ${VERSION}`);

  fs.rmSync(DTO_DIRECTORY, { recursive: true, force: true });
  fs.mkdirSync(DTO_DIRECTORY, { recursive: true });

  console.log(`Generating DTOs`);

  const dtoGenerator = require(`./${program.opts().g}`);

  dtoGenerator.generateDtos(program.opts().out, openapi);
})();
