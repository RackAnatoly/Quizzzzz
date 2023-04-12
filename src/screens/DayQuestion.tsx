import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import OptionsButton from "../components/OptionsButton";
import { COLORS } from "../components/colors";

const DayQuestion = () => {
  const [questions, setQuestions] = useState(null);
  const [option1, setoption1] = useState(null);
  const [option2, setoption2] = useState(null);
  const [option3, setoption3] = useState(null);
  const [option4, setoption4] = useState(null);

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
        setoption1(data[0].answer);
        setoption2(data[0].distractor1);
        setoption3(data[0].distractor2);
        setoption4(data[0].distractor3);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24 }}>{questions}</Text>
      <OptionsButton optionButtonType="day" title={option1} />
      <OptionsButton optionButtonType="day" title={option2} />
      <OptionsButton optionButtonType="day" title={option3} />
      <OptionsButton optionButtonType="day" title={option4} />
    </SafeAreaView>
  );
};

export default DayQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PINK,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  }
});
