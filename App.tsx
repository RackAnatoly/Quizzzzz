import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import OptionsButton from "./src/components/OptionsButton";
import { COLORS } from "./src/components/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudyScreen from "./src/screens/StudyScreen";
import DayQuestion from "./src/screens/DayQuestion";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Study" component={StudyScreen} />
        <Stack.Screen name="DayQuestion" component={DayQuestion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
