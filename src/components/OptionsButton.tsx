import React from "react";
import { Pressable, ViewStyle, StyleProp } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "./colors";

type OptionButtonType = {
  optionButtonType: "main";
  title?: string;
  customStyle?: StyleProp<ViewStyle>;
  isDisabled?: boolean;
  onPress?: () => void;
};

const OptionsButton = ({
  optionButtonType,
  title,
  customStyle,
  isDisabled,
  onPress
}: OptionButtonType) => {
  return (
    // <Pressable style={[styles.button, customStyle]}>
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        return [
          styles.button,
          //pressed && styles[`${optionButtonType}Pressed`],
          customStyle
        ];
      }}
    >
      {/* {buttonType === "biometric" ? (
        <Fingerprint
        />
      ) : (
        <Typography color={COLORS.WHITE}>{title}</Typography>
      )} */}
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default OptionsButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.WHITE,
    width: 320,
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    //borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    fontSize: 20,
    color: COLORS.BLACK,
    fontWeight: "500"
  }
});
