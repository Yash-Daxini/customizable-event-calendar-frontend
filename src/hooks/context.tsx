import { createContext } from "react";
import { EventResponse } from "../models/EventResponse";
import DateWrapper from "../util/DateUtil";

export interface CalendarContextType {
    date: DateWrapper,
    setCurrentDate: React.Dispatch<React.SetStateAction<DateWrapper>>,
    events: EventResponse[],
    setEvents: React.Dispatch<React.SetStateAction<EventResponse[]>>,
};

export interface LoadingContextType {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

export const CalendarContext = createContext<CalendarContextType | null>(null);

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);