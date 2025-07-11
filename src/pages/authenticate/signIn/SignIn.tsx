import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { routes } from "@app/routesConfig";
import { useToast } from "@hooks/useToast";
import { api } from "@src/api";
import { useMutation } from "@tanstack/react-query";

import { AuthenticateForm, AuthenticateFormProps, UserDto } from "../common";

export default function SignIn() {
  const form = useForm<AuthenticateFormProps>();
  const { getValues } = form;

  const navigate = useNavigate();
  const { openToastError } = useToast();

  const { isPending: isSignInPending, mutateAsync: signIn } = useMutation({
    mutationFn: (payload: UserDto) => {
      return api.apiAuth.signIn(payload);
    },
    onSuccess: ({ data }) => {
      if (data?.id && data.hasProfile) {
        window.location.href = routes.DASHBOARD.path;
      }

      if (data?.id && !data.hasProfile) {
        window.location.href = routes.PROFILE.path;
      }
    },
    onError: (error) => {
      openToastError(error.message);
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
