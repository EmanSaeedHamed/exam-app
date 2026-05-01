"use client";

import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  duration: number;
  onTimeEnd?: () => void;
};

export default function CircularProgressBar({ duration, onTimeEnd }: Props) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const isWarning = timeLeft < duration * 0.2;
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          onTimeEnd?.();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const progress = (timeLeft / duration) * 100;

  return (
    <CircularProgressbar 
    styles={{
  path: { stroke: isWarning ? "red" : "#3b82f6" },
  text: { fill: isWarning ? "red" : "#111" },
 }}
      value={progress}
      text={formattedTime}
    />
  );
}
