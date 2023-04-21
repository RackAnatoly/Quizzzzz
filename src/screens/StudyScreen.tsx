import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
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
      <ScrollView style={{ padding: 20 }}>
        <View style={styles.subscribeContainer}>
          <Text style={{ fontSize: 24 }}>Subscribe for all features</Text>
        </View>
        <Text style={{ fontSize: 14 }}>Quizzes modes</Text>
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
        <OptionsButton optionButtonType="main" title="Quiz by Subject" />
        <OptionsButton optionButtonType="main" title="Mock Exam" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.WHITE
  },
  subscribeContainer: {
    minHeight: 200,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: COLORS.YELLOW,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  }
});
