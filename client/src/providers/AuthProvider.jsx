import {
  useState,
  useContext,
  createContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { useFeedback } from "./FeedbackProvider";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { startLoading, stopLoading, displayAlert, hideAlert } = useFeedback();

  const [user, setUser] = useState();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get("/auth/check", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {}
    };
    checkUser();
  }, []);

  const register = async (username, password) => {
    try {
      startLoading();
      const response = await axios.post(
        "/auth/register",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      setUser(response.data.user);
      stopLoading();
      displayAlert("success", "Successfully registered.", "");
      return response;
    } catch (error) {
      stopLoading();
      displayAlert("error", "Failed to register", error.response.data.message);
      return error.response;
    }
  };

  const login = async (username, password) => {
    try {
      startLoading();
      const response = await axios.post(
        "/auth/login",
        { username, password },
        { withCredentials: true }
      );

      setUser(response.data.user);
      stopLoading();
      displayAlert("success", "Successfully logged in.", "");
      return response;
    } catch (error) {
      stopLoading();
      displayAlert(
        "error",
        "Failed to log in.",
        "Your username or password is incorrect. Please try again."
      );
      return error.response;
    }
  };

  const logout = useCallback(async () => {
    try {
      startLoading();
      const response = await axios.get("/auth/logout", {
        withCredentials: true,
      });
      displayAlert("success", "Successfully logged out.", "");
      // Hard reload on logout
      // TODO: Find a way to change `walrs` state
      setTimeout(() => {
        window.location.reload();
        stopLoading();
      }, 2000);
    } catch (error) {
      stopLoading();
      displayAlert("error", "Failed to log out.", "");
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      register,
      login,
      logout,
    }),
    [user, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
