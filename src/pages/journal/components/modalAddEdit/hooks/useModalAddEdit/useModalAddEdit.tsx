import { useParams } from "react-router-dom";

import { useModal } from "@components/modal/hooks/useModal";
import { MuscleGroup } from "@constants/muscles";
import { useGetExercisesByMuscleGroup } from "@pages/journal/hooks";

import { ModalAddEdit } from "../../ModalAddEdit";
import { ModalAddEditFormProps } from "../../types";

export function useModalAddEdit() {
  const params = useParams<{ muscleGroup: MuscleGroup }>();
  const muscleGroup = params.muscleGroup!;

  const { openModal, modal, onClose } = useModal();

  const { getExercises } = useGetExercisesByMuscleGroup(muscleGroup);

  const handleClose = async () => {
    await getExercises();
    onClose();
  };

  const handleOpenModal = (
    title: string,
    buttonText: string,
    mode: "addExercise" | "editExercise" | "addSession",
    editData?: ModalAddEditFormProps,
  ) => {
    openModal({
      title,
      content: (
        <ModalAddEdit
          onClose={handleClose}
          buttonText={buttonText}
          editData={editData}
          mode={mode}
        />
      ),
    });
  };

  return { handleOpenModal, modal };
}
