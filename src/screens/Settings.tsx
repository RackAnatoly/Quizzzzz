import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "../components/colors";
import FloatingMenu from "../components/FloatingMenu";

export const Settings = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text>Settings Screen</Text>
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

export default Settings;