# mra-tools

## Download

linux: https://drive.google.com/open?id=1jJaQQ8rQ-65BUnHwH3ZhaLguJ7q6cw2A
macos:
windows:

### Build from source
Install node v12, npm and pkg (i.e. npm i -g pkg) and clone this repo. Then, at the root of mra-tools, do:

`npm install`

`npm run build`

this will create binaries for all target platforms at the root of the directory. You still need node-expat.node for each respective platform. That can be found in the node_modules/node-expat build directory.

## Usage
To extract a rom, place its MRA and zip file in the same folder as mra-tools and do:

### Dev version
`npm start my.mra`

### Binary version
`./mra-tools my.mra`

If all goes well, the .rom file is created in the same folder and the program ends with the message:

`md5 matches`

