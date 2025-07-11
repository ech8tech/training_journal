import { useForm } from "react-hook-form";

import IconFull from "@assets/icons/muscles_full/full.svg";
import IconEdit from "@assets/icons/other/IconEdit.svg";
import { Button } from "@components/buttons";
import { Input } from "@components/input";
import { useModal } from "@components/modal/hooks/useModal";
import { Spacing } from "@components/spacing/Spacing";
import { Text } from "@components/text/Text";

import * as styles from "./MainInfo.scss";

export function MainInfo() {
  const { openModal, modal } = useModal();
  const { register, getValues } = useForm({
    defaultValues: {
      name: "Эдуард",
      height: "173",
      weight: "73",
      age: "27",
    },
  });

  const { name, height, weight, age } = getValues();

  const handleEdit = () => {
    openModal({
      title: "Редактирование профиля",
      content: (
        <>
          <Spacing space={20}>
            <Input
              label="Имя"
              placeholder="Введите имя"
              {...register("name")}
            />
          </Spacing>
          <Spacing space={20}>
            <Input
              label="Рост"
              type="number"
              placeholder="Введите рост"
              {...register("height")}
            />
          </Spacing>
          <Spacing space={20}>
            <Input
              label="Вес"
              type="number"
              placeholder="Введите вес"
              {...register("weight")}
            />
          </Spacing>
          <Spacing space={20}>
            <Input
              label="Возраст"
              type="number"
              placeholder="Введите возраст"
              {...register("age")}
            />
          </Spacing>
        </>
      ),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div>
          <IconFull />
        </div>
        <div className={styles.profile}>
          <Spacing space={8}>
            <Text>Имя: {name}</Text>
          </Spacing>
          <Spacing space={8}>
            <Text>Рост: {height} см</Text>
          </Spacing>
          <Spacing space={8}>
            <Text>Вес: {weight} кг</Text>
          </Spacing>
          <Spacing space={8}>
            <Text>Возраст: {age} лет</Text>
          </Spacing>
        </div>
      </div>
      <div>
        <Button
          text="Редактировать"
          type="primary"
          size="sm"
          variant="wide"
          onClick={handleEdit}
          icon={<IconEdit />}
        />
      </div>
      {modal}
    </div>
  );
}
