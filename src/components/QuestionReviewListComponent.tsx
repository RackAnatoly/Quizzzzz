import {QuestionModel} from "../models/Question";
import {FlatList, StyleSheet, View, Text} from "react-native";
import {COLORS} from "./colors";

export const QuestionReviewListComponent = ({questions}: { questions: QuestionModel[] }) => {
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
