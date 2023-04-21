import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Alert,
    Platform,
    Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../components/colors';
import FloatingMenu from '../../components/FloatingMenu';
import {InitialStateType, setExamDate} from '../../store/initial-reducer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AppDispatch} from "../../store/store";

const ExamDate = () => {
    const navigation = useNavigation();
    const examDate = useSelector((state: InitialStateType) => state.examDate);
    const dispatch = useDispatch<AppDispatch>();
    const [storedDate, setStoredDate] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const loadStoredDate = async () => {
            try {
                const value = await AsyncStorage.getItem('examDate');
                if (value !== null) {
                    setStoredDate(value);
                }
            } catch (error) {
                Alert.alert('Error', 'Error loading stored exam date');
            }
        };

        loadStoredDate();
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || storedDate || examDate;
        setShow(Platform.OS === 'ios');
        handleDateChange(currentDate);
    };

    const showDatePicker = () => {
        setShow(true);
    };

    const handleDateChange = (date) => {
        dispatch(setExamDate(date));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 10 }}>
                <Text>Exam Date Screen</Text>
            </View>
            <View>
                <Button onPress={showDatePicker} title="Select exam date" />
                {show && (
                    <DateTimePicker
                        value={new Date(storedDate || examDate)}
                        mode="date"
                        display="default"
                        minimumDate={new Date()}
                        onChange={onChange}
                    />
                )}
            </View>
            <FloatingMenu />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 50,
    },
});

export default ExamDate;
