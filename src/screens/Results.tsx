import React, {useState} from "react";
import {SafeAreaView, StyleSheet, Text} from "react-native";
import {TabView, SceneMap, TabBar} from "react-native-tab-view";
import {COLORS} from "../components/colors";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {QuestionModel} from "../models/Question";
import {QuestionReviewListComponent} from "../components/QuestionReviewListComponent";
import {styles as globalStyles} from "./styles";
import ReviewQuestionsTabs from "../components/ReviewQuestionsTabs";

export const Results = () => {
  const quizAnswers = useSelector((state: RootState) => state.quizAnswers);
  const questions = useSelector((state: RootState) => state.app.questions);

  const allQuestions = questions.map((question) => new QuestionModel(question));
  const allAnswers = quizAnswers.lastQuizAnswers;
  const correctAnswers = quizAnswers.lastQuizAnswers.filter((answer) => answer.isCorrect);
  const incorrectAnswers = quizAnswers.lastQuizAnswers.filter((answer) => !answer.isCorrect);

  const allQuizAnswers = allAnswers.map((answer) => allQuestions.find((q) => q.id === answer.questionId));
  const correctQuestions = correctAnswers.map((answer) => allQuestions.find((q) => q.id === answer.questionId));
  const incorrectQuestions = incorrectAnswers.map((answer) => allQuestions.find((q) => q.id === answer.questionId));

  const score = (correctAnswers.length / quizAnswers.lastQuizAnswers.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.score}>Your score: {score.toFixed(2)}%</Text>
      <ReviewQuestionsTabs
        allQuizAnswers={allQuizAnswers}
        correctQuestions={correctQuestions}
        incorrectQuestions={incorrectQuestions}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});