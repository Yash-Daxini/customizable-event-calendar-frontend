import { DashboardData } from "../models/DashboardData";
import { ApiResponse, APIService } from "./APIService";
const env = import.meta.env;

export const GetDashboardData = async (): Promise<DashboardData> => {
    const endPoint: string = env.VITE_GET_DASHBOARD_DATA;
    const response: ApiResponse<DashboardData> = await APIService.get<DashboardData>(endPoint);
    return response.data;
}