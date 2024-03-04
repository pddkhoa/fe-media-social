export type ResponseBase<T> = {
  body?: T;
  error: boolean;
  status: number;
  message: string;
  statusText: string;
  contentType: string | undefined;
};
