const path = require("path");
const { program } = require("commander");

const vueConfig = require("../vue.config.js");

program
  .option("-f, --fast", "只发布assetsDir目录", false)
  .option("-p, --public <public>", "指定部署public/下目录或文件", "")
  .parse();
const options = program.opts();
// console.log(options);

let buildDir = vueConfig.outputDir + "/";

var client = require("scp2");
const serverRoot = "/home/hnz/data/platform/";
const serverCfg = {
  host: "117.73.9.199",
  username: "hnz",
  password: "1i2vngYX%d",
  port: 1022,
  path: path.join(serverRoot, buildDir),
};

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
}

if (options.fast === true) {
  client.scp(
    path.join(buildDir, vueConfig.assetsDir, "/"),
    Object.assign({}, serverCfg, {
      path: path.join(serverRoot, buildDir, vueConfig.assetsDir, "/"),
    }),
    cb1
  );
  client.scp(
    path.join(buildDir, "index.html"),
    Object.assign({}, serverCfg, {}),
    cb
  );
  client.scp(
    path.join(buildDir, "index.html.gz"),
    Object.assign({}, serverCfg, {}),
    cb
  );
} else {
  client.scp(
    path.join(
      (options.public && path.join("public", options.public)) || buildDir
    ),
    Object.assign({}, serverCfg, {
      path: path.join(
        serverRoot,
        buildDir,
        options.public.replace(/\/[^/]+$/, ""),
        "/"
      ),
    }),
    cb1
  );
}

client.scp(
  "./dist.zip",
  Object.assign({}, serverCfg, { path: path.join(serverCfg.path, "../") }),
  (err) => {}
);
