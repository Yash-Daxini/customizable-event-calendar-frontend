import { Duration } from "./Duration";
import { EventCollaboratorRequest } from "./EventCollaboratorRequest";
import { RecurrencePatternResponse } from "./RecurrencePattern";

export interface EventRequestModel {
    id: number,
    title: string,
    location: string,
    description: string,
    duration: Duration,
    recurrencePattern: RecurrencePatternResponse,
    eventCollaborators: EventCollaboratorRequest[]
}