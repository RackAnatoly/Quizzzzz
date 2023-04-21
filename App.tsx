import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import OptionsButton from "./src/components/OptionsButton";
import { COLORS } from "./src/components/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudyScreen from "./src/screens/StudyScreen";
import DayQuestion from "./src/screens/DayQuestion";
import { InitialScreen } from "./src/screens/InitialScreen";
import { Ten_questions } from "./src/screens/Ten_questions";
import { Results } from "./src/screens/Results";
import { Settings } from "./src/screens/Settings";
import { Stats } from "./src/screens/Stats";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import ExamDate from "./src/screens/Settings/ExamDate";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Initial" component={InitialScreen} />
          <Stack.Screen name="Study" component={StudyScreen} />
          <Stack.Screen name="DayQuestion" component={DayQuestion} />
          <Stack.Screen name="10_questions" component={Ten_questions} />
          <Stack.Screen name="Results" component={Results} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="settings.exam-date" component={ExamDate} />
          <Stack.Screen name="Stats" component={Stats} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
