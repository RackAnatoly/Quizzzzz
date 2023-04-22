import {Dispatch, AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {quizAPI} from "../api/instance";

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, InitialStateType, unknown, AnyAction>;

const initialState: InitialStateType = {
    allQuestions: [],
    examDate: new Date().toISOString(),
};

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-ALL-QUESTIONS':
            return {...state, allQuestions: action.questions};
        case 'APP/SET-EXAM-DATE':
            return {...state, examDate: action.date};
        default:
            return {...state};
    }
};

export type InitialStateType = {
    allQuestions: any[];
    examDate: string | null;
};

export const setAppInitializedAC = (questions: any) =>
    ({type: "APP/SET-ALL-QUESTIONS", questions} as const);

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
    quizAPI.getFormatedQuestions().then((res) => {
        if (res.data) {
            dispatch(setAppInitializedAC(res.data.data));
        } else {
            console.log("error");
        }
    });
};

type ActionsType = ReturnType<typeof setAppInitializedAC> | ReturnType<typeof setExamDateAC>;
