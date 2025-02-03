import { ConfirmationStatus } from "../enums/ConfirmationStatus";
import { Duration } from "./Duration";

export interface EventCollaboratorConfirmationRequest {
    id: number,
    eventId: number,
    confirmationStatus: ConfirmationStatus,
    proposedDuration: Duration | null
}