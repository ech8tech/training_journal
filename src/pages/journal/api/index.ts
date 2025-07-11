import { MuscleGroup } from "@constants/muscles";
import { CreateExerciseDto } from "@pages/journal/hooks/useCreateExercise/types";
import { CreateSessionDto } from "@pages/journal/hooks/useCreateSession/types";
import { EditExerciseDto } from "@pages/journal/hooks/useEditExercise/types";
import { apiConf } from "@utils/fetch";

export const apiJournal = {
  getExercises: (muscleGroup: MuscleGroup) => {
    return apiConf.get(`/exercise/all/${muscleGroup}`);
  },

  createExercise: (payload: CreateExerciseDto) => {
    return apiConf.post("/exercise/create", payload);
  },

  editExercise: (exerciseId: string, payload: EditExerciseDto) => {
    return apiConf.patch(`/exercise/edit/${exerciseId}`, payload);
  },

  createSession: (payload: CreateSessionDto) => {
    return apiConf.post("/session/create", payload);
  },

  deleteSession: (exerciseId: string) => {
    return apiConf.delete(`/session/delete/${exerciseId}`);
  },
};
