import { createContext, useContext, useMemo, useState, Fragment } from "react";
import {
  CircularProgress,
  Snackbar,
  Alert,
  Backdrop,
  AlertTitle,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const FeedbackContext = createContext();

export const useFeedback = () => {
  return useContext(FeedbackContext);
};

export const FeedbackProvider = ({ children }) => {
  const [loading, toggleLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    severity: "",
    title: "",
    message: "",
  });

  const startLoading = () => {
    toggleLoading(true);
  };

  const stopLoading = () => {
    toggleLoading(false);
  };

  const displayAlert = (severity, title, message) => {
    // severity: ["error","info","success","warning"]
    setAlert({ show: true, severity, title, message });
  };

  const hideAlert = () => {
    setAlert({ show: false, severity: alert.severity, title: "", message: "" });
  };

  const value = useMemo(
    () => ({
      loading,
      startLoading,
      stopLoading,
      alert,
      displayAlert,
      hideAlert,
    }),
    [loading, alert]
  );

  return (
    <FeedbackContext.Provider value={value}>
      <Fragment>
        {loading && (
          <Backdrop
            open={loading}
            sx={{ color: "#000", zIndex: (theme) => theme.zIndex.modal + 1 }}
          >
            <CircularProgress />
          </Backdrop>
        )}
        <Snackbar
          open={alert.show}
          autoHideDuration={10 * 1000} // 10 sec
          onClose={(event, reason) => {
            if (reason === "clickaway") return;
            hideAlert();
          }}
        >
          <Alert
            severity={alert.severity || undefined}
            action={
              <IconButton
                size="small"
                color="inherit"
                onClick={() => hideAlert()}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            <AlertTitle>{alert.title}</AlertTitle>
            {alert.message}
          </Alert>
        </Snackbar>
        {children}
      </Fragment>
    </FeedbackContext.Provider>
  );
};
