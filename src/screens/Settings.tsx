import React from 'react';
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
import {useSelector} from "react-redux";
import {selectCategories, selectQuestions} from "../store/selectors";

export const Settings = ({ navigation }) => {
  const nav = useNavigation();

  const handleNavigation = (routeName) => {
    // @ts-ignore
    nav.navigate(routeName);
  };

  //TMP
  const questions = useSelector(selectQuestions);
  const categories = useSelector(selectCategories);
  console.log('q', questions);
  console.log('c', categories);

  return (
      <SafeAreaView style={styles.container}>
        <View style={{ paddingHorizontal: 10 }}>
          <Text>Settings Screen</Text>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => handleNavigation('settings.exam-date')}>
            <Text style={styles.menuItem}>Exam Date</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Setting2')}>
            <Text style={styles.menuItem}>Setting 2</Text>
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
