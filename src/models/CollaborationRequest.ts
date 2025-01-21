import DateWrapper from "../util/DateUtil";

export interface CollaborationRequest {
    id: number,
    eventId: number,
    userId: number,
    eventDate: DateWrapper
}