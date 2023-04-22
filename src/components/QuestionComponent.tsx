import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {COLORS} from "./colors";
import {Question} from "../models/Question";
import {styles} from "../screens/styles";
import {updateLastQuizAnswers, updateOverallQuizAnswers} from "../store/quizAnswers-reducer";
import {useDispatch} from "react-redux";

interface QuestionWithOptionsProps {
  currentQuestion: Question;
  isExplanationShown: boolean;
  setIsExplanationShown: (value: boolean) => void;
  explanation: boolean;
  selectedOption: number | null;
  setSelectedOption: (value: number | null) => void;
}

export const QuestionComponent: React.FC<QuestionWithOptionsProps> = ({
                                                                        currentQuestion,
                                                                        isExplanationShown,
                                                                        setIsExplanationShown,
                                                                        explanation,
                                                                        selectedOption,
                                                                        setSelectedOption
                                                                      }) => {
  function getLetter(index: number) {
    switch (index) {
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "C";
      case 3:
        return "D";
    }
  }

  const dispatch = useDispatch();

  // Inside the onPress function for the Pressable component in the options/answers loop
  return (
    <View>
      {/* Question */}
      <Text style={styles.question}>{currentQuestion?.question}</Text>

      {/* Explanation */}
      <Pressable
        onPress={() => setIsExplanationShown(!isExplanationShown)}
      >
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              padding: 20,
              color: COLORS.LIGHT_GREEN,
            }}
          >
            {isExplanationShown
              ? "Hide Explanation"
              : "Show explanation"}
          </Text>
          {isExplanationShown && (
            <View style={{justifyContent: "space-around"}}>
              <Text>{currentQuestion?.explanation}</Text>
            </View>
          )}
        </View>
      </Pressable>

      {/* Options/Answers */}
      {currentQuestion?.shuffledOptions.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => {
            //setIsExplanationShown(true);
            if (selectedOption === null) {
              setSelectedOption(index);
              currentQuestion.setSelectedOption(item);
              const isCorrect = currentQuestion.isSelectedOptionCorrect();
              // @ts-ignore
              dispatch(updateLastQuizAnswers(currentQuestion.id, isCorrect));
              // @ts-ignore
              dispatch(updateOverallQuizAnswers(currentQuestion.id, isCorrect));
            }
          }}
          style={
            selectedOption !== null &&
            currentQuestion.isOptionCorrect(item)
              ? localStyles.correctAnswer
              : selectedOption === index
                ? localStyles.wrongAnswer
                : localStyles.anyAnswer
          }
        >
          {currentQuestion.isOptionSelected(item) &&
          currentQuestion.isSelectedOptionCorrect() ? (
            <View
              style={{
                backgroundColor: COLORS.LIGHT_GREEN,
                width: 44,
                height: 44,
                borderRadius: 22,
                marginRight: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.BLACK,
                }}
              >
                {getLetter(index)}
              </Text>
            </View>
          ) : currentQuestion.isOptionSelected(item) ? (
            <View
              style={{
                backgroundColor: COLORS.PINK,
                width: 44,
                height: 44,
                borderRadius: 22,
                marginRight: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.BLACK,
                }}
              >
                {getLetter(index)}
              </Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: COLORS.YELLOW,
                width: 44,
                height: 44,
                borderRadius: 22,
                marginRight: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.BLACK,
                }}
              >
                {getLetter(index)}
              </Text>
            </View>
          )}
          <Text style={{fontSize: 16, fontWeight: "500"}}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const localStyles = StyleSheet.create({
  correctAnswer: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-around",
    borderColor: COLORS.LIGHT_GREEN,
    borderRadius: 15,
    borderWidth: 3,
    padding: 10,
    marginVertical: 10
  },
  wrongAnswer: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-around",
    marginVertical: 10,
    borderWidth: 3,
    borderColor: COLORS.PINK,
    borderRadius: 15,
    padding: 10
  },
  anyAnswer: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-around",
    borderWidth: 1,
    borderColor: COLORS.YELLOW,
    marginVertical: 10,
    borderRadius: 15,
    padding: 10
  }
});