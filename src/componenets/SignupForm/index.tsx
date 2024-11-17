import { useState } from "react";
import styles from "./style.module.css";
import FormInput from "../FormInput";
import FormButton from "../FormButton";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showErrorToaster, showSuccessToaster } from "../../util/toaster";
import { fetchApi } from "../../util/fetchApi";

const env = import.meta.env;

const SignupForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>({
    name: "",
    email: "",
    password: "",
  });

  let handleSignUp = (e: any) => {
    e.preventDefault();
    fetchApi(env.VITE_Signup_API, null, "POST", userInfo)
      .then((res) => {
        if (res.statusCode === 400) {
          showErrorToaster("Invalid input !");
        } else if (res.statusCode === 200) {
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
          onChange={(e: any) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
        <FormInput
          type={"email"}
          placeholder={"Email"}
          value={userInfo.email}
          labelValue={"Email"}
          onChange={(e: any) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
        <FormInput
          type={"password"}
          placeholder={"Password"}
          value={userInfo.password}
          labelValue={"Password"}
          onChange={(e: any) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <FormButton buttonText={"Signup"} onClick={(e: any) => handleSignUp(e)} />
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
