import fs from 'fs';
import {exec} from 'child_process';

const blockSize = '64K';
const count = 2;

export const generateRandomFiles = (outputDir, fileNames) => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  fileNames.forEach(({name}) => exec(`dd if=/dev/urandom of=${outputDir}/${name} bs=${blockSize} count=${count} iflag=fullblock`));
}