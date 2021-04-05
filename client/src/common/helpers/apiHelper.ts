import { FetchMethod } from "../enums/FetchMethod";
import { IResponseError } from "../models/fetch/IResponseError";

const getInitHeaders = (
  contentType = "application/json",
  hasContent = true
) => {
  const headers: HeadersInit = new Headers();
  if (hasContent) {
    headers.set("Content-Type", contentType);
  }
  return headers;
};

export const buildURLQuery = (query: { [key: string]: string }) =>
  Object.entries(query)
    .map((pair) =>
      pair.map((element: any) => encodeURIComponent(element)).join("=")
    )
    .join("&");

const getFetchUrl = (url: string, query: { [key: string]: string }) =>
  `${url}?${buildURLQuery(query)}`;

const getFetchOptions = (method: string, body?: { [key: string]: string }) =>
  method !== "GET"
    ? {
        method,
        body: body && JSON.stringify(body),
        headers: getInitHeaders(),
      }
    : {
        method,
      };

const parseResErrorBody = async (res: Response) => {
  try {
    const body = await res.text();
    return JSON.parse(body) as IResponseError;
  } catch (err) {
    return null;
  }
};

const throwIfResponseFailed = async (res: Response) => {
  if (res.ok) {
    return;
  }

  const body = await parseResErrorBody(res);

  const exception: IResponseError = body || {
    message: "Something went wrong with request!",
    status: 500,
  };

  throw exception;
};

const makeRequest = (method: FetchMethod) => async <T>(
  url: string,
  params?: { [key: string]: any }
): Promise<T> => {
  const [fetchUrl, body] =
    method === FetchMethod.GET
      ? params && Object.values(params).filter((e) => e).length
        ? [getFetchUrl(url, params as { [key: string]: string }), undefined]
        : [url, undefined]
      : [url, params];

  const fetchOptions = getFetchOptions(method, body);
  const res = await fetch(fetchUrl, fetchOptions);
  await throwIfResponseFailed(res);
  return (res.status === 200 ? res.json() : null) as Promise<T>;
};

const api = {
  get: makeRequest(FetchMethod.GET),
  post: makeRequest(FetchMethod.POST),
  put: makeRequest(FetchMethod.PUT),
  delete: makeRequest(FetchMethod.DELETE),
};

export default api;
