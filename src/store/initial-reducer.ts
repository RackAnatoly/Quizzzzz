import {Dispatch, AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {quizAPI} from "../api/instance";

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, InitialStateType, unknown, AnyAction>;

const initialState: InitialStateType = {
    questions: [],
    categories: [],
    examDate: new Date().toISOString(),
};

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-QUESTIONS':
            return {...state, questions: action.questions};
        case 'APP/SET-CATEGORIES':
            return {...state, categories: action.categories};
        case 'APP/SET-EXAM-DATE':
            return {...state, examDate: action.date};
        default:
            return {...state};
    }
};

export type InitialStateType = {
    questions: any[];
    categories: any[];
    examDate: string | null;
};

export const setQuestionsAC = (questions: any) => ({type: "APP/SET-QUESTIONS", questions} as const);

export const setCategoriesAC = (categories: any) => ({type: "APP/SET-CATEGORIES", categories} as const);

export const setExamDate = (date: string): AppThunk => async (dispatch) => {
    try {
        await AsyncStorage.setItem("examDate", date);
        dispatch(setExamDateAC(date));
    } catch (error) {
        console.error("Error saving exam date:", error);
    }
};

const setExamDateAC = (date: string) =>
    ({type: "APP/SET-EXAM-DATE", date} as const);

export const initializeAppTC = (): AppThunk => async (dispatch) => {
    const response = await quizAPI.getAppData();
    dispatch(setQuestionsAC(response.data.data.questions));
    dispatch(setCategoriesAC(response.data.data.categories));
};

type ActionsType = ReturnType<typeof setQuestionsAC> | ReturnType<typeof setCategoriesAC> | ReturnType<typeof setExamDateAC>;