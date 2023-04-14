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

const DayQuestion = () => {
  const [questions, setQuestions] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("http://vmwarewalkthroughs.com/api/questions", {
      method: "POST",
      body: JSON.stringify({
        app_id: 1,
        qty: 1,
        category_id: null
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data[0].question);
        setAnswer(data[0].answer);
        const randomOptions = [];
        randomOptions.push(
          data[0].answer,
          data[0].distractor1,
          data[0].distractor2,
          data[0].distractor3
        );
        setOptions(randomOptions);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    // <SafeAreaView style={styles.container}>
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.WHITE,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20
      }}
    >
      <View style={styles.question}>
        <Text style={{ fontSize: 24, textAlign: "center" }}>{questions}</Text>
      </View>
      {options
        .sort(() => Math.random() - 0.5)
        .map((i, key) => (
          <Pressable
            style={({ pressed }) => {
              return [
                {
                  width: "100%",
                  height: 72,
                  borderColor: COLORS.YELLOW,
                  borderWidth: 1,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "space-around",
                  paddingHorizontal: 5,
                  marginVertical: 10
                },
                pressed && {
                  backgroundColor:
                    i === answer ? COLORS.LIGHT_GREEN : COLORS.PINK
                }
              ];
            }}
          >
            <Text style={{ fontSize: 16 }}> {i}</Text>
          </Pressable>
        ))}
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
          {" "}
          Continue
        </Text>
      </Pressable>
    </View>
    // </SafeAreaView>
  );
};

export default DayQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
    // alignItems: "center",
    // justifyContent: "space-around",
    // paddingHorizontal: 20
  },
  question: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.YELLOW,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  }
});
