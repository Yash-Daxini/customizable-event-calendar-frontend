import { DateType } from "../common/types";

export interface CollaborationRequest {
    id: number,
    eventId: number,
    userId: number,
    eventDate: DateType
}