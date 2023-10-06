import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useContext, useState, useMemo } from "react";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => {
  return useContext(ColorModeContext);
};

export const ColorModeProvider = ({ children }) => {
  const [mode, toggleMode] = useState(localStorage.getItem("color-mode"));

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        if (localStorage.getItem("color-mode") === "light") {
          localStorage.setItem("color-mode", "dark");
        } else {
          localStorage.setItem("color-mode", "light");
        }
        toggleMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? // Light Mode
              {
                primary: {
                  main: "#1e88e5",
                },
                secondary: {
                  main: "#f4511e",
                },
                warning: {
                  main: "#ffab40",
                },
              }
            : // Dark Mode
              {
                primary: {
                  main: "#1e88e5",
                },
                secondary: {
                  main: "#f4511e",
                },
                warning: {
                  main: "#ffab40",
                },
              }),
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: "9999px",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
