import { DateType } from "../common/types";
import { Duration } from "./Duration";
import { EventCollaboratorRequest } from "./EventCollaboratorRequest";

export interface NonRecurringEventRequest {
    id: number,
    title: string,
    location: string,
    description: string,
    duration: Duration,
    eventDate: DateType,
    eventCollaborators: EventCollaboratorRequest[]
}