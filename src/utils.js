import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import { execSync } from 'child_process';

const blockSize = '1024';
const count = 2;

export const concatenateParts = (parts, dirname) => {
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

  return {romBuffer, md5hash};
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
