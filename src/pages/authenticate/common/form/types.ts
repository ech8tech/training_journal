import { UseFormReturn } from "react-hook-form";

import { ButtonConfig } from "@components/buttons";

export type FormProps<T extends AuthenticateFormProps> = {
  form: UseFormReturn<T>;
  signType: "signIn" | "signUp";
  buttonConfigMain: ButtonConfig;
  buttonsConfig?: ButtonConfig[];
};

export type AuthenticateFormProps = {
  email: string;
  password: string;
};
