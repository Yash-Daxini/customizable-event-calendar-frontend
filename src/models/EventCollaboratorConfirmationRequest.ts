import { ConfirmationStatus } from "../enums/ConfirmationStatus";
import { Duration } from "./Duration";

export interface EventCollaboratorConfirmationRequest {
    id: number,
    eventId: number,
    userId: number,
    confirmationStatus: ConfirmationStatus,
    proposedDuration?: Duration
}