import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { routes } from "@app/routesConfig";
import { Input } from "@components/input";
import { PageLayout } from "@components/pageLayout/PageLayout";
import { Spacing } from "@components/spacing/Spacing";
import { Title } from "@components/title/Title";
import { SPACE_CONTAINER } from "@constants/spacing";

import * as styles from "./RegistrationConfirm.scss";
import { RegistrationConfirmFormProps } from "./types";

export default function RegistrationConfirm() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate(routes.REGISTRATION.PROFILE.path);
  };

  const { register, setValue, watch } = useForm<RegistrationConfirmFormProps>(
    {},
  );

  const code = watch("code");

  return (
    <PageLayout
      title="Регистрация"
      buttonConfig={{
        text: "Подтвердить",
        onClick: handleConfirm,
      }}
    >
      <Spacing space={SPACE_CONTAINER}>
        <Title size="h5">Введите одноразовый код отправленный на почту</Title>
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <Input
          classNameInput={code ? styles.code : undefined}
          name={register("code").name}
          label="Код"
          placeholder="Введите код"
          onChange={(value) => setValue("code", value)}
          maxLength={6}
        />
      </Spacing>
    </PageLayout>
  );
}
