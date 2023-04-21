import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles as globalStyles } from '../screens/styles';

const FloatingMenu = () => {
    const navigation = useNavigation();

    const handleNavigation = (routeName) => {
        // @ts-ignore
        navigation.navigate(routeName);
    };

    return (
        <View style={globalStyles.floating}>
            <View style={styles.columnContainer}>
                <TouchableOpacity onPress={() => handleNavigation('Study')}>
                    <Text style={styles.columnText}>Study</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleNavigation('Stats')}>
                    <Text style={styles.columnText}>Stats</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleNavigation('Settings')}>
                    <Text style={styles.columnText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    columnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    columnText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default FloatingMenu;