import "regenerator-runtime/runtime";
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import unzip from 'unzipper';
import parser from 'xml2json';

let mraFile = '';
let traceLevel = 0;

const concatenatePartsSync = (parts, dirname) => {
  let romBuffer = Buffer.concat(
    parts.map(({ name }) => {
      let filePath = path.format({ dir: dirname, base: name });
      console.log("Reading", filePath);
      if (!fs.existsSync(`${filePath}`)) {
        throw new Error(`${filePath} not found!`)
      }
      return fs.readFileSync(filePath);
    }));
  let md5hash = crypto.createHash('md5').update(romBuffer).digest("hex");

  return { romBuffer, md5hash };
};

const unzipAsync = async (zipPath) => {
  //fs.createReadStream(zipPath.base).pipe(unzipper.Extract({ path: zipPath.name }));
  const d = await unzip.Open.file(zipPath.base);
  return await d.extract({ path: zipPath.name, concurrency: 5 });
};

if (process.argv.length > 2)
  mraFile = process.argv[2];

if (traceLevel > 0) console.log({ mraFile });

fs.readFile(mraFile, 'utf8', async (err, content) => {
  if (err) throw err;

  let mra = JSON.parse(parser.toJson(content));
  if (traceLevel > 0) console.log(mra.misterromdescription.rom);

  let zipPath = path.parse(mra.misterromdescription.rom.zip);
  let romFile = `${zipPath.name}.rom`;

  if (traceLevel > 0) console.log({ zipPath, romFile });

  console.log(`Extracting ${zipPath.base}`);
  await unzipAsync(zipPath);
  let { romBuffer, md5hash } = concatenatePartsSync(mra.misterromdescription.rom.part, zipPath.name);
  console.log(`Writing ${romFile}`);
  fs.writeFileSync(romFile, romBuffer);

  console.log(`> ${md5hash} ${romFile} created.`)
  console.log(mra.misterromdescription.rom.md5.startsWith(md5hash) ? "md5 matches" : "md5 doesn't match");
});
