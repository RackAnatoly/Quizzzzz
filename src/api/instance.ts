import axios from "axios";

const instance = axios.create({
  baseURL: "http://vmwarewalkthroughs.com/api/"
});

export const quizAPI = {
  getFormatedQuestions() {
    return instance.post<any>("formatted-questions", {
      app_id: 1,
      qty: 1000,
      category_id: 3
    });
  },
  getAppData() {
    return instance.post<any>("get-app-data", {
      app_id: 1,
    });
  }
};
