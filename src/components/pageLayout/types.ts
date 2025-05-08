import { PropsWithChildren } from "react";

import { ButtonConfig } from "@components/buttons";

export type PageLayoutProps = PropsWithChildren<{
  title?: string;
  buttonConfig?: ButtonConfig;
  onBack?(): void;
}>;
