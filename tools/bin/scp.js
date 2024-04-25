#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const async = require("async");
const { program } = require("commander");
const baseDir = "../../";
const pkg = require("../package.json");
const ProgressBar = require("progress");
var { Client } = require("ssh2");
const compressing = require("compressing");

const vueConfig = {outputDir: "dist"};
// const vueConfig = require(path.join(baseDir, "vue.config.js"));

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
  .option("-sc, --staticCache <staticCache>", "发布静态缓存文件,服务器上根目录名", "staticCache")
  .option("-scd, --staticCacheDir <staticCacheDir>", "发布静态缓存文件,要缓存哪些目录(public/下)", "fonts")
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
    return "/home/hxct123/platform/";
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
      host: "10.129.77.24",
      username: "hxct123",
      password: "SLASD4567$",
      port: 22,
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
    const sn = new Map(_new.map(d => ([d.hash, d.filePath])));
    const so = new Map(_old.map(d => ([d.hash, d.filePath])));
    for (const [hash, filePath] of sn) {
      if (!so.has(hash)) {
        res.push([hash, filePath]);
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
    function ([hash, fpath], done) {
      clientBatch.upload(
        path.join(__dirname, baseDir, fpath.replace(/\\+/g, '/')),
        path.join(serverRoot, options.staticCache, fpath.replace(/\\+/g, '/').replace(/public[\\/]/, '').replace(/\/[^/]+$/, ""), "/"),
        function (err) {
          callbackAfterEach(err, [hash, fpath], done);
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
      // execShell(serverCfg);
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
          .join(serverRoot, 'dist/staticCacheLast.json')
          .replace(/\\/g, "/"), //Windows,Linux下，路径"/","\"不同，需要转换
      }),
      path.join(
        __dirname,
        baseDir,
        buildDir,
        'staticCacheLast1.json'
      ),
      async function (err) {
        if (err) {
          resolve([]);
        }
        const oldFileList = JSON.parse(
          fs.readFileSync(
            path.join(
              __dirname,
              baseDir,
              buildDir,
              'staticCacheLast1.json'
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

function execShell(serverCfg, shell) {
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
      stream.end(shell || `cd ${getServerRoot()}\nzip -rq dist.zip dist/*\nexit\n`);
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
} else if (options.compress) {
  // compressDir('zip', 'dist', () => {
    client.scp(
      path.join(__dirname, baseDir, "./dist.zip"),
      Object.assign({}, serverCfg, { path: path.join(serverCfg.path, "../") }),
      (err) => {
        if (err) {
          console.error(err)
          return;
        }
        execShell(serverCfg,  `cd ${getServerRoot()}\nrm -rf dist/\nunzip -o dist.zip -d ${getServerRoot()}dist\n`);
      }
    );
  // })
}else if (options.staticCache) {
    function uploadScAll() {
      const dirs = options.staticCacheDir.split(/[,，\s]+/);
      // console.log(dirs, options.staticCache, options.staticCacheDir)
      async.eachSeries(dirs, function(dir, done) {
        client.scp(
          path.join(__dirname, baseDir, `public/${dir}/`),
          Object.assign({}, serverCfg, { path: path.join(getServerRoot(), `/${options.staticCache}/${dir}/`) }),
          (err) => {
            if (err) {
              console.error(err)
              return;
            }
            done();
          }
        );
      }, err => {
        if (err) {
          throw err;
          return;
        }
        execShell(serverCfg,  `cd ${getServerRoot()}${options.staticCache}\n ll\n`);
      })
    }
    // uploadScAll();
   (async () => {
     try {
       const newFileList = JSON.parse(
         fs.readFileSync(
           path.join(__dirname, baseDir, buildDir, '/staticCacheLast.json'),
           "utf8"
         )
       );
       const oldFileList = await downloadStatsFileList();
  // 
       const updateList = diffFileList(newFileList, oldFileList);
       // console.log(updateList)
       if (updateList.length <= 0) {
         console.log(`=====此次无静态资源更新无需发布=====`);
         return;
       }
       _uploadFiles(
         new client.Client(serverCfg, { path: "" }),
         updateList,
         err => {
           if (err) {
             throw err;
             return;
           }
           console.log('增量更新静态资源完成')
         },
         (err, [hash,fpath], done) => {
            if (err) {
              throw err;
              done(err);
              return;
            }
            console.log(`${fpath} 内容有更新（新增或修改）, 上传成功`)
            done();
         }
       );
     } catch(e) {
       uploadScAll();
     }
   })();
  // compressDir('zip', 'dist', () => {

  // })
}else if (!options.compress) {
  scpDefault();
  scpExtra();
}

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
