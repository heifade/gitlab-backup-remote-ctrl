const { copyFileSync, existsSync, readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

copyFileIfNotExists(resolve(__dirname, "../src/server-config.json"), resolve(__dirname, "../../dist/server-config.json"));

function copyFileIfNotExists(source, target) {
  if (!existsSync(target)) {
    copyFileSync(source, target);
  }
}

function changeServerFile(serverFileName) {
  const content = readFileSync(serverFileName, { encoding: "utf8" });
  writeFileSync(serverFileName, `#!/usr/bin/env node\n${content}`);
}
changeServerFile(resolve(__dirname, "../../dist/index.js"));
