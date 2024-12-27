import { UserResponse } from "../models/UserResponse";
import { APIService } from "./APIService";
const env = import.meta.env;

export const GetUsersToInvite = async (): Promise<UserResponse[]> => {
    const response = await APIService.get<UserResponse[]>(env.VITE_GET_USERS_TO_INVITE_API);
    return response.data;
}