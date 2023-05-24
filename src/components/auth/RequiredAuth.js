import React from "react";
import { Navigate } from "react-router-dom";

const RequiredAuth = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("userData"));
  if (auth) {
    if (auth.role === "admin") {
      return <Navigate to="/1KQ4vU4E9Fadmin" />;
    } else if (auth.role === "user") {
      return <Navigate to="/user" />;
    } else if (auth.role === "society") {
      return <Navigate to="society" />;
    }
  }
  return children;
};

export default RequiredAuth;
