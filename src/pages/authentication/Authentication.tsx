import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Input } from "@components/input";
import { PageLayout } from "@components/pageLayout/PageLayout";
import { Spacing } from "@components/spacing/Spacing";
import { SPACE_CONTAINER } from "@constants/spacing";

import { AuthenticationFormProps } from "./types";

export default function Authentication() {
  const navigate = useNavigate();

  const handleAuthentication = () => {
    navigate("/dashboard");
  };

  const { register, setValue } = useForm<AuthenticationFormProps>({
    defaultValues: {
      date: "01.01.2025",
    },
  });

  return (
    <PageLayout
      title="Авторизация"
      buttonConfig={{
        text: "Авторизоваться",
        onClick: handleAuthentication,
      }}
    >
      <Spacing space={SPACE_CONTAINER}>
        <Input
          name={register("tel").name}
          label="Ваш телефон"
          mask="tel"
          inputMode="tel"
          placeholder="Введите телефон"
          onChange={(value) => setValue("tel", value)}
        />
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <Input
          name={register("password").name}
          label="Ваш пароль"
          type="password"
          placeholder="Введите пароль"
          onChange={(value) => setValue("password", value)}
        />
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <Input
          name={register("date").name}
          label="Дата"
          onChange={() => {}}
          type="date"
        />
      </Spacing>
    </PageLayout>
  );
}
