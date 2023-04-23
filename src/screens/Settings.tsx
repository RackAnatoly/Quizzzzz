import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../components/colors';
import FloatingMenu from '../components/FloatingMenu';
import CustomAlert from "../components/CustomAlert";
import {
  resetOverallQuizAnswersAC,
  resetOverallQuizAnswersTC,
  updateOverallQuizAnswersTC
} from "../store/quizAnswers-reducer";
import {useDispatch} from "react-redux";

export const Settings = ({ navigation }) => {
  const nav = useNavigation();
  const [showResetProgressAlert, setShowResetProgressAlert] = useState(false);
  const dispatch = useDispatch();

  const handleNavigation = (routeName) => {
    // @ts-ignore
    nav.navigate(routeName);
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={{ paddingHorizontal: 10 }}>
          <Text>Settings Screen</Text>
        </View>
        <CustomAlert
          visible={showResetProgressAlert}
          title="Reset Progress"
          message="Are you sure you want to reset your progress?"
          confirmText="Yes"
          declineText="No"
          onConfirm={() => {
            // @ts-ignore
            dispatch(resetOverallQuizAnswersTC());
            setShowResetProgressAlert(false);
          }}
          onDecline={ () => {
            setShowResetProgressAlert(false);
          }}
        />
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => handleNavigation('Settings.ExamDate')}>
            <Text style={styles.menuItem}>Exam Date</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setShowResetProgressAlert(true);
          }}>
            <Text style={styles.menuItem}>Reset Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Setting3')}>
            <Text style={styles.menuItem}>Setting 3</Text>
          </TouchableOpacity>
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
  menuContainer: {
    width: '100%',
  },
  menuItem: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
