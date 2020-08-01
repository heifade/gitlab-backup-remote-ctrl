import { static as expressStatic } from "express";
import * as express from "express";
import * as compression from "compression";
import { resolve } from "path";
import { getLogger } from "./log/log";
import { errorLogInit } from "./log/errorLog";
import { apiRouter } from "./router/api";

const app = express();
app.use(compression());

errorLogInit(resolve(__dirname, "./log/server/error"));

app.use(getLogger(resolve(__dirname, "./log/server/log")));
app.use(expressStatic(resolve(__dirname, "./public")));

app.use("/api", apiRouter);

export { app };
