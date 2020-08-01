import { backUp } from "../api/gitlab";
import { warkUp } from "../api/warkUp";
import { Router } from "express";
import * as expressWS from "express-ws";
import { app } from "../app";

export function getWsRouter(server: any) {
  const wsRouter = Router();

  expressWS(app, server).applyTo(wsRouter);

  wsRouter.ws("/gitlabBackUp", backUp);
  wsRouter.ws("/serverWarkUp", warkUp);

  return wsRouter;
}
