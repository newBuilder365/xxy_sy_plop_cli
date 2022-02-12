#!/usr/bin/env node
const program = require("commander");
const axios = require("axios");
const ora = require("ora");
const { promisify } = require("util");
let downloadFn = require("download-git-repo");
// const rimraf = require(rimraf);
const { version, dir } = require("../utils/constants");
const { mapActions } = require("../utils/common");
// downloadFn = promisify(downloadFn);

Reflect.ownKeys(mapActions).forEach((action) => {
  program
    .command(action) //配置命令的名字
    .alias(mapActions[action].alias) // 命令的别名
    .description(mapActions[action].description) // 命令对应的描述
    .action(() => {
      //动作
      if (action === "*") {
        //访问不到对应的命令 就打印找不到命令
        console.log(mapActions[action].description);
      } else {
        // console.log(action);
        // 分解命令 到文件里 有多少文件 就有多少配置 create config
        // lee-cli create project-name ->[node,lee-cli,create,project-name]
        // console.log(process.argv);
        // downloadTemplates();
        const spinner = ora("正在下载......").start();
        // await downloadFn(
        //   "https://api.github.com/repos/newBuilder365/xxy_sy_template",
        //   dir
        // );
        downloadFn("github:newBuilder365/xxy_sy_template", dir, function (err) {
          if (err) {
            spinner.fail(`下载失败，${err}`);
          } else {
            spinner.succeed("下载成功！");
          }
        });
      }
    });
});

program.on("--help", () => {
  console.log("\nExamples:");
  Reflect.ownKeys(mapActions).forEach((action) => {
    mapActions[action].examples.forEach((example) => {
      console.log(` ${example}`);
    });
  });
});

program.version(version).parse(process.argv); // process.argv就是用户在命令行中传入的参数

async function downloadTemplates() {
  const { data } = await axios.get(
    "https://api.github.com/repos/newBuilder365/xxy_sy_template"
  );
  return data;
}
