"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

var _unzipper = _interopRequireDefault(require("unzipper"));

var _xml2json = _interopRequireDefault(require("xml2json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mraFile = '';
var traceLevel = 0;

var concatenateParts = function concatenateParts(parts, dirname) {
  var romBuffer = Buffer.concat(parts.map(function (_ref) {
    var name = _ref.name;

    var filePath = _path["default"].format({
      dir: dirname,
      base: name
    });

    console.log("Reading", filePath);

    if (!_fs["default"].existsSync("".concat(filePath))) {
      throw new Error("".concat(filePath, " not found!"));
    }

    return _fs["default"].readFileSync(filePath);
  }));

  var md5hash = _crypto["default"].createHash('md5').update(romBuffer).digest("hex");

  return {
    romBuffer: romBuffer,
    md5hash: md5hash
  };
};

var unzipIt = function unzipIt(zipPath) {
  _fs["default"].createReadStream(zipPath.base).pipe(_unzipper["default"].Extract({
    path: zipPath.name
  }));
};

if (process.argv.length > 2) mraFile = process.argv[2];
if (traceLevel > 0) console.log({
  mraFile: mraFile,
  mode: mode
});

_fs["default"].readFile(mraFile, 'utf8', function (err, content) {
  if (err) throw err;
  var mra = JSON.parse(_xml2json["default"].toJson(content));
  if (traceLevel > 0) console.log(mra.misterromdescription.rom);

  var zipPath = _path["default"].parse(mra.misterromdescription.rom.zip);

  var romFile = "".concat(zipPath.name, ".rom");
  unzipIt(zipPath);

  var _concatenateParts = concatenateParts(mra.misterromdescription.rom.part, zipPath.name),
      romBuffer = _concatenateParts.romBuffer,
      md5hash = _concatenateParts.md5hash;

  _fs["default"].writeFileSync(romFile, romBuffer);

  console.log("> ".concat(md5hash, " ").concat(romFile, " created."));
  console.log(mra.misterromdescription.rom.md5.startsWith(md5hash) ? "md5 matches" : "md5 doesn't match");
});