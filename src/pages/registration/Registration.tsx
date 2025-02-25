import {
  InputNumber,
  InputPassword,
  InputTel,
  InputText,
} from "@components/inputs";
import { PageLayout } from "@components/pageLayout/PageLayout";
import { Select } from "@components/select";
import { Spacing } from "@components/spacing/Spacing";
import { SPACE_CONTAINER } from "@constants/spacing";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { optionsSex } from "./consts";
import * as styles from "./Registration.scss";
import { RegistrationFormProps } from "./types";

export default function Registration() {
  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate("/authentication");
  };

  const { control, register, watch, getValues, setValue } =
    useForm<RegistrationFormProps>({
      defaultValues: {
        sex: "male",
      },
    });

  const { sex } = getValues();

  return (
    <PageLayout
      title="Регистрация"
      buttonConfig={{
        text: "Зарегистрироваться",
        onClick: handleRegistration,
      }}
    >
      <Spacing space={SPACE_CONTAINER}>
        <InputText
          name={register("name").name}
          label="Ваше имя"
          placeholder="Введите имя"
          onChange={(value) => setValue("name", value)}
        />
      </Spacing>
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

      <Spacing className={styles.row} space={SPACE_CONTAINER}>
        <InputNumber
          name={register("age").name}
          label="Возраст"
          placeholder="напр. 27"
          onChange={(value) => setValue("age", value)}
        />
        <InputNumber
          name={register("weight").name}
          label="Вес"
          placeholder="напр. 75"
          onChange={(value) => setValue("weight", value)}
        />
        <InputNumber
          name={register("height").name}
          label="Рост"
          placeholder="напр. 173"
          onChange={(value) => setValue("height", value)}
        />
      </Spacing>

      <Spacing>
        <Select
          label="Ваш пол"
          placeholder="Ваш пол"
          name={register("sex").name}
          control={control}
          onChange={(option) => setValue("sex", option.id)}
          options={optionsSex}
          defaultOptionId={sex}
        />
      </Spacing>
    </PageLayout>
  );
}
