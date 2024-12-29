import { Duration } from "./Duration";
import { EventCollaboratorResponse } from "./EventCollaboratorResponse";

export interface NonRecurringEventRequest {
    id: number,
    title: string,
    location: string,
    description: string,
    duration: Duration,
    eventDate: Date,
    eventCollaborators: EventCollaboratorResponse[]
}