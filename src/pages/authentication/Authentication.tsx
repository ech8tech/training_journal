import { InputPassword, InputTel } from "@components/inputs";
import { InputCalendar } from "@components/inputs/inputCalendar/InputCalendar";
import { PageLayout } from "@components/pageLayout/PageLayout";
import { Spacing } from "@components/spacing/Spacing";
import { SPACE_CONTAINER } from "@constants/spacing";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
        <InputTel
          name={register("tel").name}
          label="Ваш телефон"
          placeholder="Введите телефон"
          onChange={(value) => setValue("tel", value)}
        />
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <InputPassword
          name={register("password").name}
          label="Ваш пароль"
          placeholder="Введите пароль"
          onChange={(value) => setValue("password", value)}
        />
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <InputCalendar
          name={register("date").name}
          label="Дата"
          onChange={() => {}}
        />
      </Spacing>
    </PageLayout>
  );
}
