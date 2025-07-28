import dayjs from "dayjs";
import { omit } from "lodash";
import { ChangeEvent } from "react";
import { Path, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import IconDelete from "@assets/icons/other/IconDelete.svg";
import IconPlus from "@assets/icons/other/IconPlus.svg";
import { Button, ButtonsGroup } from "@components/buttons";
import { Input } from "@components/input";
import { Select } from "@components/select";
import { Spacing } from "@components/spacing/Spacing";
import { DATE_FORMAT } from "@constants/format";
import { MuscleGroup, MuscleType } from "@constants/muscles";
import { SPACE_INNER } from "@constants/spacing";
import { useCreateExercise } from "@pages/journal/hooks/useCreateExercise";
import { useCreateSession } from "@pages/journal/hooks/useCreateSession";
import { useEditExercise } from "@pages/journal/hooks/useEditExercise";
import { SetDto } from "@pages/journal/types";

import * as styles from "./ModalAddEdit.scss";
import { ModalAddEditFormProps, ModalAddEditProps } from "./types";
import { getMuscleOptions } from "./utils";

export function ModalAddEdit({
  buttonText,
  onClose,
  mode,
  editData,
}: ModalAddEditProps) {
  const isEditExerciseMode = mode === "editExercise";
  const isAddSessionMode = mode === "addSession";

  const params = useParams<{ muscleGroup: MuscleGroup }>();
  const muscleGroup = params.muscleGroup!;

  const { getValues, register, control, setValue } =
    useForm<ModalAddEditFormProps>({
      defaultValues: { muscleGroup, ...editData },
    });

  const muscleType = getValues("muscleType");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sets",
  });

  const { createExercise } = useCreateExercise(onClose);
  const { editExercise } = useEditExercise(onClose);
  const { createSession } = useCreateSession(onClose);

  const handleChangeField = (
    path: Path<ModalAddEditFormProps>,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setValue(path, +e.target.value);
  };

  const handleSubmit = async () => {
    const values = getValues();
    let payload = values;

    if (values?.sets?.length) {
      payload = {
        ...payload,
        sets: values.sets.map((set, index) => ({
          ...set,
          order: index + 1,
        })),
      };
    }

    if (isAddSessionMode) {
      await createSession({
        date: dayjs().format(DATE_FORMAT),
        exerciseId: values.exerciseId,
        // при создании сессий мы отправляем НОВЫЕ подходы
        sets: payload?.sets?.map((set) => omit(set, ["id"])),
      });
      return;
    }

    if (isEditExerciseMode) {
      await editExercise({ exerciseId: values.exerciseId, payload });
    } else {
      await createExercise(payload);
    }

    onClose();
  };

  return (
    <>
      <Spacing space={20}>
        <Select
          label="Выберите область мышц"
          placeholder="Область мышц"
          name={register("muscleType").name}
          control={control}
          onChange={(option) =>
            setValue("muscleType", option?.id as MuscleType)
          }
          options={getMuscleOptions(muscleGroup)}
          defaultOptionId={muscleType}
        />
      </Spacing>
      <Spacing space={20}>
        <Input
          {...register("name")}
          className={styles.field_input}
          placeholder="Введите наименование"
          label="Наименование упражнения"
          onChange={(e) => setValue("name", e.target.value)}
        />
      </Spacing>
      <Spacing space={8}>
        {fields.map((field, index) => {
          return (
            <Spacing space={8} key={field.id} className={styles.field}>
              <Input
                {...register(`sets.${index}.reps`)}
                className={styles.field_input}
                label={index === 0 ? "Подходы" : ""}
                onChange={(e) => handleChangeField(`sets.${index}.reps`, e)}
              />
              <Input
                {...register(`sets.${index}.weight`)}
                className={styles.field_input}
                label={index === 0 ? "Вес" : ""}
                onChange={(e) => handleChangeField(`sets.${index}.weight`, e)}
              />

              <Button
                type="danger"
                icon={<IconDelete />}
                onClick={() => remove(index)}
              />
            </Spacing>
          );
        })}
      </Spacing>
      <Spacing space={SPACE_INNER} className={styles.actions}>
        <Button
          text="Добавить подход"
          icon={<IconPlus />}
          type="ghost"
          onClick={() => append({} as SetDto)}
        />
      </Spacing>
      <div className={styles.controls}>
        <ButtonsGroup
          buttonsConfig={[
            { text: buttonText, onClick: handleSubmit },
            { text: "Отмена", onClick: onClose },
          ]}
        />
      </div>
    </>
  );
}
