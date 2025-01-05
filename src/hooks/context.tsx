import { createContext } from "react";
import { EventResponse } from "../models/EventResponse";

export interface CalendarContextType {
    date: Date,
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>,
    events: EventResponse[],
    setEvents: React.Dispatch<React.SetStateAction<EventResponse[]>>,
};

export const CalendarContext = createContext<CalendarContextType | null>(null);