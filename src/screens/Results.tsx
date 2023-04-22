import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import OptionsButton from "../components/OptionsButton";
import { COLORS } from "../components/colors";
import { useRoute } from "@react-navigation/native";

export const Results = () => {
  const route = useRoute();

  return (
    <SafeAreaView>
      <Text>Boom!</Text>
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
