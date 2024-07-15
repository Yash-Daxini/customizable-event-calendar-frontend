import styles from './style.module.css'
import React, { useEffect, useState } from 'react'
import FormInput from '../FormInput'
import FormButton from '../FormButton'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthProvider'
const env = import.meta.env;

const LoginForm = () => {

    const [userInfo, setUserInfo] = useState({name:'',password:''});

    const auth = useAuth();

    let handleLogin = (e) => {
        e.preventDefault();
        auth.loginAction(userInfo);
    }

    return (
        <div id={`${styles.loginDiv}`}>
            <span className={`${styles.title}`} >Login</span>
            <form>
                <FormInput
                    type={"text"}
                    placeholder={"Username"}
                    value={userInfo.name}
                    labelValue={"User name"}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                />
                <FormInput
                    type={"password"}
                    placeholder={"Password"}
                    value={userInfo.password}
                    labelValue={"Password"}
                    onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                />
                <FormButton
                    buttonText={"Login"}
                    onClick={(e) => handleLogin(e)}
                />
            </form>
            <div className={`${styles.signupLinkDiv}`} >
                <span>Don't have an account ? </span>
                <Link to={"/SignUp"} className={`${styles.signupLink}`}>Register</Link>
            </div>
        </div>
    )
}

export default LoginForm


