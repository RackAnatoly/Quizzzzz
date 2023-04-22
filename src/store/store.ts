import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { appReducer, InitialStateType as AppState } from './initial-reducer';
import { quizAnswersReducer, QuizAnswersState } from './quizAnswers-reducer';

export type RootState = {
  app: AppState;
  quizAnswers: QuizAnswersState;
};

const rootReducer = combineReducers({
  app: appReducer,
  quizAnswers: quizAnswersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
