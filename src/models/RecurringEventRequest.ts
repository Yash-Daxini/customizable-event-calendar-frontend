import { Duration } from "./Duration";
import { EventCollaboratorRequest } from "./EventCollaboratorRequest";
import { RecurrencePatternRequest } from "./RecurrencePatternRequest";

export interface RecurringEventRequest {
    id: number,
    title: string,
    location: string,
    description: string,
    duration: Duration,
    recurrencePattern: RecurrencePatternRequest,
    eventCollaborators: EventCollaboratorRequest[]
}