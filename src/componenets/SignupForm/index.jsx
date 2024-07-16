import React, { useState } from 'react'
import styles from './style.module.css'
import FormInput from '../FormInput'
import FormButton from '../FormButton'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

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
            .then((res) => {
                if (res.status === 400) {
                    toast.error('Invalid input !', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                else if (res.status === 201) {
                    toast.success('Successfully signed up !', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }
            })
            .catch(err => {
                toast.error(`${err}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }

    return (
        <div id={`${styles.signupDiv}`}>
            <ToastContainer />
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