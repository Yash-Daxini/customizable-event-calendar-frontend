import { createContext } from "react";
import { EventResponse } from "../models/EventResponse";
import DateWrapper from "../util/DateUtil";

export interface CalendarContextType {
    date: DateWrapper,
    setCurrentDate: React.Dispatch<React.SetStateAction<DateWrapper>>,
    events: EventResponse[],
    setEvents: React.Dispatch<React.SetStateAction<EventResponse[]>>,
};

export const CalendarContext = createContext<CalendarContextType | null>(null);