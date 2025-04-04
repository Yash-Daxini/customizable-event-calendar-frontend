import { EventResponse, mapToEventResponse, mapToEventResponses } from "../models/EventResponse";
import { NonRecurringEventRequest } from "../models/NonRecurringEventRequest";
import { RecurringEventRequest } from "../models/RecurringEventRequest";
import DateWrapper from "../util/DateUtil";
import { replaceIdsInUrl } from "../util/UrlService";
import { ApiResponse, APIService } from "./APIService";
const env = import.meta.env;

export const GetAllEvents = async (): Promise<EventResponse[]> => {
    const endPoint: string = env.VITE_GET_ALL_EVENTS_URL;
    const response: ApiResponse<EventResponse[]> = await APIService.get<EventResponse[]>(endPoint);
    return mapToEventResponses(response.data);
}

export const GetEventById = async (eventId: number): Promise<EventResponse> => {
    const endPoint: string = replaceIdsInUrl(env.VITE_GET_EVENT_BY_ID_URL, [eventId]);
    const response: ApiResponse<EventResponse> = await APIService.get<EventResponse>(endPoint);
    return mapToEventResponse(response.data);
}

export const GetDailyEvents = async (): Promise<EventResponse[]> => {
    const endPoint: string = env.VITE_GET_DAILY_EVENTS_URL;
    const response: ApiResponse<EventResponse[]> = await APIService.get<EventResponse[]>(endPoint);
    return response.data;
}

export const GetWeeklyEvents = async (): Promise<EventResponse[]> => {
    const endPoint: string = env.VITE_GET_WEEKLY_EVENTS_URL;
    const response: ApiResponse<EventResponse[]> = await APIService.get<EventResponse[]>(endPoint);
    return response.data;
}

export const GetMonthlyEvents = async (): Promise<EventResponse[]> => {
    const endPoint: string = env.VITE_GET_MONTHLY_EVENTS_URL;
    const response: ApiResponse<EventResponse[]> = await APIService.get<EventResponse[]>(endPoint);
    return response.data;
}

export const GetOrganizerEvents = async (): Promise<EventResponse[]> => {
    const endPoint: string = env.VITE_GET_ORGANIZER_EVENTS_URL;
    const response: ApiResponse<EventResponse[]> = await APIService.get<EventResponse[]>(endPoint);
    return response.data;
}

export const GetProposedEvents = async (): Promise<EventResponse[]> => {
    const endPoint: string = env.VITE_GET_PROPOSED_EVENTS_URL
    const response: ApiResponse<EventResponse[]> = await APIService.get<EventResponse[]>(endPoint);
    return response.data;
}

export const GetEventsBetweenDates = async (startDate: DateWrapper, endDate: DateWrapper): Promise<EventResponse[]> => {
    let endPoint: string = env.VITE_GET_EVENTS_BETWEEN_DATES
    endPoint += `?startDate=${startDate.formatDate()}&endDate=${endDate.formatDate()}`;
    const response: ApiResponse<EventResponse[]> = await APIService.get<EventResponse[]>(endPoint);
    return response.data;
}

export const AddEvent = async (eventObj: NonRecurringEventRequest): Promise<number> => {
    const endPoint: string = env.VITE_ADD_EVENT_URL;
    const response: ApiResponse<number> = await APIService.post<number, NonRecurringEventRequest>(endPoint, eventObj);
    return response.data;
}

export const AddRecurringEvent = async (eventObj: RecurringEventRequest): Promise<number> => {
    const endPoint: string = env.VITE_ADD_RECURRING_EVENT_URL;
    const response: ApiResponse<number> = await APIService.post<number, RecurringEventRequest>(endPoint, eventObj);
    return response.data;
}

export const UpdateEvent = async (eventObj: NonRecurringEventRequest, eventId: number) => {
    const endPoint: string = replaceIdsInUrl(env.VITE_UPDATE_EVENT_URL, [eventId]);
    const response: ApiResponse<number> = await APIService.put<number, NonRecurringEventRequest>(endPoint, eventObj);
    return response.data;
}

export const UpdateRecurringEvent = async (eventObj: RecurringEventRequest, eventId: number) => {
    const endPoint: string = replaceIdsInUrl(env.VITE_UPDATE_RECURRING_EVENT_URL, [eventId]);
    const response: ApiResponse<number> = await APIService.put<number, RecurringEventRequest>(endPoint, eventObj);
    return response.data;
}

export const DeleteEvent = async (eventId: number): Promise<void> => {
    const endPoint: string = replaceIdsInUrl(env.VITE_DELETE_EVENT_URL, [eventId]);
    await APIService.delete(endPoint);
}