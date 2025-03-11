import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { routes } from "@app/routesConfig";
import { Input } from "@components/input";
import { InputNumber } from "@components/inputs";
import { PageLayout } from "@components/pageLayout/PageLayout";
import { Select } from "@components/select";
import { Spacing } from "@components/spacing/Spacing";
import { SPACE_CONTAINER } from "@constants/spacing";

import { optionsSex } from "./consts";
import * as styles from "./RegistrationProfile.scss";
import { RegistrationProfileFormProps } from "./types";

export default function RegistrationProfile() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate(routes.DASHBOARD.path);
  };

  const { control, register, getValues, setValue } =
    useForm<RegistrationProfileFormProps>({
      defaultValues: {
        sex: "male",
      },
    });

  const { sex } = getValues();

  return (
    <PageLayout
      title="Регистрация"
      buttonConfig={{
        text: "Подтвердить",
        onClick: handleConfirm,
      }}
    >
      <Spacing space={SPACE_CONTAINER}>
        <Input
          name={register("name").name}
          label="Ваше имя"
          placeholder="Введите имя"
          onChange={(value) => setValue("name", value)}
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
