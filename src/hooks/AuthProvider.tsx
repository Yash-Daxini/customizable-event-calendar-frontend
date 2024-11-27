import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToaster, showErrorToaster } from "../util/toaster";
import { fetchApi } from "../util/fetchApi";
import { AuthenticationResponse } from "../models/AuthenticationResponse";
import { LOCALSTORAGE_TOKEN_KEY } from "../constants/authConstants";
import { LOGIN_URL } from "../constants/RouteConstants";
const env = import.meta.env;

export interface AuthContextType {
  user: AuthenticationResponse,
  loginAction: (data: any) => Promise<void>,
  logOut: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode; // This ensures the `children` prop is properly typed
}

// eslint-disable-next-line react/prop-types
const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {

  const storedUser: string | null = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  if (!storedUser)
    return;

  const [user, setUser] = useState(JSON.parse(storedUser));

  const navigate = useNavigate();

  const loginAction = async (data: any): Promise<void> => {
    await fetchApi(`${env.VITE_Login_API}`, null, "POST", data)
      .then((res) => {
        if (res.statusCode === 400) {
          showErrorToaster("Invalid user name or password !");
        } else {
          setUser(res.data);
          localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, JSON.stringify(res.data));
          showSuccessToaster("Login successful !");
          navigate("/");
        }
      })
      .catch(() => showErrorToaster(`Some error occurred !`));
  };

  const logOut = (): void => {
    setUser(null);
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
    navigate(LOGIN_URL);
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
