import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { routes } from "@app/routesConfig";
import { useMutation } from "@tanstack/react-query";
import { api } from "@utils/fetch";

import {
  AuthenticateForm,
  AuthenticateFormProps,
  Types,
  UserModel,
} from "../common";

export default function SignIn() {
  const form = useForm<AuthenticateFormProps>();
  const { getValues } = form;

  const navigate = useNavigate();

  const { isPending: isSignInPending, mutateAsync: signIn } = useMutation({
    mutationFn: (payload: Types) => {
      return api.post<UserModel>("/auth/sign_in", payload);
    },
    onSuccess: ({ data }) => {
      if (data.hasProfile) {
        navigate(routes.DASHBOARD.path);
      } else {
        navigate(routes.PROFILE.path);
      }
    },
  });

  const handleNavToSignUp = () => {
    navigate(routes.AUTHENTICATION.SIGN_UP.path);
  };

  const buttonsConfig = [
    {
      text: "Пройти регистрацию",
      onClick: handleNavToSignUp,
    },
  ];

  const buttonConfigMain = {
    text: "Войти в систему",
    isLoading: isSignInPending,
    onClick: () => signIn(getValues()),
  };

  return (
    <AuthenticateForm
      form={form}
      signType="signIn"
      buttonsConfig={buttonsConfig}
      buttonConfigMain={buttonConfigMain}
    />
  );
}
