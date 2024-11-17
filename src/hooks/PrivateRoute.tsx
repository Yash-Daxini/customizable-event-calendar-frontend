import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContextType, useAuth } from "./AuthProvider";
import { User } from "../models/User";

const PrivateRoute: React.FC = () => {
  const auth: AuthContextType | null = useAuth();
  const user: User | undefined = auth?.user;

  if (!user) return <Navigate to="/login" />;

  if (isTokenExpired(user.token)) {
    auth?.logOut();
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

let isTokenExpired = (token: string): boolean => {
  // Decode the token
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  const { exp } = JSON.parse(jsonPayload);

  // Check if the token is expired

  const currentTime = Math.floor(Date.now() / 1000);
  return exp < currentTime;
};

export default PrivateRoute;
