import { SharedCalendar } from "../models/SharedCalendar";
import { ApiResponse, APIService } from "./APIService";
const env = import.meta.env;

export const GetSharedCalendars = async ():Promise<SharedCalendar[]> => {
    const endPoint: string = env.VITE_GET_SHARED_CALENDARS;
    const response: ApiResponse<SharedCalendar[]> = await APIService.get<SharedCalendar[]>(endPoint);
    return response.data;
}