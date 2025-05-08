export type ModalFormData = {
  reps?: number;
  weight?: number;
};

export type ModalAddEditProps = {
  formData?: ModalAddEditFormProps;
};

export type ModalAddEditFormProps = {
  exerciseName: string;
  muscleType: string;
  data: ModalFormData[];
};
