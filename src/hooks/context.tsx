import { createContext } from "react";
import { EventResponse } from "../models/EventResponse";
import { DateType } from "../common/types";

export interface CalendarContextType {
    date: DateType,
    setCurrentDate: React.Dispatch<React.SetStateAction<DateType>>,
    events: EventResponse[],
    setEvents: React.Dispatch<React.SetStateAction<EventResponse[]>>,
};

export const CalendarContext = createContext<CalendarContextType | null>(null);