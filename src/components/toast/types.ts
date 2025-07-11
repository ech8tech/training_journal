export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export type Toast = {
  id: string;
  text: string;
  type: ToastType;
};
