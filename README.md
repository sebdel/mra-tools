# mra-tools

## Installation
**This tool is linux only at the moment**

### Download

Get a prebuilt version for ubuntu here: https://drive.google.com/open?id=1vHFPncbjNsoAIu9a7mNw2OKXJ8ueU8Pl

### From source
Install node, npm and clone this repo. Then, at the root of mra-tools, do:

`npm install`

### Build
Install nexe

`npm i nexe`

then

`npm run build`

will create the dist directory and the mra-tools binary.

## Usage
To extract a rom, place its MRA and zip file in the same folder as mra-tools and do:

### Dev version
`npm start my.mra`

### Binary version
`./mra-tools my.mra`

If all goes well, the .rom file is created in the same folder and the program ends with the message:

`md5 matches`

