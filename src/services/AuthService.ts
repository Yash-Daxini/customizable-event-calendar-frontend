import { AuthenticationRequest } from "../models/AuthenticationRequest";
import { AuthenticationResponse } from "../models/AuthenticationResponse";
import { UserRequest } from "../models/UserRequest";
import { APIService } from "./APIService";
const env = import.meta.env;

export const Login = async (authenticationRequest: AuthenticationRequest): Promise<AuthenticationResponse> => {
    const response = await APIService.post<AuthenticationResponse, AuthenticationRequest>(env.VITE_Login_API, authenticationRequest);
    return response.data;
}

export const SignUp = async (userRequest: UserRequest): Promise<number> => {
    const response = await APIService.post<number, UserRequest>(env.VITE_Signup_API, userRequest);
    return response.data;
}