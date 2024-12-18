import styles from './style.module.css'
import React, { useState } from 'react'
import FormInput from '../FormInput'
import FormButton from '../FormButton'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import { SIGNUP_URL } from '../../constants/RouteConstants'
import { AuthenticationRequest } from '../../models/AuthenticationRequest'

const LoginForm: React.FC = () => {

    const [userInfo, setUserInfo] = useState<AuthenticationRequest>({ name: "", password: "" });

    const auth = useAuth();

    let handleLogin = (e: any) => {
        e.preventDefault();
        auth!.loginAction(userInfo);
    }

    return (
        <div id={`${styles.loginDiv}`}>
            <ToastContainer />
            <span className={`${styles.title}`} >Login</span>
            <form>
                <FormInput
                    type={"text"}
                    placeholder={"Username"}
                    value={userInfo.name}
                    labelValue={"User name"}
                    onChange={(e: any) => setUserInfo({ ...userInfo, name: e.target.value })}
                />
                <FormInput
                    type={"password"}
                    placeholder={"Password"}
                    value={userInfo.password}
                    labelValue={"Password"}
                    onChange={(e: any) => setUserInfo({ ...userInfo, password: e.target.value })}
                />
                <FormButton
                    buttonText={"Login"}
                    onClick={(e: any) => handleLogin(e)}
                />
            </form>
            <div className={`${styles.signupLinkDiv}`} >
                <span>Don't have an account ? </span>
                <Link to={SIGNUP_URL} className={`${styles.signupLink}`}>Register</Link>
            </div>
        </div>
    )
}

export default LoginForm


