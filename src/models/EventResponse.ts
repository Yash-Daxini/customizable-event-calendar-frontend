import { DateType } from "../common/types";
import { Duration } from "./Duration";
import { EventCollaboratorResponse } from "./EventCollaboratorResponse";
import { RecurrencePattern } from "./RecurrencePattern";

export interface EventResponse {
    id: number,
    title: string,
    location: string,
    description: string,
    duration: Duration,
    recurrencePattern: RecurrencePattern,
    occurrences: DateType[],
    eventCollaborators: EventCollaboratorResponse[],
}