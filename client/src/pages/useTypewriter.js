import { useState, useEffect } from "react";

export const useTypewriter = (text, speed = 150) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!text) return;

    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayText((prev) => {
        const nextChar = text[index];
        index++;
        return prev + nextChar;
      });

      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return displayText;
};
