import { ChangeEvent } from "react";
import { Path, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import IconDelete from "@assets/icons/other/IconDelete.svg";
import IconPlus from "@assets/icons/other/IconPlus.svg";
import { Button } from "@components/buttons";
import { Input } from "@components/input";
import { Select } from "@components/select";
import { Spacing } from "@components/spacing/Spacing";
import { MuscleGroupType } from "@pages/journal/consts";
import { getMuscleOptions } from "@pages/journal/modalAddEdit/utils";

import * as styles from "./ModalAddEdit.scss";
import { ModalAddEditFormProps, ModalAddEditProps } from "./types";

export function ModalAddEdit({ formData }: ModalAddEditProps) {
  const params = useParams<{ muscleGroupType: MuscleGroupType }>();
  const muscleGroupType = params.muscleGroupType!;

  const { register, watch, control, setValue } = useForm<ModalAddEditFormProps>(
    { defaultValues: { ...formData } },
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "data",
  });

  const handleChangeField = (
    path: Path<ModalAddEditFormProps>,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setValue(path, +e.target.value);
  };

  return (
    <div>
      <Spacing space={20}>
        <Input
          {...register("exerciseName")}
          className={styles.field_input}
          placeholder="Введите наименование"
          label="Наименование упражнения"
          onChange={(e) => setValue("exerciseName", e.target.value)}
        />
      </Spacing>
      <Spacing space={20}>
        <Select
          label="Выберите область мышц"
          placeholder="Область мышц"
          name={register("muscleType").name}
          control={control}
          onChange={(option) => setValue("muscleType", option.id)}
          options={getMuscleOptions(muscleGroupType)}
        />
      </Spacing>
      <Spacing space={8}>
        {fields.map((field, index) => {
          return (
            <Spacing space={8} key={field.id} className={styles.field}>
              <Input
                {...register(`data.${index}.reps`)}
                className={styles.field_input}
                label={index === 0 ? "Подходы" : ""}
                onChange={(e) => handleChangeField(`data.${index}.reps`, e)}
              />
              <Input
                {...register(`data.${index}.weight`)}
                className={styles.field_input}
                label={index === 0 ? "Вес" : ""}
                onChange={(e) => handleChangeField(`data.${index}.weight`, e)}
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
      <div className={styles.buttonAdd}>
        <Button
          text="Добавить подход"
          icon={<IconPlus />}
          type="ghost"
          onClick={() => append({})}
        />
      </div>
    </div>
  );
}
