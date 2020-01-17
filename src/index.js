import fs from 'fs';
import path from 'path';
import parser from 'xml2json';
import {concatenateParts, generateRandomFiles, zipIt, unzipIt} from './utils';

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
  let zipPath = path.parse(mra.misterromdescription.rom.zip);
  let romFile = `${zipPath.name}.rom`;
  if (traceLevel > 0) console.log(mra.misterromdescription.rom);

  switch (mode) {
    case 'normal':
      unzipIt(zipPath);
      let {romBuffer, md5hash} = concatenateParts(mra.misterromdescription.rom.part, zipPath.name);
      fs.writeFileSync(romFile, romBuffer);
      console.log(`> ${md5hash} ${romFile} created.`)   
      console.log(mra.misterromdescription.rom.md5.startsWith(md5hash) ? "md5 matches" : "md5 doesn't match");
    default:
      break;
    case 'gen':
      generateRandomFiles(zipPath.name, mra.misterromdescription.rom.part);
      zipIt(zipPath);
      break;
  }
});
