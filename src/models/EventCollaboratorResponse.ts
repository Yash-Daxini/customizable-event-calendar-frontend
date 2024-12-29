import { ConfirmationStatus } from "../enums/ConfirmationStatus";
import { EventCollaboratorRole } from "../enums/EventCollaboratorRole";
import { UserResponse } from "./UserResponse";

export interface EventCollaboratorResponse {
    id: number,
    user: UserResponse,
    eventCollaboratorRole: EventCollaboratorRole
    confirmationStatus: ConfirmationStatus
}