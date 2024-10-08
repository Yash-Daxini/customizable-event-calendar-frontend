import { useState } from "react";
import styles from "./style.module.css";
import FormInput from "../FormInput";
import FormButton from "../FormButton";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showErrorToaster, showSuccessToaster } from "../../util/toaster";
import { fetchApi } from "../../util/fetchApi";

const env = import.meta.env;

const SignupForm = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  let handleSignUp = (e) => {
    e.preventDefault();
    fetchApi(env.VITE_Signup_API, null, "POST", userInfo)
      .then((res) => {
        if (res.status === 400) {
          showErrorToaster("Invalid input !");
        } else if (res.status === 200) {
          showSuccessToaster("Successfully signed up !");
        }
      })
      .catch(() => {
        showErrorToaster(`Some error occurred !`);
      });
  };

  return (
    <div id={`${styles.signupDiv}`}>
      <ToastContainer />
      <span className={`${styles.title}`}>Signup</span>
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
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <FormButton buttonText={"Signup"} onClick={(e) => handleSignUp(e)} />
      </form>
      <div className={`${styles.loginLinkDiv}`}>
        <span>Have an account ? </span>
        <Link to={"/Login"} className={`${styles.loginLink}`}>
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
