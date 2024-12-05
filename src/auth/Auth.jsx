import { Navigate } from "react-router-dom";
import getLoginData from "../commonfunctions/getLoginData";
import { AccessLevel } from "../commonfunctions/Enums";

export const SuperAdminAuth = ({ children }) => {
  const loggedInUserData = getLoginData();

  if (!loggedInUserData || loggedInUserData.Role != AccessLevel.SuperAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export const ChapterManagerAuth = ({ children }) => {
  const loggedInUserData = getLoginData();

  if (
    !loggedInUserData ||
    loggedInUserData.Role != AccessLevel.ChapterManager
  ) {
    return <Navigate to="/" />;
  }

  return children;
};
