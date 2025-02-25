import { InputNumber } from "@components/inputs/inputNumber/InputNumber";
import { InputText } from "@components/inputs/inputText/InputText";
import { PageLayout } from "@components/pageLayout/PageLayout";
import { Select } from "@components/select";
import { Spacing } from "@components/spacing/Spacing";
import { SPACE_CONTAINER } from "@constants/spacing";
import { optionsSex } from "@pages/registration/consts";
import { useForm } from "react-hook-form";

import * as styles from "./Registration.scss";

export function Registration() {
  const handleRegistration = () => {
    console.log("registration clicked");
  };

  const { register, watch, setValue } = useForm();
  console.log(watch());

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
        <InputText
          name={register("phone").name}
          label="Ваш телефон"
          placeholder="Введите телефон"
          onChange={(value) => setValue("tel", value)}
        />
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <InputText
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
          placeholder="Ваш возраст"
          onChange={(value) => setValue("age", value)}
        />
        <InputNumber
          name={register("weight").name}
          label="Вес"
          placeholder="Ваш вес"
          onChange={(value) => setValue("weight", value)}
        />
        <InputNumber
          name={register("height").name}
          label="Рост"
          placeholder="Ваш рост"
          onChange={(value) => setValue("height", value)}
        />
      </Spacing>

      <Spacing space={SPACE_CONTAINER}>
        <InputText
          name={register("password").name}
          label="Ваш пароль"
          placeholder="Введите пароль"
          onChange={(value) => setValue("password", value)}
        />
      </Spacing>

      <Spacing space={SPACE_CONTAINER}>
        <InputText
          name={register("password").name}
          label="Ваш пароль"
          placeholder="Введите пароль"
          onChange={(value) => setValue("password", value)}
        />
      </Spacing>

      <Spacing space={SPACE_CONTAINER}>
        <InputText
          name={register("password").name}
          label="Ваш пароль"
          placeholder="Введите пароль"
          onChange={(value) => setValue("password", value)}
        />
      </Spacing>

      <Spacing space={SPACE_CONTAINER}>
        <InputText
          name={register("password").name}
          label="Ваш пароль"
          placeholder="Введите пароль"
          onChange={(value) => setValue("password", value)}
        />
      </Spacing>

      <Spacing space={SPACE_CONTAINER}>
        <InputText
          name={register("password").name}
          label="Ваш пароль"
          placeholder="Введите пароль"
          onChange={(value) => setValue("password", value)}
        />
      </Spacing>

      <Spacing>
        <Select
          register={register("sex")}
          options={optionsSex}
          placeholder="Ваш пол"
        />
      </Spacing>
    </PageLayout>
  );
}
