#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const async = require("async");
const { program } = require("commander");
const baseDir = "../../";
const pkg = require("../package.json");
const ProgressBar = require("progress");
var { Client } = require("ssh2");

const vueConfig = require(path.join(baseDir, "vue.config.js"));

program
  .version(pkg.version)
  .option("-f, --fast", "只发布assetsDir目录", false)
  .option("-t, --test", "test sth", false)
  .option(
    "-fr, --faster",
    "只发布assetsDir目录下发生改动（跟上次发布比较）的文件",
    false
  )
  .option("-cmp, --compress", "发布压缩文件", false)
  .option("-p, --public <public>", "指定部署public/下目录或文件", "")
  .option("-pr, --publicRedirect <publicRedirect>", "指定部署public/(model,mockData,static)下目录或文件", "")
  .option("-e, --env <env>", "服务器环境", "")
  .parse();
const options = program.opts();
// console.log(options);

let buildDir = vueConfig.outputDir + "/";
const statsFileListPath = "/statsFileList.json";

var client = require("scp2");
const serverRoot = getServerRoot();
const serverCfg = getServerCfg(serverRoot);

function getServerRoot() {
  if (!options.env) {
    return "/home/hnz/data/platform/";
  }
  if (options.env === "dev") {
    return "/data/platform/";
  }
  if (options.env === "bty") {
    return "/home/hnz/data/platform/";
  }
}

function getServerCfg(serverRoot) {
  if (!options.env) {
    return {
      host: "117.73.9.199",
      username: "hnz",
      password: "1i2vngYX%d",
      port: 1022,
      path: path.join(serverRoot, buildDir),
    };
  }
  if (options.env === "dev") {
    return {
      host: "120.46.142.121",
      username: "root",
      password: "HFsl@123456",
      port: 1022,
      path: path.join(serverRoot, buildDir),
    };
  }
  if (options.env === "bty") {
    return {
      host: "frphb1.chickfrp.com",
      username: "xktjcauh",
      password: "5fb4c30c",
      port: 22,
      path: path.join(serverRoot, buildDir),
    };
  }
}

function cb(err) {
  if (err) {
    console.error(err);
    return;
  }
}

function cb1(err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("发布完成");
  execShell(serverCfg);
}

function scpExtra() {
  client.scp(
    path.join(__dirname, baseDir, buildDir, "index.html"),
    Object.assign({}, serverCfg, {}),
    cb
  );
  client.scp(
    path.join(__dirname, baseDir, buildDir, "index.html.gz"),
    Object.assign({}, serverCfg, {}),
    cb
  );
  client.scp(
    path.join(__dirname, baseDir, buildDir, statsFileListPath),
    Object.assign({}, serverCfg, {}),
    cb
  );
}
function scpFast() {
  console.log(
    `本次发布${path.join(
      __dirname,
      baseDir,
      buildDir,
      vueConfig.assetsDir,
      "/"
    )}下所有资源文件,耗时较长......`
  );
  scpExtra();
  client.scp(
    path.join(__dirname, baseDir, buildDir, vueConfig.assetsDir, "/"),
    Object.assign({}, serverCfg, {
      path: path.join(serverRoot, buildDir, vueConfig.assetsDir, "/"),
    }),
    cb1
  );
}

function diffFileList(_new, _old) {
  const res = [];
  try {
    const sn = new Map(_new);
    const so = new Map(_old);
    for (const [name, size] of sn) {
      if (!/(buildStatic\/|index\.html|statsFileList\.json)/.test(name)) {
        continue;
      }
      if (!so.has(name)) {
        res.push([name, size]);
      }
    }
  } catch (e) {
    console.error(e);
  }
  return res;
}

const _uploadFiles = function (
  clientBatch,
  files,
  callback,
  callbackAfterEach
) {
  async.eachSeries(
    files,
    function ([fpath, size], done) {
      clientBatch.upload(
        path.join(__dirname, baseDir, buildDir, fpath),
        path.join(serverRoot, buildDir, fpath.replace(/\/[^/]+$/, ""), "/"),
        function (err) {
          callbackAfterEach(err, [fpath, size], done);
        }
      );
      // setTimeout(() => {
      // callbackAfterEach([fpath, size], done);
      // }, 1000);
    },
    function (err) {
      clientBatch.on("close", function closeHandler() {
        callback(err);
        clientBatch.removeListener("close", closeHandler);
      });

      //
      clientBatch.close();
      execShell(serverCfg);
    }
  );
};
async function scpFaster() {
  try {
    const newFileList = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, baseDir, buildDir, statsFileListPath),
        "utf8"
      )
    );
    const oldFileList = await downloadStatsFileList();

    const updateList = diffFileList(newFileList, oldFileList);
    // const updateList = [
    // ["a", 34],
    // ["b", 45],
    // ["c", 67],
    // ["d", 78],
    // ];
    if (updateList.length <= 0) {
      console.log(`=====此次无资源更新无需发布=====`);
      return;
    }
    // console.log(updateList);
    const totalSize = updateList.reduce((prev, curr) => prev + curr[1], 0);
    console.log(
      `  此次为增量发布,更新${updateList.length}个文件, 大小${(
        totalSize /
        1024 /
        1024
      ).toFixed(2)} Mb`
    );
    const bar = new ProgressBar(
      `  资源文件上传中 [:bar] :rate/bps :percent :etas`,
      {
        complete: "=",
        incomplete: " ",
        width: 20,
        total: totalSize,
      }
    );
    function afterEachUpload(err, [fpath, size], done) {
      if (err) {
        done(err);
        return;
      }
      bar.tick(size);
      done();
    }
    scpExtra();
    _uploadFiles(
      new client.Client(serverCfg, { path: "" }),
      updateList,
      cb1,
      afterEachUpload
    );
  } catch (e) {
    console.log(`未找到${statsFileListPath}文件`);
    scpFast();
  }
}
function downloadStatsFileList() {
  return new Promise((resolve, reject) => {
    client.scp(
      Object.assign({}, serverCfg, {
        path: path
          .join(serverRoot, buildDir, statsFileListPath)
          .replace(/\\/g, "/"), //Windows,Linux下，路径"/","\"不同，需要转换
      }),
      path.join(
        __dirname,
        baseDir,
        buildDir,
        vueConfig.assetsDir,
        statsFileListPath
      ),
      async function (err) {
        if (err) {
          reject(err);
        }
        const oldFileList = JSON.parse(
          fs.readFileSync(
            path.join(
              __dirname,
              baseDir,
              buildDir,
              vueConfig.assetsDir,
              statsFileListPath
            ),
            "utf8"
          )
        );
        resolve(oldFileList);
      }
    );
  });
}

function scpDefault() {
  console.log(
    `本次发布${path.join(
      __dirname,
      baseDir,
      (options.public && path.join("public", options.public)) || buildDir
    )}下资源文件......`
  );
  client.scp(
    path.join(
      __dirname,
      baseDir,
      (options.public && path.join("public", options.public)) || buildDir
    ),
    Object.assign({}, serverCfg, {
      path: path.join(serverRoot, buildDir, options.public || ""),
    }),
    cb1
  );
}

function scpPublicRedirect() {
  console.log(
    `本次发布${path.join(
      __dirname,
      baseDir,
      options.publicRedirect && path.join("public", options.publicRedirect)
    )}下资源文件......`
  );
  client.scp(
    path.join(
      __dirname,
      baseDir,
      options.publicRedirect && path.join("public", options.publicRedirect)
    ),
    Object.assign({}, serverCfg, {
      path: path.join(serverRoot, '/publicStatic', options.publicRedirect || ""),
    }),
    cb
  );
}

function execShell(serverCfg) {
  const ssh = new Client();
  ssh.on("ready", () => {
    ssh.shell((err, stream) => {
      if (err) {
        throw err;
      }
      stream
        .on("close", () => {
          console.log("远程命令执行完毕");
          ssh.end();
        })
        .on("data", (d) => console.log(`远程命令输出：\n${d}`))
        .stderr.on("data", (d) => {
          console.log(`远程命令输出：\n${d}`);
          ssh.end();
        });
      stream.end(`cd ${getServerRoot()}\nzip -rq dist.zip dist/*\nexit\n`);
    });
  });
  ssh.connect(serverCfg)
}

if (options.fast === true) {
  scpFast();
} else if (options.faster === true) {
  scpFaster();
} else if (options.test === true) {
  execShell(serverCfg);
} else if (options.publicRedirect) {
  scpPublicRedirect(serverCfg);
} else if (!options.compress) {
  scpDefault();
  scpExtra();
} else if (options.compress) {
  client.scp(
    path.join(__dirname, baseDir, "./dist.zip"),
    Object.assign({}, serverCfg, { path: path.join(serverCfg.path, "../") }),
    (err) => {}
  );
}
