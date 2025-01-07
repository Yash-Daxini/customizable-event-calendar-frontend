import { EventCollaboratorResponse } from "../models/EventCollaboratorResponse";
import { EventRequestModel } from "../models/EventRequestModel";
import { EventResponse } from "../models/EventResponse";
import { NonRecurringEventRequest } from "../models/NonRecurringEventRequest";
import { RecurrencePattern } from "../models/RecurrencePattern";
import { RecurrencePatternRequest } from "../models/RecurrencePatternRequest";
import { RecurringEventRequest } from "../models/RecurringEventRequest";
import { getBackendAcceptedFormat } from "./DateUtil";

export const GetRecurringEventModel = (event: EventRequestModel): RecurringEventRequest => {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        duration: event.duration,
        recurrencePattern: GetRecurrencePatternRequest(event.recurrencePattern),
        eventCollaborators: event.eventCollaborators
    };
}

export const GetNonRecurringEventModel = (event: EventRequestModel): NonRecurringEventRequest => {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        eventDate: getBackendAcceptedFormat(event.eventDate),
        duration: event.duration,
        eventCollaborators: event.eventCollaborators
    };
}

export const GetEventModel = (event: EventResponse, date: Date): EventRequestModel => {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        eventDate: new Date(date),
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

const GetRecurrencePatternRequest = (recurrencePattern: RecurrencePattern): RecurrencePatternRequest => {
    return {
        startDate: getBackendAcceptedFormat(recurrencePattern.startDate),
        endDate: getBackendAcceptedFormat(recurrencePattern.endDate),
        frequency: recurrencePattern.frequency.toString(),
        interval: recurrencePattern.interval,
        byWeekDay: recurrencePattern.byWeekDay,
        weekOrder: recurrencePattern.weekOrder,
        byMonthDay: recurrencePattern.byMonthDay,
        byMonth: recurrencePattern.byMonth,
    }
}