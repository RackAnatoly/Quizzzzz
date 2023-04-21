import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import OptionsButton from "../components/OptionsButton";
import { COLORS } from "../components/colors";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../store/store";
import { Colors } from "react-native/Libraries/NewAppScreen";

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
  },
  {
    question: "Which code ? ",
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
  },
  {
    question: "Which code ? ",
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

export const TimedQuizzes = ({ navigation, route }) => {
  //const bbb = route.params.aaa;
  //console.log(bbb);

  //или слайс с параментами от и до в рандомном порядке, или промежуточный экран чтобы обновлял предыдущий
  const aaa = useSelector((state) => state.app.allQuestions);
  //const shuffledArray = aaa.sort(() => Math.random() - 0.5);
  //console.log(bbb.length, "sdsds");
  console.log(aaa[0]);

  const data = aaa;
  const [isExplanationShown, setIsExplanationShown] = useState(false);
  const [explanation, setExplanation] = useState(false);
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
  const [counter, setCounter] = useState(565);

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
        // setIndex(index + 1);
        // setCounter(15);
        navigation.navigate("Results", {
          answers: answers,
          points: points
        });
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

  // useEffect(() => {
  //   if (!interval) {
  //     setCounter(15);
  //   }
  // }, [index]);
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    // добавляем нули перед однозначными числами
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }
  return (
    <View style={styles.container}>
      <View style={styles.menuBarContainer}>
        <Pressable onPress={() => navigation.popToTop()}>
          <Text>Quit</Text>
        </Pressable>
        <View
          style={{
            width: 80,
            height: 24,
            backgroundColor: COLORS.GREY,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10
          }}
        >
          <Text style={{ color: counter >= 60 ? COLORS.BLACK : COLORS.RED }}>
            {formatTime(counter)}
          </Text>
        </View>

        <Text>
          {index}/{totalQuestions}
        </Text>
        <Text>Mark</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[styles.progressStatus, { width: `${progressPercentage}%` }]}
        >
          <View
            style={{
              width: 8,
              height: 8,
              backgroundColor: COLORS.BLACK,
              position: "absolute",
              top: "50%",
              right: -5,
              borderRadius: 4,
              transform: [{ translateY: -4 }]
            }}
          />
        </View>
      </View>
      <ScrollView>
        {/* question */}
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{currentQuestion?.question}</Text>
          {explanation && (
            <Pressable
              onPress={() => setIsExplanationShown(!isExplanationShown)}
            >
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    padding: 20,
                    color: COLORS.LIGHT_GREEN
                  }}
                >
                  {isExplanationShown ? "Hide Explanation" : "Show explanation"}
                </Text>
                {isExplanationShown && (
                  <View style={{ justifyContent: "space-around" }}>
                    <Text>{currentQuestion?.explanation}</Text>
                  </View>
                )}
              </View>
            </Pressable>
          )}
        </View>
        {/* Answers */}
        <View style={{ marginTop: 10 }}>
          <View>
            {currentQuestion?.options.map((item, index) => (
              <Pressable
                onPress={() => {
                  setExplanation(true);
                  selectedAnswerIndex === null && setSelectedAnswerIndex(index);
                }}
                style={
                  selectedAnswerIndex === index &&
                  index === currentQuestion.correctAnswerIndex
                    ? {
                        // correct answer
                        height: 72,
                        flexDirection: "row",
                        alignItems: "center",
                        //justifyContent: "space-around",
                        borderColor: COLORS.LIGHT_GREEN,
                        borderRadius: 15,
                        borderWidth: 3,
                        padding: 10,
                        marginVertical: 10
                      }
                    : selectedAnswerIndex != null &&
                      selectedAnswerIndex === index
                    ? {
                        // WRONG ANSWER
                        height: 72,
                        flexDirection: "row",
                        alignItems: "center",
                        //justifyContent: "space-around",
                        marginVertical: 10,
                        borderWidth: 3,
                        borderColor: COLORS.PINK,
                        borderRadius: 15,
                        padding: 10
                      }
                    : {
                        height: 72,
                        flexDirection: "row",
                        alignItems: "center",
                        //justifyContent: "center",
                        borderWidth: 1,
                        borderColor: COLORS.YELLOW,
                        marginVertical: 10,
                        borderRadius: 15,
                        paddingHorizontal: 10
                        //marginHorizontal: 10
                      }
                }
              >
                {selectedAnswerIndex === index &&
                index === currentQuestion.correctAnswerIndex ? (
                  <View
                    style={{
                      backgroundColor: COLORS.LIGHT_GREEN,
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      marginRight: 10,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.BLACK
                      }}
                    >
                      {currentQuestion?.options[index].option}
                    </Text>
                  </View>
                ) : selectedAnswerIndex != null &&
                  selectedAnswerIndex === index ? (
                  <View
                    style={{
                      backgroundColor: COLORS.PINK,
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      marginRight: 10,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text>{currentQuestion?.options[index].option}</Text>
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
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.BLACK
                      }}
                    >
                      {currentQuestion?.options[index].option}
                    </Text>
                  </View>
                )}
                <Text
                  // numberOfLines={1}
                  // ellipsizeMode="tail"
                  style={{
                    fontSize: 14,
                    fontWeight: "400"
                  }}
                >
                  {item.answer}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* CONTINUE */}

        {index + 1 >= data.length ? (
          <Pressable
            onPress={() => {
              navigation.navigate("Results", {
                points: points,
                answers: answers
              });
            }}
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
            <Text style={{ color: "white" }}>Done</Text>
          </Pressable>
        ) : answerStatus === null ? (
          <Pressable
            onPress={() => {
              setIndex(index + 1);
              setExplanation(false);
              //setCounter(20);
            }}
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
            <Text style={{ color: "white" }}>Continue</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              setIndex(index + 1);
              setExplanation(false);
              //setCounter(20);
            }}
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
            <Text style={{ color: "white" }}>Continue</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};
