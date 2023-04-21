import React, {useEffect, useState} from "react";
import { useNavigation } from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import {COLORS} from "../components/colors";
import {useSelector, useDispatch} from 'react-redux';
import {AppRootStateType} from "../store/store";

const DayQuestion = () => {

    const allQuestions = useSelector((state: AppRootStateType) => state.app.allQuestions);
    console.log(allQuestions);
    const [questions, setQuestions] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [explanation, setExplanation] = useState(null);
    const [isExplanationShown, setIsExplanationShown] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [optionSelected, setOptionSelected] = useState(false);
    const navigation = useNavigation();
    const getRandomQuestion = () => {
        if (allQuestions.length === 0) {
            return null;
        }

        console.log(allQuestions.length);
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        return allQuestions[randomIndex];
    };

    useFocusEffect(
        React.useCallback(() => {
            console.log('navigated');
            const randomQuestion = getRandomQuestion();

            if (randomQuestion) {
                setQuestions(randomQuestion.question);
                setAnswer(randomQuestion.answer);
                setExplanation(randomQuestion.explanation);
                const fetchedOptions = randomQuestion.options.map(option => option.answer);
                const shuffled = [...fetchedOptions].sort(() => Math.random() - 0.5);
                setShuffledOptions(shuffled);
            }

            // Reset states when the component comes into focus
            setIsExplanationShown(false);
            setSelectedOption(null);
            setOptionSelected(false);

            // Clean up when leaving the screen
            return () => {
                setQuestions(null);
                setAnswer(null);
                setExplanation(null);
                setShuffledOptions([]);
            };
        }, [])
    );

    const getOptionBackgroundColor = (option, selectedOption, answer) => {
        console.log(option, selectedOption, answer);

        if (selectedOption === null) {
            return null;
        }
        if (option === answer) {
            return COLORS.LIGHT_GREEN;
        }
        if (option === selectedOption) {
            return COLORS.PINK;
        }
        return null;
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.WHITE,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20
            }}
        >
            <View style={styles.question}>
                <Text style={{fontSize: 24, textAlign: "center"}}>'{questions}'</Text>
                {isExplanationShown && <Text>{explanation}</Text>}
                <Pressable onPress={() => setIsExplanationShown(!isExplanationShown)}>
                    <Text style={{fontSize: 12, padding: 20}}>
                        {isExplanationShown ? "Hide Explanation" : "Show explanation"}
                    </Text>
                </Pressable>
            </View>
            {shuffledOptions.map((i, key) => (
                <Pressable
                    key={key} // Add the key prop here
                    onPress={() => {
                        if (!optionSelected) {
                            setSelectedOption(i);
                            setOptionSelected(true);
                        }
                    }}
                    style={{
                        width: "100%",
                        height: 72,
                        borderWidth: 1,
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "space-around",
                        paddingHorizontal: 5,
                        marginVertical: 10,
                        backgroundColor: getOptionBackgroundColor(i, selectedOption, answer),
                    }}
                >
                    <Text style={{fontSize: 16}}> {i}</Text>
                </Pressable>
            ))}
            <Pressable
                // @ts-ignore
                onPress={() => navigation.navigate('Study')}
                style={{
                    width: "100%",
                    height: 72,
                    backgroundColor: COLORS.BLACK,
                    borderWidth: 1,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "space-around"
                }}
            >
                <Text style={{fontSize: 16, color: COLORS.WHITE, fontWeight: "bold"}}>
                    {" "}
                    Continue
                </Text>
            </Pressable>
        </View>
        // </SafeAreaView>
    );
};

export default DayQuestion;

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
