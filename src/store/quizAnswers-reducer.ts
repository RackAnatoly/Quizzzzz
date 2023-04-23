import {AppThunk} from "./initial-reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    case "APP/RESET-OVERALL-QUIZ-ANSWERS":
      return {...state, overallQuizAnswers: []};
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

export const resetLastQuizAnswersAC = () => ({ type: "APP/RESET-LAST-QUIZ-ANSWERS" } as const);
export const resetOverallQuizAnswersAC = () => ({ type: "APP/RESET-OVERALL-QUIZ-ANSWERS" } as const);

export const updateLastQuizAnswersTC = (questionId: number, isCorrect: boolean): AppThunk => async (
  dispatch,
  getState
) => {
  const {lastQuizAnswers} = getState().quizAnswers;
  const updatedLastQuizAnswers = [...lastQuizAnswers, {questionId, isCorrect}];
  dispatch(setLastQuizAnswersAC(updatedLastQuizAnswers));
};

export const updateOverallQuizAnswersTC = (questionId: number, isCorrect: boolean, date: string): AppThunk => async (
  dispatch,
  getState
) => {
  const {overallQuizAnswers} = getState().quizAnswers;
  const updatedOverallQuizAnswers = [...overallQuizAnswers, {questionId, isCorrect, date}];
  dispatch(setOverallQuizAnswersAC(updatedOverallQuizAnswers));
  await AsyncStorage.setItem('overallQuizAnswers', JSON.stringify(updatedOverallQuizAnswers));
};

export const initializeOverallQuizAnswersTC = (): AppThunk => async (dispatch) => {
  const storedOverallQuizAnswers = await AsyncStorage.getItem('overallQuizAnswers');
  if (storedOverallQuizAnswers) {
    const parsedOverallQuizAnswers = JSON.parse(storedOverallQuizAnswers);
    console.log('overallQuizAnswers', parsedOverallQuizAnswers);
    dispatch(setOverallQuizAnswersAC(parsedOverallQuizAnswers));
  }
};

export const resetOverallQuizAnswersTC = (): AppThunk => async (dispatch) => {
  await AsyncStorage.removeItem('overallQuizAnswers');
  dispatch(resetOverallQuizAnswersAC());
};

type QuizAnswersActionsType =
  | ReturnType<typeof setLastQuizAnswersAC>
  | ReturnType<typeof setOverallQuizAnswersAC>
  | ReturnType<typeof resetOverallQuizAnswersAC>
  | ReturnType<typeof resetLastQuizAnswersAC>;
