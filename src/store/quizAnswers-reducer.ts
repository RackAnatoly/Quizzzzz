import {AppThunk} from "./initial-reducer";

export type QuizAnswersState = {
  lastQuizAnswers: any[];
  overallQuizAnswers: any[];
};

const initialState: QuizAnswersState = {
  lastQuizAnswers: [],
  overallQuizAnswers: [],
};

export const quizAnswersReducer = (
  state: QuizAnswersState = initialState,
  action: QuizAnswersActionsType
): QuizAnswersState => {
  switch (action.type) {
    case "QUIZ_ANSWERS/SET-LAST-QUIZ-ANSWERS":
      return {...state, lastQuizAnswers: action.answers};
    case "QUIZ_ANSWERS/SET-OVERALL-QUIZ-ANSWERS":
      return {...state, overallQuizAnswers: action.answers};
    case "APP/RESET-LAST-QUIZ-ANSWERS":
      return {...state, lastQuizAnswers: []};
    default:
      return {...state};
  }
};

export const setLastQuizAnswersAC = (answers: any) => ({
  type: "QUIZ_ANSWERS/SET-LAST-QUIZ-ANSWERS",
  answers,
} as const);

export const setOverallQuizAnswersAC = (answers: any) => ({
  type: "QUIZ_ANSWERS/SET-OVERALL-QUIZ-ANSWERS",
  answers,
} as const);

export const updateLastQuizAnswers = (questionId: number, isCorrect: boolean): AppThunk => async (
  dispatch,
  getState
) => {
  const {lastQuizAnswers} = getState().quizAnswers;
  const updatedLastQuizAnswers = [...lastQuizAnswers, {questionId, isCorrect}];
  dispatch(setLastQuizAnswersAC(updatedLastQuizAnswers));
};

export const updateOverallQuizAnswers = (questionId: number, isCorrect: boolean): AppThunk => async (
  dispatch,
  getState
) => {
  const {overallQuizAnswers} = getState().quizAnswers;
  const updatedOverallQuizAnswers = [...overallQuizAnswers, {questionId, isCorrect}];
  dispatch(setOverallQuizAnswersAC(updatedOverallQuizAnswers));
};

export const resetLastQuizAnswersAC = () => ({ type: "APP/RESET-LAST-QUIZ-ANSWERS" } as const);

type QuizAnswersActionsType =
  | ReturnType<typeof setLastQuizAnswersAC>
  | ReturnType<typeof setOverallQuizAnswersAC>
  | ReturnType<typeof resetLastQuizAnswersAC>;
