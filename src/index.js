import fs from 'fs';
import path from 'path';
import parser from 'xml2json';
import {generateRandomFiles} from './utils';

let mraFile = '';
let traceLevel = 0;
let mode = 'normal'

if (process.argv.length > 2)
  mraFile = process.argv[2];

if (process.argv.length > 3)
  mode = process.argv[3];

if (traceLevel > 0) console.log({ mraFile, mode });

fs.readFile(mraFile, 'utf8', (err, content) => {
  if (err) throw err;

  let mra = JSON.parse(parser.toJson(content));
  if (traceLevel > 0) console.log(mra.misterromdescription.rom);

  switch (mode) {
    case 'normal':    
    default:
      break;
    case 'gen':
      let outputDir = path.parse(mra.misterromdescription.rom.zip).name;
      generateRandomFiles(outputDir, mra.misterromdescription.rom.part);      
      break;
  }
});
