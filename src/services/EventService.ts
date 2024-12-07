import { useAuth } from "../hooks/AuthProvider";
import { EventResponse } from "../models/EventResponse";
import { NonRecurringEventRequest } from "../models/NonRecurringEventRequest";
import { RecurringEventRequest } from "../models/RecurringEventRequest";
import { replaceIdsInUrl } from "../util/UrlService";
import { ApiResponse, APIService } from "./APIService";
const env = import.meta.env;

const auth = useAuth();
const userId: number = auth?.user.id as number;

export const GetAllEvents = async (): Promise<EventResponse[]> => {
    const endPoint: string = replaceIdsInUrl(env.VITE_GET_ALL_EVENTS_URL, [userId]);
    const response: ApiResponse<EventResponse[]> = await APIService.get<EventResponse[]>(endPoint);
    return response.data;
}

export const GetDailyEvents = async (): Promise<EventResponse[]> => {
    const endPoint: string = replaceIdsInUrl(env.VITE_GET_DAILY_EVENTS_URL, [userId]);
    const response: ApiResponse<EventResponse[]> = await APIService.get<EventResponse[]>(endPoint);
    return response.data;
}

export const GetWeeklyEvents = async (): Promise<EventResponse[]> => {
    const endPoint: string = replaceIdsInUrl(env.VITE_GET_WEEKLY_EVENTS_URL, [userId]);
    const response: ApiResponse<EventResponse[]> = await APIService.get<EventResponse[]>(endPoint);
    return response.data;
}

export const GetMonthlyEvents = async (): Promise<EventResponse[]> => {
    const endPoint: string = replaceIdsInUrl(env.VITE_GET_MONTHLY_EVENTS_URL, [userId]);
    const response: ApiResponse<EventResponse[]> = await APIService.get<EventResponse[]>(endPoint);
    return response.data;
}

export const GetOrganizerEvents = async (): Promise<EventResponse[]> => {
    const endPoint: string = replaceIdsInUrl(env.VITE_GET_ORGANIZER_EVENTS_URL, [userId]);
    const response: ApiResponse<EventResponse[]> = await APIService.get<EventResponse[]>(endPoint);
    return response.data;
}

export const GetProposedEvents = async (): Promise<EventResponse[]> => {
    const endPoint: string = replaceIdsInUrl(env.VITE_GET_PROPOSED_EVENTS_URL, [userId]);
    const response: ApiResponse<EventResponse[]> = await APIService.get<EventResponse[]>(endPoint);
    return response.data;
}

export const AddEvent = async (eventObj: NonRecurringEventRequest): Promise<number> => {
    const endPoint: string = replaceIdsInUrl(env.VITE_ADD_EVENT_URL, [userId]);
    const response: ApiResponse<number> = await APIService.post<number, NonRecurringEventRequest>(endPoint, eventObj);
    return response.data;
}

export const AddRecurringEvent = async (eventObj: RecurringEventRequest): Promise<number> => {
    const endPoint: string = replaceIdsInUrl(env.VITE_ADD_RECURRING_EVENT_URL, [userId]);
    const response: ApiResponse<number> = await APIService.post<number, RecurringEventRequest>(endPoint, eventObj);
    return response.data;
}

export const UpdateEvent = async (eventObj: NonRecurringEventRequest, eventId: number) => {
    const endPoint: string = replaceIdsInUrl(env.VITE_UPDATE_EVENT_URL, [userId, eventId]);
    const response: ApiResponse<number> = await APIService.put<number, NonRecurringEventRequest>(endPoint, eventObj);
    return response.data;
}

export const UpdateRecurringEvent = async (eventObj: RecurringEventRequest, eventId: number) => {
    const endPoint: string = replaceIdsInUrl(env.VITE_UPDATE_RECURRING_EVENT_URL, [userId, eventId]);
    const response: ApiResponse<number> = await APIService.put<number, RecurringEventRequest>(endPoint, eventObj);
    return response.data;
}

export const DeleteEvent = async (eventId: number): Promise<void> => {
    const endPoint: string = replaceIdsInUrl(env.VITE_DELETE_EVENT_URL, [userId, eventId]);
    await APIService.delete(endPoint);
}