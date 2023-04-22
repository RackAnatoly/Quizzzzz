import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface CountdownClockProps {
  minutes: number;
  onTimeUp: () => void;
}

const CountdownClock: React.FC<CountdownClockProps> = ({ minutes, onTimeUp }) => {
  const [timeRemaining, setTimeRemaining] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          console.log('onTimeUp');
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <View>
      <Text>{formatTime(timeRemaining)}</Text>
    </View>
  );
};

export default CountdownClock;
