import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { routes } from "@app/routesConfig";
import { Input } from "@components/input";
import { PageLayout } from "@components/pageLayout/PageLayout";
import { Spacing } from "@components/spacing/Spacing";
import { SPACE_CONTAINER } from "@constants/spacing";

import { RegistrationUserFormProps } from "./types";

export default function RegistrationUser() {
  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate(routes.REGISTRATION.CONFIRM.path);
  };

  const { register, setValue } = useForm<RegistrationUserFormProps>();

  return (
    <PageLayout
      title="Регистрация"
      buttonConfig={{
        text: "Зарегистрироваться",
        onClick: handleRegistration,
      }}
    >
      <Spacing space={SPACE_CONTAINER}>
        <Input
          name={register("tel").name}
          label="Ваш телефон"
          placeholder="+7 (___) ___-__-__"
          mask="tel"
          inputMode="tel"
          onChange={(value) => setValue("tel", value)}
        />
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <Input
          name={register("email").name}
          label="Ваша почта"
          placeholder="Введите почту"
          inputMode="email"
          onChange={(value) => setValue("email", value)}
        />
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <Input
          name={register("password").name}
          label="Ваш пароль"
          placeholder="Введите пароль"
          type="password"
          onChange={(value) => setValue("password", value)}
        />
      </Spacing>
    </PageLayout>
  );
}
