type Code = 200 | 500 | 401;

export class Result {
  count: number;
  data: any;
  message: string;
  errorCode: string;

  constructor(pars: { count?: number; data?: any; message?: string; errorCode?: string }) {
    const { count, data, message, errorCode } = pars;
    this.count = count || 0;
    this.data = data || null;
    this.message = message || "成功";
    this.errorCode = errorCode || "";
  }
}
