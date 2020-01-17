# mra-tools

## Download

linux:
macos:
windows:

### Build from source
Install node v12, npm and pkg (i.e. npm i -g pkg) and clone this repo. Then, at the root of mra-tools, do:

`npm install`

`npm run build`

this will create binaries for all target platforms at the root of the directory.

## Usage
To extract a rom, place its MRA and zip file in the same folder as mra-tools and do:

### Dev version
`npm start my.mra`

### Binary version
`./mra-tools my.mra`

If all goes well, the .rom file is created in the same folder and the program ends with the message:

`md5 matches`

