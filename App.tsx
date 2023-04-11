import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import OptionsButton from "./src/components/OptionsButton";
import { COLORS } from "./src/components/colors";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <OptionsButton optionButtonType="day" title="Question of the Day" />
      <OptionsButton optionButtonType="day" title="Quick 10 Quiz" />
      <OptionsButton optionButtonType="day" title="Timed Quiz" />
      <OptionsButton optionButtonType="day" title="Missed Questions Quiz" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PINK,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  }
});
