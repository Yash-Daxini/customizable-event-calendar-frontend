import { ConfirmationStatus } from "../enums/ConfirmationStatus";
import { EventCollaboratorRole } from "../enums/EventCollaboratorRole";
import { Frequency } from "../enums/Frequency";
import DateWrapper from "../util/DateUtil";
import { Duration } from "./Duration";
import { EventCollaboratorRequest } from "./EventCollaboratorRequest";
import { RecurrencePatternResponse } from "./RecurrencePatternResponse";

export interface EventRequestModel {
    id: number,
    title: string,
    location: string,
    description: string,
    duration: Duration,
    recurrencePattern: RecurrencePatternResponse,
    eventCollaborators: EventCollaboratorRequest[]
}

export const getDefaultEvent = (defaultDate:string,defaultUserId:number): EventRequestModel => {
    return {
        title: "",
        location: "",
        description: "",
        duration: {
            startHour: 0,
            endHour: 1,
        },
        recurrencePattern: {
            frequency: Frequency.None,
            startDate: new DateWrapper(defaultDate),
            endDate: new DateWrapper(defaultDate),
        },
        eventCollaborators: [{
            userId: defaultUserId,
            eventCollaboratorRole: EventCollaboratorRole.Organizer,
            confirmationStatus: ConfirmationStatus.Accept,
        }]
    } as EventRequestModel;
}