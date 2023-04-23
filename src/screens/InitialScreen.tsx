import React, {useEffect} from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import OptionsButton from "../components/OptionsButton";
import { COLORS } from "../components/colors";
import {initializeAppTC} from "../store/initial-reducer";
import {useDispatch} from "react-redux";

export const InitialScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(initializeAppTC());
  }, []);

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
