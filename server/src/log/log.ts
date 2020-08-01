import * as morgan from "morgan";
import * as moment from "moment";
import { existsSync, mkdirSync } from "fs";

const FileStreamRotator = require("file-stream-rotator");

morgan.token("date", () => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
});

morgan.format(
  "logFormat",
  "状态[:status] 时间[:date] 客户端地址[:remote-addr] 客户端版本[':user-agent'] 请求地址[':referrer'] 方法[':method :url HTTP/:http-version'] 长度[:res[content-length]] 响应时间[:response-time ms]"
);

export function getLogger(logPath: string) {
  //确保日志文件目录存在 没有则创建
  if (!existsSync(logPath)) {
    mkdirSync(logPath, { recursive: true });
  }

  //创建一个写路由
  const accessLogStream = FileStreamRotator.getStream({
    filename: `${logPath}/log.%DATE%.log`,
    frequency: "daily",
    verbose: false
  });

  return morgan("logFormat", { stream: accessLogStream });
}
