import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToaster, showErrorToaster } from "../util/toaster";
import { AuthenticationResponse } from "../models/AuthenticationResponse";
import { LOCALSTORAGE_TOKEN_KEY } from "../constants/authConstants";
import { HOME_URL, LOGIN_URL } from "../constants/RouteConstants";
import { APIService } from "../services/APIService";
import { UserRequest } from "../models/UserRequest";
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

  const loginAction = async (data: UserRequest): Promise<void> => {
    const response = await APIService.get<UserRequest>(env.VITE_Login_API, data);
    if (response.statusCode === 400) {
      showErrorToaster("Invalid user name or password !");
    } else {
      setUser(response.data);
      localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, JSON.stringify(response.data));
      showSuccessToaster("Login successful !");
      navigate(HOME_URL);
    }
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
