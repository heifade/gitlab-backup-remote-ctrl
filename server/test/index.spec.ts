import { expect } from "chai";
import "mocha";
import fetch from "node-fetch";
import { random } from "lodash";
import { app } from "../src/app";
import { getConfig } from "../src/config";
import { runServer } from "../src/utils/runServer";
import { Server } from "http";

const url = `http://localhost:81`;

let server: Server = null;

describe("api", function() {
  before(async () => {
    const { server: serverConfig } = getConfig();
    server = runServer({
      app,
      ...serverConfig
    });
  });
  after(async () => {
    server.close();
  });

  it("/api/test/getData", async () => {
    const res = await fetch(`${url}/api/test/getData`, { method: "get" });
    const { status } = res;
    const json = await res.json();
    expect(status).to.equals(200);
    expect(json.data).to.equal("获取成功");
  });
  it("/api/test/saveData", async () => {
    const body = {
      data: random(10000, false)
    };
    const res = await fetch(`${url}/api/test/saveData`, { method: "post", body: JSON.stringify(body) });
    const { status } = res;
    const json = await res.json();
    expect(status).to.equals(200);
    expect(json.data).to.equal("保存成功");
  });
});
