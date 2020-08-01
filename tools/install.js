const { resolve } = require("path");
const { existsSync } = require("fs");
const { execSync } = require("child_process");

if (!existsSync(resolve(__dirname, `../node_modules`))) {
  execSync("yarn install", { cwd: "." });
}
execSync(`yarn add copy-folder@latest -D`, { cwd: "." });

const { deleteFolder } = require("copy-folder");

const list = [
  {
    name: "."
  },
  {
    name: "web"
  },
  {
    name: "server"
  }
];

console.log("正在清理 node_modules ...");
list.map(({ name }) => {
  deleteFolder(resolve(__dirname, `../${name}/node_modules`));
});

list.map(({ name }) => {
  try {
    console.log(`正在安装 ${name} ...`);
    execSync("yarn install", { cwd: name });
  } catch (e) {
    console.log(`安装 ${name} 时失败，已跳过`, e);
  }
});

console.log("安装完成");
