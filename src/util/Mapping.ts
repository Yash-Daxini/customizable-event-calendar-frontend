import { EventResponse } from "../models/EventResponse";

export const CreateEvent = (event: EventResponse): any => {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        recurrencePattern: event.recurrencePattern,
        duration: {
            startHour: event.duration.startHour,
            endHour: event.duration.endHour,
        },
        eventCollaborators: event.eventCollaborators.map((eventCollaborator) => {
            return {
                id: eventCollaborator.id,
                userId: eventCollaborator.user.id,
                eventCollaboratorRole: eventCollaborator.eventCollaboratorRole,
                confirmationStatus: eventCollaborator.confirmationStatus,
            }
        }),
    };
}