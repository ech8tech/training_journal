import { ButtonConfig } from "@components/buttons";
import { PropsWithChildren } from "react";

export type PageLayoutProps = PropsWithChildren<{
  title: string;
  buttonConfig?: Pick<ButtonConfig, "text" | "onClick">;
}>;
