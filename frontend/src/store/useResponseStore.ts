import { create } from "zustand";

interface Answer {
  stepId: string;
  inputId: string;
  value: string;
}

interface ResponseState {
  answers: Answer[];
  setAnswer: (stepId: string, inputId: string, value: string) => void;
  resetAnswers: () => void;
}

export const useResponseStore = create<ResponseState>((set) => ({
  answers: [],

  setAnswer: (stepId, inputId, value) =>
    set((state) => ({
      answers: [
        ...state.answers.filter(
          (answer) => !(answer.stepId === stepId && answer.inputId === inputId)
        ),
        { stepId, inputId, value },
      ],
    })),

  resetAnswers: () => set({ answers: [] }),
}));
