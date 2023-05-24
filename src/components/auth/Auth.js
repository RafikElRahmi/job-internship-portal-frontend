import axios from "axios";
import React, { useContext } from "react";
import { BaseURL } from "./BaseURL";
import { useNavigate } from "react-router-dom";

const AuthUser = React.createContext(null);
export const Auth = ({ children }) => {
  const navigate = useNavigate();
  const login = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("keylogin", true);
  };
  const keylogin = JSON.parse(localStorage.getItem("keylogin"));
  if (keylogin) {
    window.onbeforeunload = function () {
      localStorage.getItem("userData");
      localStorage.getItem("keylogin");
    };
  }
  const logout = () => {
    localStorage.clear();
  };
  const refresh = async () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const email = { email: data.email };
    const response = await axios.post(`${BaseURL}refresh`, email);
    localStorage.setItem("userData", JSON.stringify(response.data));
    if (data.role === "admin") {
      navigate("/1KQ4vU4E9Fadmin/profile");
    } else if (data.role === "user") {
      navigate("/user/profile");
    } else if (data.role === "society") {
      navigate("/society/profile");
    }
  };
  return (
    <AuthUser.Provider value={{ login, logout, refresh }}>
      {children}
    </AuthUser.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthUser);
};
