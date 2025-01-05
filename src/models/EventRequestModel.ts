import { Duration } from "./Duration";
import { EventCollaboratorRequest } from "./EventCollaboratorRequest";
import { RecurrencePattern } from "./RecurrencePattern";

export interface EventRequestModel {
    id: number,
    title: string,
    location: string,
    description: string,
    eventDate: Date,
    duration: Duration,
    recurrencePattern: RecurrencePattern,
    eventCollaborators: EventCollaboratorRequest[]
}