import { DateType } from "../common/types";
import { Duration } from "./Duration";
import { EventCollaboratorResponse } from "./EventCollaboratorResponse";
import { RecurrencePatternResponse } from "./RecurrencePattern";

export interface EventResponse {
    id: number,
    title: string,
    location: string,
    description: string,
    duration: Duration,
    recurrencePattern: RecurrencePatternResponse,
    occurrences: DateType[],
    eventCollaborators: EventCollaboratorResponse[],
}