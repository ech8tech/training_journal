import { PropsWithChildren } from "react";

type SizeTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export enum SizeValues {
  h1 = 24,
  h2 = 20,
  h3 = 18,
  h4 = 16,
  h5 = 14,
  h6 = 12,
}

export type TitleProps = PropsWithChildren<{
  size: SizeTypes;
}>;
