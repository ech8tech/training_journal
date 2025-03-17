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

export default function SignUp() {
  const form = useForm<AuthenticateFormProps>();
  const { getValues } = form;
  const navigate = useNavigate();

  const { isPending: isSignUpPending, mutateAsync: singUp } = useMutation({
    mutationFn: (payload: Types) => {
      return api.post<UserModel>("/auth/sign_up", payload);
    },
    onSuccess: ({ data }) => {
      if (data.hasProfile) {
        navigate(routes.DASHBOARD.path);
      } else {
        navigate(routes.PROFILE.path);
      }
    },
  });

  const handleNavToSignIn = () => {
    navigate(routes.AUTHENTICATION.SIGN_IN.path);
  };

  const buttonsConfig = [
    {
      text: "Пройти аутентификацию",
      onClick: handleNavToSignIn,
    },
  ];

  const buttonConfigMain = {
    text: "Зарегистрироваться",
    isLoading: isSignUpPending,
    onClick: () => singUp(getValues()),
  };

  return (
    <AuthenticateForm
      form={form}
      signType="signUp"
      buttonsConfig={buttonsConfig}
      buttonConfigMain={buttonConfigMain}
    />
  );
}
