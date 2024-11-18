import { Duration } from "./Duration";
import { EventCollaborator } from "./EventCollaborator";

export interface NonRecurringEventRequest {
    id: number,
    title: string,
    location: string,
    description: string,
    duration: Duration,
    eventDate: Date,
    eventCollaborators: EventCollaborator[]
}