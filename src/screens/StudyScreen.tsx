import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import OptionsButton from "../components/OptionsButton";
import { COLORS } from "../components/colors";

const StudyScreen = ({ navigation }) => {
  const dayQuestion = () => {
    navigation.navigate("DayQuestion");
  };

  return (
    <SafeAreaView style={styles.container}>
      <OptionsButton
        optionButtonType="day"
        title="Question of the Day"
        onPress={dayQuestion}
      />
      <OptionsButton optionButtonType="day" title="Quick 10 Quiz" />
      <OptionsButton optionButtonType="day" title="Timed Quiz" />
      <OptionsButton optionButtonType="day" title="Missed Questions Quiz" />
    </SafeAreaView>
  );
};

export default StudyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PINK,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  }
});
