import { Duration } from "./Duration";
import { EventCollaboratorRequest } from "./EventCollaboratorRequest";
import { RecurrencePattern } from "./RecurrencePattern";

export interface RecurringEventRequest {
    id: number,
    title: string,
    location: string,
    description: string,
    duration: Duration,
    recurrencePattern: RecurrencePattern,
    eventCollaborators: EventCollaboratorRequest[]
}