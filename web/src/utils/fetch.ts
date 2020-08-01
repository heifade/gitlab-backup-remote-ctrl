import dvaFetch from "dva/fetch";
// import { TokenHelper } from 'utils/tokenHelper';

export interface IFetchProps {
  url: string;
  body?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

export interface IFetchResponse {
  success: boolean;
  message: string;
  data: any;
  count: number;
}

function getCommonHeader() {
  return {
    // Authorization: 'bearer ' + TokenHelper.getToken(),
  };
}

/**
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function fetch(props: IFetchProps): Promise<IFetchResponse> {
  let { body, url } = props;
  const { method = "POST" } = props;
  switch (method) {
    case "PUT":
    case "POST":
    case "DELETE":
      body = JSON.stringify(body);
      break;
    case "GET": {
      let urlPars = "";
      for (const key in body) {
        if (body[key] !== undefined) {
          urlPars += `&${key}=${encodeURI(body[key])}`;
        }
      }

      if (urlPars.length) {
        if (url.indexOf("?") > -1) {
          url += urlPars;
        } else {
          url += "?" + urlPars.substr(1);
        }
      }
      body = undefined;
    }
  }

  try {
    const response = await dvaFetch(url, {
      method,
      body,
      credentials: "include",
      mode: "cors", // 避免cors攻击
      headers: {
        "Content-Type": "application/json",
        ...getCommonHeader()
      }
    });

    if (!response.ok) {
      return {
        success: false,
        message: "服务器内部错误",
        data: null,
        count: 0
      };
    }

    const { message, data, count } = await response.json();

    return {
      success: response.status === 200,
      message,
      data,
      count
    };
  } catch (e) {
    return {
      success: false,
      message: "服务器或网络错误",
      data: null,
      count: 0
    };
  }
}
