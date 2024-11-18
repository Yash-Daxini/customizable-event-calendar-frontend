import { Duration } from "./Duration";
import { RecurrencePattern } from "./RecurrencePattern";

export interface EventResponse {
    id: number,
    title: string,
    location: string,
    description: string,
    duration: Duration,
    recurrencePattern: RecurrencePattern,
    occurrences: Date[]
}