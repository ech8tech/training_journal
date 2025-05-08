import { ButtonsGroup } from "@components/buttons";
import { Input } from "@components/input";
import { PageLayout } from "@components/pageLayout/PageLayout";
import { Spacing } from "@components/spacing/Spacing";
import { Text } from "@components/text/Text";
import { SPACE_CONTAINER } from "@constants/spacing";

import { AuthenticateFormProps, FormProps } from "./types";

export function AuthenticateForm({
  form,
  signType,
  buttonConfigMain,
  buttonsConfig = [],
}: FormProps<AuthenticateFormProps>) {
  const { register, setValue } = form;

  const isSignIn = signType === "signIn";

  const handleAuthGoogle = () => {
    window.location.href = `http://localhost:9001/api/auth/google`;
  };

  return (
    <PageLayout
      title={isSignIn ? "Аутентификация" : "Регистрация"}
      buttonConfig={buttonConfigMain}
    >
      <Spacing space={SPACE_CONTAINER}>
        <Input
          {...register("email")}
          label="Ваша почта"
          placeholder="Введите почту"
          inputMode="email"
        />
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <Input
          {...register("password")}
          label="Ваш пароль"
          placeholder="Введите пароль"
          type="password"
        />
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <Spacing space={16}>
          <Text size="md">
            {isSignIn ? "Войти" : "Зарегистрироваться"} с помощью
          </Text>
        </Spacing>
        <ButtonsGroup
          buttonsConfig={[
            { text: "Google", onClick: handleAuthGoogle },
            ...buttonsConfig,
          ]}
        />
      </Spacing>
    </PageLayout>
  );
}
