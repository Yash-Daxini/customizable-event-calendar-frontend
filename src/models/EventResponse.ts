import DateWrapper from "../util/DateUtil";
import { Duration } from "./Duration";
import { EventCollaboratorResponse } from "./EventCollaboratorResponse";
import { RecurrencePatternResponse } from "./RecurrencePatternResponse";

export interface EventResponse {
  id: number,
  title: string,
  location: string,
  description: string,
  duration: Duration,
  recurrencePattern: RecurrencePatternResponse,
  occurrences: DateWrapper[],
  eventCollaborators: EventCollaboratorResponse[],
}

export const mapToEventResponses = (data: any[]): EventResponse[] => {
  return data.map(item => ({
    ...item,
    recurrencePattern: {
      ...item.recurrencePattern,
      startDate: new DateWrapper(item.recurrencePattern.startDate),
      endDate: new DateWrapper(item.recurrencePattern.endDate)
    },
    occurrences: item.occurrences.map((occurrence: string) => new DateWrapper(occurrence)),
  }));
};

export const mapToEventResponse = (data: any): EventResponse => {
  return {
    ...data,
    recurrencePattern: {
      ...data.recurrencePattern,
      startDate: new DateWrapper(data.recurrencePattern.startDate),
      endDate: new DateWrapper(data.recurrencePattern.endDate)
    },
    occurrences: data.occurrences.map((occurrence: string) => new DateWrapper(occurrence)),
  };
};

export const serializeEventResponse = (event: EventResponse): any => {
  return {
    ...event,
    recurrencePattern: {
      ...event.recurrencePattern,
      startDate: event.recurrencePattern.startDate.formatDate(),
      endDate: event.recurrencePattern.endDate.formatDate()
    },
    occurrences: event.occurrences.map((occurrence: DateWrapper) => occurrence.formatDate()),
  }
}

export const deserializeEventResponse = (event: any): EventResponse => {
  return {
    ...event,
    recurrencePattern: {
      ...event.recurrencePattern,
      startDate: new DateWrapper(event.recurrencePattern.startDate),
      endDate: new DateWrapper(event.recurrencePattern.endDate)
    },
    occurrences: event.occurrences.map((occurrence: string) => new DateWrapper(occurrence)),
  }
}