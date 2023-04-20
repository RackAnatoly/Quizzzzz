import axios from "axios";

const instance = axios.create({
  baseURL: "http://vmwarewalkthroughs.com/api/"
});

export const quizAPI = {
  getFormatedQuestions() {
    const promise = instance.post<any>("formatted-questions", {
      app_id: 1,
      qty: 2,
      category_id: 3
    });
    return promise;
  }
};
