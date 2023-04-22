import React, {useEffect, useState} from "react";
import {
  Pressable,
  ScrollView, StyleSheet,
  Text,
  View
} from "react-native";
import {COLORS} from "../components/colors";
import {styles} from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {selectQuestions} from "../store/selectors";
import _ from 'lodash';
import {Question, QuestionModel} from "../models/Question";
import {QuestionComponent} from "../components/QuestionComponent";
import {resetLastQuizAnswersAC} from "../store/quizAnswers-reducer";

export const TenQuestions = ({navigation, route}) => {

  const questions = useSelector(selectQuestions);
  const dispatch = useDispatch();
  const [sampledQuestions, setSampledQuestions] = useState<QuestionModel[]>([]);

  useEffect(() => {
    const newSampledQuestions = _.sampleSize(questions, 10).map((question: Question) => new QuestionModel(question));
    setSampledQuestions(newSampledQuestions);
    dispatch(resetLastQuizAnswersAC());
  }, [questions]);

  const [isExplanationShown, setIsExplanationShown] = useState(false);
  const [explanation, setExplanation] = useState(false);
  const totalQuestions = sampledQuestions.length;
  const [index, setIndex] = useState(0);

  const progressPercentage = Math.floor((index / totalQuestions) * 100);

  const currentQuestion: Question = sampledQuestions[index];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    setSelectedOption(null);
    setIsExplanationShown(false);
  }, [index]);

  return (
    <View style={styles.container}>
      <View style={styles.menuBarContainer}>
        <Pressable onPress={() => navigation.popToTop()}>
          <Text>Quit</Text>
        </Pressable>
        <Text>
          {index}/{totalQuestions}
        </Text>
        <Text>Mark</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[styles.progressStatus, {width: `${progressPercentage}%`}]}
        >
          <View
            style={localStyles.progressBar}
          />
        </View>
      </View>

      <ScrollView>
        <QuestionComponent
          currentQuestion={currentQuestion}
          isExplanationShown={isExplanationShown}
          setIsExplanationShown={setIsExplanationShown}
          explanation={explanation}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        {/* CONTINUE */}

        {index + 1 >= sampledQuestions.length ? (
          <Pressable
            onPress={() => {
              navigation.navigate("Results", {
              });
            }}
            style={styles.doneButton}
          >
            <Text style={{color: "white"}}>Done</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              setIndex(index + 1);
              setExplanation(false);
            }}
            style={localStyles.continueButton}
          >
            <Text style={{color: "white"}}>Continue</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  continueButton: {
    width: "100%",
    height: 72,
    backgroundColor: COLORS.BLACK,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-around"
  },
  progressBar: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.BLACK,
    position: "absolute",
    top: "50%",
    right: -5,
    borderRadius: 4,
    transform: [{translateY: -4}]
  }
});