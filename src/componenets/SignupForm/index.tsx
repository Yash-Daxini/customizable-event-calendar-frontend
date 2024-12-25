import { useState } from "react";
import styles from "./style.module.css";
import FormInput from "../FormInput";
import FormButton from "../FormButton";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showErrorToaster, showSuccessToaster } from "../../util/Toaster";
import { LOGIN_URL } from "../../constants/RouteConstants";
import { UserRequest } from "../../models/UserRequest";
import { SignUp } from "../../services/AuthService";

const SignupForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserRequest>({
    id: 0,
    name: "",
    email: "",
    password: "",
  });

  let handleSignUp = (e: any) => {
    e.preventDefault();
    SignUp(userInfo)
      .then(() => showSuccessToaster("Successfully signed up !"))
      .catch(() => showErrorToaster(`Some error occurred !`));
  };

  return (
    <div id={`${styles.signupDiv}`}>
      <ToastContainer />
      <span className={`${styles.title}`}>Signup</span>
      <form>
        <FormInput
          type={"text"}
          placeholder={"Username"}
          value={userInfo.name}
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
        <Link to={LOGIN_URL} className={`${styles.loginLink}`}>
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
