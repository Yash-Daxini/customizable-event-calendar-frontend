import { Duration } from "./Duration";
import { EventCollaboratorRequest } from "./EventCollaboratorRequest";

export interface NonRecurringEventRequest {
    id: number,
    title: string,
    location: string,
    description: string,
    duration: Duration,
    eventDate: string,
    eventCollaborators: EventCollaboratorRequest[]
}