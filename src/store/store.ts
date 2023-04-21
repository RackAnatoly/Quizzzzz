import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { appReducer, InitialStateType } from "./initial-reducer"; // Import InitialStateType

const rootReducer = combineReducers({ app: appReducer });

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<InitialStateType, unknown, AnyAction>; // Use InitialStateType instead of AppRootStateType
