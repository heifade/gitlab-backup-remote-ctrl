import { NextFunction, Request, Response } from "express";
import { errorLogger } from "./errorLog";
import { ServerError } from "../entity/serverError";
import { Result } from "../entity/Result";
import { v4 as guid } from "uuid";
import { version } from "../../package.json";

export function apiError(e: ServerError, req: Request, res: Response, next: NextFunction) {
  e.errorCode = guid()
    .replace(/-/g, "")
    .toUpperCase();

  res.status(500).send(new Result({ message: e.message, errorCode: e.errorCode }));
  errorLogger.error(`[${e.errorCode}] [${version}]`, `${e.stack}`);
}
