import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import OptionsButton from "../components/OptionsButton";
import { COLORS } from "../components/colors";

const StudyScreen = ({ navigation }) => {
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
