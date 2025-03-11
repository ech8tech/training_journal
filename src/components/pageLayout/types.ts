import { PropsWithChildren } from "react";

import { ButtonConfig } from "@components/buttons";

export type PageLayoutProps = PropsWithChildren<{
  title: string;
  buttonConfig?: Pick<ButtonConfig, "text" | "onClick">;
}>;
