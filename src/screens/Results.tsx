import React, {useState} from "react";
import {SafeAreaView, StyleSheet, Text, View, FlatList} from "react-native";
import {TabView, SceneMap, TabBar} from "react-native-tab-view";
import {COLORS} from "../components/colors";
import {useRoute} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {QuestionModel} from "../models/Question";

export const Results = () => {
  const route = useRoute();

  const quizAnswers = useSelector((state: RootState) => state.quizAnswers);
  const questions = useSelector((state: RootState) => state.app.questions);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: "all", title: "All"},
    {key: "correct", title: "Correct"},
    {key: "incorrect", title: "Incorrect"},
  ]);

  const allQuestions = questions.map((question) => new QuestionModel(question));
  const allAnswers = quizAnswers.lastQuizAnswers;
  const correctAnswers = quizAnswers.lastQuizAnswers.filter((answer) => answer.isCorrect);
  const incorrectAnswers = quizAnswers.lastQuizAnswers.filter((answer) => !answer.isCorrect);

  const allQuizAnswers = allAnswers.map((answer) => allQuestions.find((q) => q.id === answer.questionId));
  const correctQuestions = correctAnswers.map((answer) => allQuestions.find((q) => q.id === answer.questionId));
  const incorrectQuestions = incorrectAnswers.map((answer) => allQuestions.find((q) => q.id === answer.questionId));

  const score = (correctAnswers.length / quizAnswers.lastQuizAnswers.length) * 100;

  const renderScene = SceneMap({
    all: () => <QuestionList questions={allQuizAnswers} />,
    correct: () => <QuestionList questions={correctQuestions} />,
    incorrect: () => <QuestionList questions={incorrectQuestions} />,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.score}>Your score: {score.toFixed(2)}%</Text>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: COLORS.PRIMARY}}
            labelStyle={{color: COLORS.PRIMARY}}
          />
        )}
        style={styles.tabView}
      />
    </SafeAreaView>
  );
};

const QuestionList = ({questions}: { questions: QuestionModel[] }) => {
  const renderItem = ({item}: { item: QuestionModel }) => {
    return (
      <View style={styles.questionItem}>
        <Text style={styles.questionText}>{item.question}</Text>
        <Text style={styles.correctAnswer}>
          Correct answer: {item.answer}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={questions}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
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
  tabView: {
    width: "100%",
    height: "100%",
  },
  questionItem: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  correctAnswer: {
    fontSize: 16,
    color: COLORS.GREEN,
  },
});