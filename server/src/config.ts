import { readFileSync } from "fs";
import { resolve } from "path";

let configCacle: Config = null;

interface Config {
  server: {
    https: boolean;
    pfx: string;
    pfxPassword: string;
    port: number;
  };
}

export function getConfig(): Config {
  if (!configCacle) {
    const configFile = resolve(__dirname, "./server-config.json");
    configCacle = JSON.parse(readFileSync(configFile, { encoding: "utf-8" }));
  }

  return configCacle;
}
