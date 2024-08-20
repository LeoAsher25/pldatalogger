import { PaletteOptions, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "src/redux/rootReducer";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import palette from "./theme/palette";
// import { ThemeProvider } from "@mui/styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  palette: palette.light as PaletteOptions,
  components: {
    MuiChip: {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          if (ownerState.variant !== "filled") return;
          let backgroundColor;
          let textColor;

          if (ownerState.color !== "default") {
            if (ownerState.color && theme.palette[ownerState.color]) {
              // If it's a system color like 'primary', 'warning', etc.
              backgroundColor = theme.palette[ownerState.color].dark + "44"; // 0.2 opacity
              textColor = theme.palette[ownerState.color].dark;
            } else {
              // If it's a custom color (e.g., a hex code)
              backgroundColor = ownerState.color
                ? `${ownerState.color}44`
                : "initial";
              textColor = ownerState.color || "inherit";
            }
          }

          return {
            backgroundColor,
            color: textColor,
            padding: "0px 6px",
            fontWeight: "600",
          };
        },
      },
    },
  },
  // {
  //   primary: {
  //     main: "#00AB55",
  //   },
  // }
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
