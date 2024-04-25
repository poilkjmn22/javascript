#!/usr/bin/env node

const path = require("path");
const compressing = require("compressing");
const { program } = require("commander");
const baseDir = "../../";
const pkg = require("../package.json");

program
  .version(pkg.version)
  .option("-d, --dir <dir>", "压缩目录", "zip")
  .option("-f, --file <file>", "压缩文件")
  .option("-s, --source <source>", "要压缩的文件", "dist")
  .option("-t, --target <target>", "压缩后放在哪", "")
  .parse();
const options = program.opts();

function compressDir(f, src = "dist", done) {
  const tarDir = `${path.join(__dirname, baseDir, src)}.${f}`;
  compressing[f]
    .compressDir(path.join(__dirname, baseDir, src), tarDir)
    .then(done || compressDone)
    .catch(handleError);

  function compressDone(e) {
    console.log(`${tarDir}压缩完成`);
  }

  function handleError(e) {
    console.error(e);
  }
}

function compressFile(f, src) {
  const tarFile = `${path.join(__dirname, baseDir, src)}.${
    f === "gzip" ? "gz" : f
  }`;
  compressing[f]
    .compressFile(path.join(__dirname, baseDir, src), tarFile)
    .then(compressDone)
    .catch(handleError);

  function compressDone(e) {
    console.log(`${tarFile}压缩完成`);
  }

  function handleError(e) {
    console.error(e);
  }
}

if (options.file) {
  compressFile(options.file, options.source);
} else  {
  compressDir(options.dir, options.source);
}

module.exports = {
  compressDir,
}
