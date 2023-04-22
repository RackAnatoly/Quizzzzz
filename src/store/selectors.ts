import { AppRootStateType } from './store';

export const selectQuestions = (state: AppRootStateType) => state.app.questions;

export const selectCategories = (state: AppRootStateType) => state.app.categories;
