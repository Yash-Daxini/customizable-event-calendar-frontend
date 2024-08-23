import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToaster, showErrorToaster } from "../util/toaster";
const env = import.meta.env;

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const navigate = useNavigate();

  const loginAction = async (data) => {
    console.warn(env.VITE_Login_API);
    await fetch(`http://localhost:5000${env.VITE_Login_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 400) {
          showErrorToaster("Invalid user name or password !");
        } else return res.json();
      })
      .then((data) => {
        if (!data) return;
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        showSuccessToaster("Login successful !");
        navigate("/");
      })
      .catch((err) => showErrorToaster(`Some error occurred ${err} `));
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
