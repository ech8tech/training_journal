export type ApiError = {
  message: string;
  error: string;
  statusCode: number;
};

export type ApiData<T> = {
  data?: T;
  error?: ApiError;
};
