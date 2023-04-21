import { Dispatch } from "redux";
import { quizAPI } from "../api/instance";
import { Alert } from "react-native";

const initialState: InitialStateType = {
  allQuestions: []
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-ALL-QUESTIONS":
      return { ...state, allQuestions: action.questions };
    default:
      return { ...state };
  }
};

export type InitialStateType = {
  allQuestions: any[];
};

export const setAppInitializedAC = (questions: any) =>
  ({ type: "APP/SET-ALL-QUESTIONS", questions } as const);

export const initializeAppTC = () => (dispatch: any) => {
  quizAPI.getFormatedQuestions().then((res) => {
    //console.log(res.data.data[0]);
    if (res.data) {
      //console.log(res.data.data.options[0]);
      dispatch(setAppInitializedAC(res.data.data));
    } else {
      console.log("error");
    }
    //dispatch(setAppInitializedAC(true));
  });
};

type ActionsType = ReturnType<typeof setAppInitializedAC>;
