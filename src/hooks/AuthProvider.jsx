import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const env = import.meta.env;

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const navigate = useNavigate();

    const loginAction = async (data) => {
        await fetch(env.VITE_Login_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => {
                if (res.status === 400) {
                    toast.error('Invalid user name or password !', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light"
                    });
                    throw Error("Invalid user name or password");
                }
                else
                    return res.json()
            })
            .then(data => {
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/getEvents");
            })
            .catch(err => console.warn(`Some error occurred ${err} `))
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