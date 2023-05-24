import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthSuperAdmin = ({ children }) => {
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("userData"));
  if (auth) {
    if (auth.email === "superadmin@gmail.com") {
      return children;
    } else {
      return <Navigate to="NoResult" state={{ path: location.pathname }} />;
    }
  }
  return <Navigate to="/login" state={{ path: location.pathname }} />;
};

export default AuthSuperAdmin