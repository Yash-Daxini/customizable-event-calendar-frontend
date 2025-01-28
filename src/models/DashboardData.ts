import { EventResponse } from "./EventResponse";
import { SharedCalendar } from "./SharedCalendar";

export interface DashboardData {
    dailyEvents: EventResponse[];
    weeklyEvents: EventResponse[];
    monthlyEvents: EventResponse[];
    organizedEvents: EventResponse[];
    proposedEvents: EventResponse[];
    sharedCalendars: SharedCalendar[];
}