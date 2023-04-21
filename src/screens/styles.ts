import { StyleSheet } from "react-native";
import { COLORS } from "../components/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
  },
  menuBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  progressBarContainer: {
    backgroundColor: COLORS.YELLOW,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 10,
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 20
  },
  progressStatus: {
    backgroundColor: COLORS.BLACK,
    borderRadius: 12,
    position: "absolute",
    left: 0,
    height: 10,
    right: 0,
    marginTop: 20
  },
  questionContainer: {
    width: "100%",
    minHeight: 100,
    backgroundColor: COLORS.YELLOW,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10
  },
  question: {
    fontSize: 24,
    textAlign: "center"
  },
  answer: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 15
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floating: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10, // Ensure the floating component is above the other content
  },
});
