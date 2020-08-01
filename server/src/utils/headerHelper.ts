import { Request } from "express";

interface IHeader {
  user: string;
  dataRightBuIds: string;
  token: string;
  version: string;
}

export class HeaderHelper {
  static getHeaders(req: Request): IHeader {
    const {
      buids, // header 中必须小写
      ...other
    } = req.headers as any;
    return {
      ...other,
      dataRightBuIds: buids
    };
  }
}
