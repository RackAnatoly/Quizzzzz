import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable
} from "react-native";
import OptionsButton from "../components/OptionsButton";
import { COLORS } from "../components/colors";

export const InitialScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("./../assets/initial_logo.png")} />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 32, textAlign: "center", fontWeight: "600" }}>
          Welcome to the Exam Prep app
        </Text>
        <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "400" }}>
          Using this app you will get prepared for your certification ... exam
          and pass it
        </Text>
      </View>
      <OptionsButton
        title="Get Started"
        optionButtonType="main"
        onPress={() => navigation.navigate("Study")}
      />
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
