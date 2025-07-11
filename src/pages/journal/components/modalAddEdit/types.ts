import { MuscleGroup, MuscleType } from "@constants/muscles";

export type ModalAddEditProps = {
  buttonText: string;
  onClose(): void;
  editData?: ModalAddEditFormProps;
};

export type ModalAddEditFormProps = {
  exerciseId: string;
  name: string;
  muscleType: MuscleType;
  muscleGroup: MuscleGroup;
  sets?: {
    order: number;
    reps: number;
    weight: number;
  }[];
};
