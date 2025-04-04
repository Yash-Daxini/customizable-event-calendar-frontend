import { ConfirmationStatus } from "../enums/ConfirmationStatus"
import { EventCollaboratorRole } from "../enums/EventCollaboratorRole"

export interface EventCollaboratorRequest {
    userId: number,
    eventCollaboratorRole: EventCollaboratorRole
    confirmationStatus: ConfirmationStatus
}