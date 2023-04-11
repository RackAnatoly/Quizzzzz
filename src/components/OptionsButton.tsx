import React from "react";
import { Pressable, ViewStyle, StyleProp } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "./colors";

type OptionButtonType = {
  optionButtonType: "day" | "quick" | "timed" | "missed";
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
      style={({ pressed }) => {
        return [
          styles.button,
          pressed && styles[`${optionButtonType}Pressed`],
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
      <Text style={{ fontSize: 16 }}>{title}</Text>
    </Pressable>
  );
};

export default OptionsButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.GREY,
    width: 320,
    height: 79,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  dayPressed: {
    backgroundColor: "red"
  }
});
