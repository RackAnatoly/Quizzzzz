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
import { InitialStateType, setExamDateTC } from '../../store/initial-reducer';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {RootState} from "../../store/store";

const ExamDate = () => {
    const examDate = useSelector((state: RootState) => state.app.examDate);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const showDatePicker = () => {
        setShow(true);
    };

    const hideDatePicker = () => {
        setShow(false);
    };

    const handleConfirm = (date: Date) => {
        hideDatePicker();
        const newDate = date.toISOString();
        // @ts-ignore
        dispatch(setExamDateTC(newDate));
    };

    const formattedDate = new Date(examDate).toLocaleDateString();

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
                date={new Date(examDate)}
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
