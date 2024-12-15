import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuth } from "../features/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useSelector(selectAuth);

  if (auth.token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
