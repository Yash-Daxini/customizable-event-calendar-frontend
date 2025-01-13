import { Frequency } from "../enums/Frequency";
import { EventCollaboratorResponse } from "../models/EventCollaboratorResponse";
import { EventRequestModel } from "../models/EventRequestModel";
import { EventResponse } from "../models/EventResponse";
import { NonRecurringEventRequest } from "../models/NonRecurringEventRequest";
import { RecurrencePattern } from "../models/RecurrencePattern";
import { RecurringEventRequest } from "../models/RecurringEventRequest";
import { parseDate } from "./DateUtil";

export const getRecurringEventModel = (event: EventRequestModel): RecurringEventRequest => {
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

export const getNonRecurringEventModel = (event: EventRequestModel): NonRecurringEventRequest => {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        eventDate: event.recurrencePattern.startDate,
        duration: event.duration,
        eventCollaborators: event.eventCollaborators
    };
}

export const getEventModel = (event: EventResponse): EventRequestModel => {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        duration: event.duration,
        recurrencePattern: getRecurrecePattern(event.recurrencePattern),
        eventCollaborators: event.eventCollaborators.map((eventCollaborator: EventCollaboratorResponse) => {
            return {
                userId: eventCollaborator.user.id,
                eventCollaboratorRole: eventCollaborator.eventCollaboratorRole,
                confirmationStatus: eventCollaborator.confirmationStatus,
            }
        }),
    }
}

const getRecurrecePattern = (recurrencePattern: RecurrencePattern) => {
    return {
        ...recurrencePattern,
        frequency: recurrencePattern.frequency as Frequency,
        startDate: parseDate(recurrencePattern.startDate),
        endDate: parseDate(recurrencePattern.endDate),
    }
}