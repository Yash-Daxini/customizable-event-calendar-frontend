import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
const env = import.meta.env;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");

    const navigate = useNavigate();

    const loginAction = async (data) => {
        try {
            const response = await fetch(env.VITE_Login_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if (res) {
                setUser(res);
                localStorage.setItem("user", JSON.stringify(res));
                navigate("/getEvents");
                return;
            }
            throw new Error(res.message);
        } catch (err) {
            console.warn(err);
        }
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
}