import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { FeedbackProvider } from "./providers/FeedbackProvider.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { ColorModeProvider } from "./providers/ColorModeProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeProvider>
      <FeedbackProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FeedbackProvider>
    </ColorModeProvider>
  </React.StrictMode>
);
