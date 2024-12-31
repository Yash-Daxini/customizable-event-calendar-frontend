import { ConfirmationStatus } from "../enums/ConfirmationStatus"
import { EventCollaboratorRole } from "../enums/EventCollaboratorRole"

export interface EventCollaboratorRequest {
    id: number,
    userId: number,
    eventCollaboratorRole: EventCollaboratorRole
    confirmationStatus: ConfirmationStatus
}