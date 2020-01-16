# mra-tools

# Installation
*This tool is linux only at the moment*

Install node, npm and clone this repo. Then, at the root of mra-tools, do:

`npm install`

# Usage
To extract a rom, place its MRA and zip file in the same folder and do:

`npm start my.mra`

If all goes well, the .rom file is created in the same folder and the program ends with the message:

`md5 matches`

Optionally, for testing purpose, you can generate fake zip files from a MRA, using:

`npm start my.mra gen`
