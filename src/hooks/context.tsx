import { createContext } from "react";
import { EventResponse } from "../models/EventResponse";

interface CalendarContextType {
    date: Date,
    setCurrentDate: (date: Date) => void,
    events: EventResponse[],
    setEvents: (event: EventResponse[]) => void,
};

export const CalendarContext = createContext<CalendarContextType | null>(null);