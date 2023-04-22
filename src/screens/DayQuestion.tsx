import React, {useEffect, useState} from "react";

import {
  Pressable, ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import {COLORS} from "../components/colors";
import {useSelector, useDispatch} from 'react-redux';
import {selectQuestions} from "../store/selectors";
import {Question, QuestionModel} from "../models/Question";
import _ from 'lodash';
import {QuestionComponent} from "../components/QuestionComponent";
import {styles} from "./styles";

const DayQuestion = ({navigation, route}) => {
  const questions = useSelector(selectQuestions);
  const [randomQuestion, setRandomQuestion] = useState<QuestionModel>(null);
  const [isExplanationShown, setIsExplanationShown] = useState(false);
  const [explanation, setExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const randomQuestion = new QuestionModel(_.sample(questions));
    setRandomQuestion(randomQuestion);
  }, [questions]);

    return (
      <View style={styles.container}>
        <View style={styles.menuBarContainer}>
          <Pressable onPress={() => navigation.popToTop()}>
            <Text>Quit</Text>
          </Pressable>
          <Text>Mark</Text>
        </View>

        <ScrollView>
          <QuestionComponent
            currentQuestion={randomQuestion}
            isExplanationShown={isExplanationShown}
            setIsExplanationShown={setIsExplanationShown}
            explanation={explanation}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />

          {/* DONE */}

          <Pressable
            onPress={() => {
              navigation.navigate("Study", {
              });
            }}
            style={styles.doneButton}
          >
            <Text style={{color: "white"}}>Done</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
};

export default DayQuestion;

/*
const styles = StyleSheet.create({
    container: {
    },
    question: {
        width: "100%",
        minHeight: 200,
        backgroundColor: COLORS.YELLOW,
        borderRadius: 15,
        //alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 10
    }
});
*/
