import fs from 'fs';
import parser from 'xml2json';

let mraFile = '';
let traceLevel = 0;

if (process.argv.length > 2)
  mraFile = process.argv[2];

if (traceLevel > 0) console.log("Opening MRA file: ", mraFile);

fs.readFile(mraFile, 'utf8', (err, content) => {
  if (err) throw err;

  let mra = JSON.parse(parser.toJson(content));
  console.log(mra.misterromdescription.rom);
});
