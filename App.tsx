import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudyScreen from "./src/screens/StudyScreen";
import DayQuestion from "./src/screens/DayQuestion";
import { InitialScreen } from "./src/screens/InitialScreen";
import {TimedQuiz} from "./src/screens/TimedQuiz";
import { Results } from "./src/screens/Results";
import { Settings } from "./src/screens/Settings";
import { Stats } from "./src/screens/Stats";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import ExamDate from "./src/screens/Settings/ExamDate";
import { TenQuestions } from "./src/screens/TenQuestions";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Initial" component={InitialScreen} />
          <Stack.Screen name="Study" component={StudyScreen} />
          <Stack.Screen name="DayQuestion" component={DayQuestion} />
          <Stack.Screen name="TenQuestions" component={TenQuestions} />
          <Stack.Screen name="TimedQuiz" component={TimedQuiz} />
          <Stack.Screen name="Results" component={Results} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Settings.ExamDate" component={ExamDate} />
          <Stack.Screen name="Stats" component={Stats} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
