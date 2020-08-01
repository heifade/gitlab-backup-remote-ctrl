import { join } from "path";
import { configure, getLogger } from "log4js";

export function errorLogInit(logPath: string) {
  configure({
    appenders: {
      file: {
        type: "dateFile",
        filename: join(logPath, "error"),
        pattern: "yyyy-MM-dd.log",
        // maxLogSize: 10 * 1024 * 1024,
        // numBackups: 3,
        alwaysIncludePattern: true,
        layout: {
          type: "pattern",
          pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%5.5p] %m"
        }
      }
    },
    categories: {
      default: {
        appenders: ["file"],
        level: "error"
      }
    }
  });
}

export const errorLogger = getLogger();
