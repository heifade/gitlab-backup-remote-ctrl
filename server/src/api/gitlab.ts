import { NextFunction, Request, Response } from "express";
import { spawn } from "child_process";
import { HeaderHelper } from "../utils/headerHelper";
import * as WebSocket from "ws";

export async function backUp(ws: WebSocket, req: Request, next: NextFunction) {
  try {
    const { token } = HeaderHelper.getHeaders(req);

    const p = spawn("/projects/sh/gitlab-clone.sh", {});
    p.stdout.on("data", (data) => {
      try {
        const msg = String(data);
        ws.send(msg);
      } catch {}
    });

    p.stderr.on("data", (data) => {
      try {
        const msg = String(data);
        ws.send(msg);
      } catch {}
    });
    p.on("close", (code) => {
      try {
        if (code === 0) {
          ws.send("成功完成");
        } else {
          ws.send(`处理失败 code:${code}`);
        }
        ws.close();
      } catch {}
    });
    p.on("error", (err) => {
      try {
        ws.send(err.message);
      } catch {}
    });
  } catch (e) {
    next(e);
  }
}
