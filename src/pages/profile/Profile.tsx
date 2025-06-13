import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { routes } from "@app/routesConfig";
import { Input } from "@components/input";
import { PageLayout } from "@components/pageLayout/PageLayout";
import { Select } from "@components/select";
import { Spacing } from "@components/spacing/Spacing";
import { Spinner } from "@components/spinner/Spinner";
import { SPACE_CONTAINER } from "@constants/spacing";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@utils/fetch";

import { optionsSex } from "./consts";
import * as styles from "./Profile.scss";
import { RegistrationProfileFormProps } from "./types";

export default function Profile() {
  const navigate = useNavigate();

  const { control, register, getValues, setValue } =
    useForm<RegistrationProfileFormProps>({
      defaultValues: {
        sex: "male",
      },
    });

  const { sex } = getValues();

  const { isPending, mutateAsync: createProfile } = useMutation({
    mutationFn: (payload: RegistrationProfileFormProps) => {
      return api.post(`/profile/create`, payload);
    },
    onSuccess: ({ data }) => {
      if (data.id) {
        navigate(routes.DASHBOARD.path);
      }
    },
  });

  const { data, isFetching: isLoading } = useQuery({
    queryKey: ["CHECK_USER_PROFILE"],
    queryFn: () => api.get("/profile/check"),
  });

  useEffect(() => {
    if (data?.data?.id) {
      navigate(routes.DASHBOARD.path);
    }
  }, [data]);

  const handleConfirm = async () => {
    await createProfile(getValues());
  };

  if (isLoading) {
    return <Spinner isFullPage />;
  }

  return (
    <PageLayout
      title="Заполните профиль"
      buttonConfig={{
        isLoading: isPending,
        text: "Подтвердить",
        onClick: handleConfirm,
      }}
    >
      <Spacing space={SPACE_CONTAINER}>
        <Input
          {...register("name")}
          label="Ваше имя"
          placeholder="Введите имя"
        />
      </Spacing>

      <Spacing className={styles.row} space={SPACE_CONTAINER}>
        <Input {...register("age")} label="Возраст" placeholder="напр. 27" />
        <Input {...register("weight")} label="Вес" placeholder="напр. 75" />
        <Input {...register("height")} label="Рост" placeholder="напр. 173" />
      </Spacing>

      <Spacing>
        <Select
          label="Ваш пол"
          placeholder="Ваш пол"
          name={register("sex").name}
          control={control}
          onChange={(option) => setValue("sex", option?.id)}
          options={optionsSex}
          defaultOptionId={sex}
        />
      </Spacing>
    </PageLayout>
  );
}
