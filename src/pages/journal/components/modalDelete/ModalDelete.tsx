import { useParams } from "react-router-dom";

import { ButtonsGroup } from "@components/buttons";
import { Spacing } from "@components/spacing/Spacing";
import { Text } from "@components/text";
import { MuscleGroup } from "@constants/muscles";
import {
  useDeleteExercise,
  useGetExercisesByMuscleGroup,
} from "@pages/journal/hooks";

import * as styles from "./ModalDelete.scss";
import { ModalDeleteProps } from "./types";

export function ModalDelete({ onClose, exerciseId }: ModalDeleteProps) {
  const params = useParams<{ muscleGroup: MuscleGroup }>();
  const muscleGroup = params.muscleGroup!;

  const { deleteExercise } = useDeleteExercise();
  const { getExercises } = useGetExercisesByMuscleGroup(muscleGroup, false);

  const handleSubmit = async () => {
    const deletedExercise = await deleteExercise(exerciseId);

    if (deletedExercise?.data) {
      await getExercises();
      onClose();
    }
  };

  return (
    <>
      <Spacing space={20}>
        <Text>Удалить упражнение?</Text>
      </Spacing>

      <div className={styles.controls}>
        <ButtonsGroup
          buttonsConfig={[
            { text: "Удалить", onClick: handleSubmit },
            { text: "Отмена", onClick: onClose },
          ]}
        />
      </div>
    </>
  );
}
