import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Auth = ({ children }) => {
  const userData = useSelector((state) => state.auth.userData);

  if (userData === null) {
    return <Navigate to="/" />;
  }

  return children;
};
