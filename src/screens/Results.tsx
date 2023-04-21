import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import OptionsButton from "../components/OptionsButton";
import { COLORS } from "../components/colors";
import { useRoute } from "@react-navigation/native";

export const Results = () => {
  const route = useRoute();
  console.log(route.params.answers);
  //найти значения объектов === true
  //поделить общее число true на все вопросы

  return (
    <SafeAreaView>
      <Text>{route.params.answers.length}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  }
});
