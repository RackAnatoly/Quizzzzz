import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { COLORS } from "../components/colors";
import FloatingMenu from "../components/FloatingMenu";

export const Stats = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text>Stats Screen</Text>
      </View>
      <FloatingMenu/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 50
  }
});

export default Stats;