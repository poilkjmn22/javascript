const Logger = require("./Logger");
const path = require("path");
const fs = require("fs");

class StatsDiffPlugin {
  constructor(opts = {}) {
    this.opts = {
      logLevel: "info",
      reportFilename: "statsFileList.json",
      ...opts,
    };

    this.logger = new Logger(this.opts.logLevel);
  }

  apply(compiler) {
    this.compiler = compiler;

    const done = (stats, callback) => {
      callback = callback || (() => {});

      setImmediate(async () => {
        try {
          await this.generateJSONReport1(stats);
          callback();
        } catch (e) {
          callback(e);
        }
      });
    };

    if (compiler.hooks) {
      compiler.hooks.done.tapAsync("webpack-stats-diff-plugin", done);
    } else {
      compiler.plugin("done", done);
    }
  }

  async generateJSONReport(stats) {
    const { chunks } = stats.compilation;
    let fileList = [];
    chunks.forEach((chunk) => {
      fileList.push(...chunk.files.filter((f) => f.indexOf("/runtime") < 0));
    });
    const reportFilename = path.resolve(
      this.compiler.outputPath,
      this.opts.reportFilename
    );
    fs.writeFileSync(reportFilename, JSON.stringify(fileList));
  }
  async generateJSONReport1(stats) {
    const filelist = [];
    const { compilation } = stats;
    const assets = compilation.assets;
    // console.log(Object.values(assets)[0]);
    for (const filename in assets) {
      filelist.push([filename, assets[filename].size()]);
    }

    const reportFilename = path.resolve(
      this.compiler.outputPath,
      this.opts.reportFilename
    );
    fs.writeFileSync(reportFilename, JSON.stringify(filelist));
    // compilation.assets[this.opts.reportFilename] = {
    // source: function () {
    // return JSON.stringify(filelist);
    // },
    // size: function () {
    // return filelist.length;
    // },
    // };
  }

  getBundleDirFromCompiler() {
    switch (this.compiler.outputFileSystem.constructor.name) {
      case "MemoryFileSystem":
        return null;
      // Detect AsyncMFS used by Nuxt 2.5 that replaces webpack's MFS during development
      // Related: #274
      case "AsyncMFS":
        return null;
      default:
        return this.compiler.outputPath;
    }
  }
}

module.exports = StatsDiffPlugin;
