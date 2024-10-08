import React from "react";
import { useSelector } from "react-redux";

function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-cyan-50 text-gray-900 dark:text-cyan-500 dark:bg-gray-900 min-h-screen  ">
        {children}
      </div>
    </div>
  );
}

export default ThemeProvider;
