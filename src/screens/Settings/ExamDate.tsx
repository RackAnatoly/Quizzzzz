import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Alert,
    Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../components/colors';
import FloatingMenu from '../../components/FloatingMenu';
import { InitialStateType, setExamDate } from '../../store/initial-reducer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "../../store/store";
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
                console.log('restored date from storage ', value)
                if (value !== null) {
                    setStoredDate(value);
                }
            } catch (error) {
                Alert.alert('Error', 'Error loading stored exam date');
            }
        };

        loadStoredDate();
    }, []);

    const showDatePicker = () => {
        setShow(true);
    };

    const hideDatePicker = () => {
        setShow(false);
    };

    const handleConfirm = (date: Date) => {
        hideDatePicker();
        const newDate = date.toISOString();
        dispatch(setExamDate(newDate));
        setStoredDate(newDate);
        console.log('set to ', newDate);
    };
    const formattedDate = new Date(storedDate || new Date()).toLocaleDateString();

    useEffect(() => {
        // This effect will re-run whenever examDate changes
        console.log('examDate changed', examDate);
        setStoredDate(examDate);
    }, [examDate]);

    console.log('examDate', examDate);
    console.log('formattedDate', formattedDate);
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 10 }}>
                <Text>Exam Date: {formattedDate}</Text>
            </View>
            <View>
                <Button onPress={showDatePicker} title="Select exam date" />
                <DateTimePickerModal
                    isVisible={show}
                    mode="date"
                    date={new Date(storedDate || examDate)}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    minimumDate={new Date()}
                />
            </View>
            <FloatingMenu />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 50,
    },
});

export default ExamDate;
