import { createContext } from "react";

interface CalendarContextType {
    date: Date,
    setCurrentDate: any,
    events: any[],
    setEvents: any,
};

export const CalendarContext = createContext<CalendarContextType | null>(null);