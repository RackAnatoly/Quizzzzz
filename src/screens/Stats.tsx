import React from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";
import { COLORS } from "../components/colors";
import FloatingMenu from "../components/FloatingMenu";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { QuestionModel } from "../models/Question";
import ReviewQuestionsTabs from "../components/ReviewQuestionsTabs";

export const Stats = ({ navigation }) => {
  const quizAnswers = useSelector((state: RootState) => state.quizAnswers);
  const questions = useSelector((state: RootState) => state.app.questions);

  const allQuestions = questions.map((question) => new QuestionModel(question));
  const allAnswers = quizAnswers.overallQuizAnswers;
  const correctAnswers = quizAnswers.overallQuizAnswers.filter((answer) => answer.isCorrect);
  const incorrectAnswers = quizAnswers.overallQuizAnswers.filter((answer) => !answer.isCorrect);

  const allQuizAnswers = allAnswers.map((answer) => allQuestions.find((q) => q.id === answer.questionId));
  const correctQuestions = correctAnswers.map((answer) => allQuestions.find((q) => q.id === answer.questionId));
  const incorrectQuestions = incorrectAnswers.map((answer) => allQuestions.find((q) => q.id === answer.questionId));

  const countAnswersByDay = (answers) => {
    return answers.reduce((acc, answer) => {
      const { date } = answer;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});
  };

  const dailyAnswerCount = countAnswersByDay(allAnswers);

  return (
    <View style={styles.container}>

      <View style={styles.dailyAnswerCountContainer}>
        <Text style={styles.dailyAnswerCountTitle}>Questions Answered by Day:</Text>
        {Object.entries(dailyAnswerCount).map(([date, count]) => (
          // @ts-ignore
          <Text key={date}>
            {date}: {count} questions
          </Text>
        ))}
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <Text>Review Questions</Text>
      </View>

      <ReviewQuestionsTabs
        allQuizAnswers={allQuizAnswers}
        correctQuestions={correctQuestions}
        incorrectQuestions={incorrectQuestions}
      />

      <FloatingMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  dailyAnswerCountContainer: {
    padding: 10,
  },
  dailyAnswerCountTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default Stats;
