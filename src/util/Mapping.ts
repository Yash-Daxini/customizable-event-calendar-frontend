import { EventCollaboratorResponse } from "../models/EventCollaboratorResponse";

export const CreateEvent = (event: any): any => {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        recurrencePattern: event.recurrencePattern,
        eventDate: event.eventDate,
        duration: {
            startHour: event.duration.startHour,
            endHour: event.duration.endHour,
        },
        eventCollaborators: event.eventCollaborators.map((eventCollaborator: EventCollaboratorResponse) => {
            return {
                userId: eventCollaborator.user.id,
                eventCollaboratorRole: eventCollaborator.eventCollaboratorRole,
                confirmationStatus: eventCollaborator.confirmationStatus,
            }
        }),
    };
}