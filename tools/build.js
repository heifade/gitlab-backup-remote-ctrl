const { execSync } = require("child_process");
const { resolve } = require("path");
const { readdirSync, writeFileSync, readFileSync } = require("fs");

const distPath = resolve(__dirname, "../dist");

// ---------------- 清空 dist
execSync(`rm -rf ${distPath}`);

// ---------------- build

const list = ["web", "server"];

list.map(name => {
  console.log(`正在构建 ${name} ...`);
  execSync("npm run build --scripts-prepend-node-path", { cwd: name });
});

console.log("构建完成");

// -------------------------------------------------将 html 里的 js, css 文件名替换
const publicPath = resolve(distPath, "./public");
const files = readdirSync(publicPath);

function chunksRename() {
  files
    .filter(file => file.endsWith(".html"))
    .map(htmlFile => {
      const fileName = resolve(publicPath, htmlFile);
      chunkRename(fileName);
    });
}

function chunkRename(htmlFile) {
  const fileContent = readFileSync(htmlFile, { encoding: "utf8" });
  const reg = /\"([\w]*)((.js)|(.css))\"/g;
  const result = fileContent.replace(reg, (v1, v2, v3) => {
    return '"' + getChunkHashName(v2, v3) + '"';
  });

  writeFileSync(htmlFile, result, { encoding: "utf8", flag: "w" });
}

function getChunkHashName(chunk, extendName) {
  return files.filter(file => {
    return file.startsWith(chunk + ".") && file.endsWith(extendName);
  })[0];
}

chunksRename();
