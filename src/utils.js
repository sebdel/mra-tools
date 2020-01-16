import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const blockSize = '1024';
const count = 2;

export const concatenateParts = (parts, dirname, romFile) => {
  fs.writeFileSync(romFile, Buffer.concat(
    parts.map(({ name }) => {
      let filePath = path.format({ dir: dirname, base: name });
      console.log("Reading", filePath);
      if (!fs.existsSync(`${filePath}`)) {
        throw new Error(`${filePath} not found!`)
      }
      return fs.readFileSync(filePath);
    })));
  console.log(`> ${romFile} created.`)
}

export const checkmd5 = (fileName, md5) => {
  let md5sum = execSync(`md5sum ${fileName}`).toString();
  return md5sum.startsWith(md5);
}

export const generateRandomFiles = (outputDir, fileNames) => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  fileNames.forEach(({ name }) => execSync(`dd if=/dev/urandom of=${outputDir}/${name} bs=${blockSize} count=${count} iflag=fullblock`));
}

export const zipIt = (zipPath) => {
  execSync(`zip -r -j ${zipPath.base} ${zipPath.name}`);
}

export const unzipIt = (zipPath) => {
  execSync(`unzip -o ${zipPath.base} -d ${zipPath.name}`);
}
