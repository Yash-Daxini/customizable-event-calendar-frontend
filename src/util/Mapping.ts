import { DateType } from "../common/types";
import { EventCollaboratorResponse } from "../models/EventCollaboratorResponse";
import { EventRequestModel } from "../models/EventRequestModel";
import { EventResponse } from "../models/EventResponse";
import { NonRecurringEventRequest } from "../models/NonRecurringEventRequest";
import { RecurringEventRequest } from "../models/RecurringEventRequest";
import { parseDate } from "./DateUtil";

export const GetRecurringEventModel = (event: EventRequestModel): RecurringEventRequest => {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        duration: event.duration,
        recurrencePattern: event.recurrencePattern,
        eventCollaborators: event.eventCollaborators
    };
}

export const GetNonRecurringEventModel = (event: EventRequestModel): NonRecurringEventRequest => {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        eventDate: parseDate(event.eventDate),
        duration: event.duration,
        eventCollaborators: event.eventCollaborators
    };
}

export const GetEventModel = (event: EventResponse, date: DateType): EventRequestModel => {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        eventDate: parseDate(date),
        duration: event.duration,
        recurrencePattern: event.recurrencePattern,
        eventCollaborators: event.eventCollaborators.map((eventCollaborator: EventCollaboratorResponse) => {
            return {
                userId: eventCollaborator.user.id,
                eventCollaboratorRole: eventCollaborator.eventCollaboratorRole,
                confirmationStatus: eventCollaborator.confirmationStatus,
            }
        }),
    }
}