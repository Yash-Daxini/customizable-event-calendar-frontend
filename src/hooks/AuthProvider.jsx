import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToaster, showErrorToaster } from "../util/toaster";
import { fetchApi } from "../util/fetchApi";
const env = import.meta.env;

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const navigate = useNavigate();

  const loginAction = async (data) => {
    await fetchApi(`${env.VITE_Login_API}`, null, "POST", data)
      .then((res) => {
        if (res.status === 400) {
          showErrorToaster("Invalid user name or password !");
        } else {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          showSuccessToaster("Login successful !");
          navigate("/");
        }
      })
      .catch(() => showErrorToaster(`Some error occurred !`));
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
