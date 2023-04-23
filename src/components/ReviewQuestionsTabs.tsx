import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { COLORS } from "./colors";
import { QuestionModel } from "../models/Question";
import { QuestionReviewListComponent } from "./QuestionReviewListComponent";

interface ReviewQuestionsTabsProps {
  allQuizAnswers: QuestionModel[];
  correctQuestions: QuestionModel[];
  incorrectQuestions: QuestionModel[];
}

export const ReviewQuestionsTabs: React.FC<ReviewQuestionsTabsProps> = ({
                                                                          allQuizAnswers,
                                                                          correctQuestions,
                                                                          incorrectQuestions,
                                                                        }) => {
  const [searchText, setSearchText] = useState("");
  const onSearchTextChange = (text) => {
    setSearchText(text);
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "correct", title: "Correct" },
    { key: "incorrect", title: "Incorrect" },
  ]);

  const filteredQuestions = (questions: QuestionModel[]) => {
    return questions.filter((question) =>
      question.question.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const renderScene = SceneMap({
    all: () => (
      <QuestionReviewListComponent questions={filteredQuestions(allQuizAnswers)} />
    ),
    correct: () => (
      <QuestionReviewListComponent questions={filteredQuestions(correctQuestions)} />
    ),
    incorrect: () => (
      <QuestionReviewListComponent questions={filteredQuestions(incorrectQuestions)} />
    ),
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search questions..."
          onChangeText={onSearchTextChange}
          value={searchText}
        />
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: COLORS.PRIMARY }}
            labelStyle={{ color: COLORS.PRIMARY }}
          />
        )}
        style={styles.tabView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    width: "100%",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  tabView: {
    flex: 1,
    width: "100%",
  },
});

export default ReviewQuestionsTabs;
