export type BaseResponse = {
  code: string;
  message?: string;
  warning?: string;
  st?: number | string;
  ac?: number | string;
};

export type BaseStore = {
  isLoading: boolean;
  isError: boolean;
};

export type CallbackResponse = {
  callback?: () => void;
};

export type Date = string & { __format: "yyyy-mm-dd" };

export type DateTimeString = string & { __format: "yyyy-mm-dd hh:mm:ss" };

export type DownloadResponse = {
  data: Blob;
  filename?: string;
  type: string;
};

export interface RequestConfig {
  params?: Record<string, string | number>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export interface ErrorResponse extends BaseResponse {
  error_message?: string;
}

export interface FormResponse extends CallbackResponse {
  loading?: boolean;
  toggled?: boolean;
  processing?: boolean;
  message?: string | null;
  success?: SuccessResponse | null;
  error?: ErrorResponse | null;
}

export interface ResponseData<T> extends BaseResponse {
  payload: T;
}

export interface ResponseDownload<T> extends BaseResponse {
  payload: T;
}

export interface SuccessResponse extends BaseResponse {
  handler?: string;
}
