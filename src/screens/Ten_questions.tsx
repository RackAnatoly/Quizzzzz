import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import OptionsButton from "../components/OptionsButton";
import { COLORS } from "../components/colors";

const questions = [
  {
    question: "In what contintent is Indonesia?",
    options: [
      {
        id: "0",
        options: "A",
        answer: "South America"
      },
      {
        id: "1",
        options: "B",
        answer: "Europe"
      },
      {
        id: "2",
        options: "C",
        answer: "Asia"
      },
      {
        id: "0",
        options: "D",
        answer: "India"
      }
    ],
    correctAnswerIndex: 2
  },
  {
    question: "Which continent has the highest population density? ",
    options: [
      {
        id: "0",
        options: "A",
        answer: "Asia"
      },
      {
        id: "1",
        options: "B",
        answer: "South Africa"
      },
      {
        id: "2",
        options: "C",
        answer: "Australia"
      },
      {
        id: "0",
        options: "D",
        answer: "Antarctica"
      }
    ],
    correctAnswerIndex: 0
  }
];

export const Ten_questions = ({ navigation }) => {
  const data = questions;
  const totalQuestions = data.length;
  // points
  const [points, setPoints] = useState(0);

  // index of the question
  const [index, setIndex] = useState(0);

  // answer Status (true or false)
  const [answerStatus, setAnswerStatus] = useState(null);

  // answers
  const [answers, setAnswers] = useState([]);

  // selected answer
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  // Counter
  const [counter, setCounter] = useState(15);

  // interval
  let interval = null;

  // progress bar
  const progressPercentage = Math.floor((index / totalQuestions) * 100);

  const currentQuestion = data[index];

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {
        setPoints((points) => points + 10);
        setAnswerStatus(true);
        answers.push({ question: index + 1, answer: true });
      } else {
        setAnswerStatus(false);
        answers.push({ question: index + 1, answer: false });
      }
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
  }, [index]);

  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter((state) => state - 1);
      }
      if (counter === 0) {
        setIndex(index + 1);
        setCounter(15);
      }
    };

    interval = setTimeout(myInterval, 1000);

    // clean up
    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

  useEffect(() => {
    if (index + 1 > data.length) {
      clearTimeout(interval);
      navigation.navigate("Results", {
        answers: answers,
        points: points
      });
    }
  }, [index]);

  useEffect(() => {
    if (!interval) {
      setCounter(15);
    }
  }, [index]);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10
        }}
      >
        <Text>Quiz Challenge</Text>
        <Pressable
          style={{ padding: 10, backgroundColor: "magenta", borderRadius: 20 }}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            {counter}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 10
        }}
      >
        <Text>Your Progress</Text>
        <Text>
          ({index}/{totalQuestions}) questions answered
        </Text>
      </View>
      {/* Progress Bar */}
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          height: 10,
          borderRadius: 20,
          justifyContent: "center",
          marginTop: 20,
          marginLeft: 10
        }}
      >
        <Text
          style={{
            backgroundColor: "#FFC0CB",
            borderRadius: 12,
            position: "absolute",
            left: 0,
            height: 10,
            right: 0,
            width: `${progressPercentage}%`,
            marginTop: 20
          }}
        />
      </View>
      <Pressable
        style={{
          width: "100%",
          height: 72,
          backgroundColor: COLORS.BLACK,
          borderWidth: 1,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <Text style={{ fontSize: 16, color: COLORS.WHITE, fontWeight: "bold" }}>
          Continue
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  question: {
    width: "100%",
    minHeight: 200,
    backgroundColor: COLORS.YELLOW,
    borderRadius: 15,
    //alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10
  }
});
