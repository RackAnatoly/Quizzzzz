import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';

type CustomAlertProps = {
  visible: any;
  title: any;
  message: any;
  confirmText: any;
  onConfirm: any;
  declineText?: any
  onDecline?: any;
};

const CustomAlert: React.FC<CustomAlertProps> = ({
                                                   visible,
                                                   title,
                                                   message,
                                                   confirmText,
                                                   declineText,
                                                   onConfirm,
                                                   onDecline,
                                                 }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
            {declineText && (
              <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={onDecline}>
                <Text style={styles.buttonText}>{declineText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  declineButton: {
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomAlert;