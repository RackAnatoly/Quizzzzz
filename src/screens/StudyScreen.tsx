import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import OptionsButton from "../components/OptionsButton";
import { COLORS } from "../components/colors";
import { useDispatch, useSelector } from "react-redux";
import { initializeAppTC } from "../store/initial-reducer";

const StudyScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  //const aaa = useSelector((state) => state.app.allQuestions);
  //const bbb = aaa.sort(() => Math.random() - 0.5);
  //console.log(aaa, "here");

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <OptionsButton
        optionButtonType="main"
        title="Question of the Day"
        onPress={() => navigation.navigate("DayQuestion")}
      />
      <OptionsButton
        optionButtonType="main"
        title="Quick 10 Quiz"
        onPress={() => navigation.navigate("10_questions")}
      />
      <OptionsButton optionButtonType="main" title="Timed Quiz" />
      <OptionsButton optionButtonType="main" title="Missed Questions Quiz" />
    </SafeAreaView>
  );
};

export default StudyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  }
});
