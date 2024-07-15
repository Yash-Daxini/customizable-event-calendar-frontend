import React, { useState } from 'react'
import styles from './style.module.css'
import FormInput from '../FormInput'
import FormButton from '../FormButton'
import { Link } from 'react-router-dom'
const env = import.meta.env;

const SignupForm = () => {

    const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '' });

    let handleSignUp = (e) => {
        e.preventDefault();
        fetch(env.VITE_Signup_API, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => console.warn(res))
            .catch(err => console.warn(err))
    }

    return (
        <div id={`${styles.signupDiv}`}>
            <span className={`${styles.title}`} >Signup</span>
            <form>
                <FormInput
                    type={"text"}
                    placeholder={"Username"}
                    value={userInfo.userName}
                    labelValue={"User name"}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                />
                <FormInput
                    type={"email"}
                    placeholder={"Email"}
                    value={userInfo.email}
                    labelValue={"Email"}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                />
                <FormInput
                    type={"password"}
                    placeholder={"Password"}
                    value={userInfo.password}
                    labelValue={"Password"}
                    onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                />
                <FormButton
                    buttonText={"Signup"}
                    onClick={(e) => handleSignUp(e)}
                />
            </form>
            <div className={`${styles.loginLinkDiv}`} >
                <span>Have an account ? </span>
                <Link to={"/Login"} className={`${styles.loginLink}`}>Log in</Link>
            </div>
        </div>
    )
}

export default SignupForm