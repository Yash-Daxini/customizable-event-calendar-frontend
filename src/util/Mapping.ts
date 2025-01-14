import { Frequency } from "../enums/Frequency";
import { EventCollaboratorResponse } from "../models/EventCollaboratorResponse";
import { EventRequestModel } from "../models/EventRequestModel";
import { EventResponse } from "../models/EventResponse";
import { NonRecurringEventRequest } from "../models/NonRecurringEventRequest";
import { RecurrencePatternResponse } from "../models/RecurrencePattern";
import { RecurrencePatternRequest } from "../models/RecurrencePatternRequest";
import { RecurringEventRequest } from "../models/RecurringEventRequest";
import { formatDateDayJS } from "./DateUtil";

export const getRecurringEventModel = (event: EventRequestModel): RecurringEventRequest => {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        duration: event.duration,
        recurrencePattern: getRecurrecePatternRequest(event.recurrencePattern),
        eventCollaborators: event.eventCollaborators
    };
}

export const getNonRecurringEventModel = (event: EventRequestModel): NonRecurringEventRequest => {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        eventDate: formatDateDayJS(event.recurrencePattern.startDate),
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

const getRecurrecePattern = (recurrencePattern: RecurrencePatternResponse): RecurrencePatternResponse => {
    return {
        ...recurrencePattern,
        frequency: recurrencePattern.frequency as Frequency,
        startDate: recurrencePattern.startDate,
        endDate: recurrencePattern.endDate,
    }
}

const getRecurrecePatternRequest = (recurrencePattern: RecurrencePatternResponse): RecurrencePatternRequest => {
    return {
        ...recurrencePattern,
        frequency: recurrencePattern.frequency as Frequency,
        startDate: formatDateDayJS(recurrencePattern.startDate),
        endDate: formatDateDayJS(recurrencePattern.endDate),
    }
}