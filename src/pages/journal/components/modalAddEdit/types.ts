import { MuscleGroup, MuscleType } from "@constants/muscles";

export type ModalAddEditProps = {
  buttonText: string;
  mode: "addExercise" | "editExercise" | "addSession";
  onClose(): void;
  editData?: ModalAddEditFormProps;
};

export type ModalAddEditFormProps = {
  exerciseId: string;
  name: string;
  muscleType: MuscleType;
  muscleGroup: MuscleGroup;
  sets?: {
    id?: string;
    order: number;
    reps: number;
    weight: number;
  }[];
};
