import { PropsWithChildren } from "react";

type TitleSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type TitleProps = PropsWithChildren<{
  className?: string;
  size: TitleSize;
}>;
