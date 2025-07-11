import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { routes } from "@app/routesConfig";
import { useToast } from "@hooks/useToast";
import { api } from "@src/api";
import { useMutation } from "@tanstack/react-query";

import { AuthenticateForm, AuthenticateFormProps, UserDto } from "../common";

export default function SignUp() {
  const form = useForm<AuthenticateFormProps>();
  const { getValues } = form;
  const navigate = useNavigate();
  const { openToastError } = useToast();

  const { isPending: isSignUpPending, mutateAsync: singUp } = useMutation({
    mutationFn: (payload: UserDto) => {
      return api.apiAuth.signUp(payload);
    },
    onSuccess: ({ data }) => {
      if (data.id) {
        window.location.href = routes.PROFILE.path;
      }
    },
    onError: (error) => {
      openToastError(error.message);
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
