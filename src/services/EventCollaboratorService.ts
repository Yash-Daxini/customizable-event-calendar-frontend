import { EventCollaboratorConfirmationRequest } from "../models/EventCollaboratorConfirmationRequest";
import { ApiResponse, APIService } from "./APIService";

const env = import.meta.env;

export const GiveEventCollaboratorResponse = async (eventCollaboratorConfirmationRequest: EventCollaboratorConfirmationRequest): Promise<number> => {
    const endPoint: string = env.VITE_GIVE_EVENTCOLLABORATOR_RESPONSE;
    const response: ApiResponse<void> = await APIService.put<void, EventCollaboratorConfirmationRequest>(endPoint, eventCollaboratorConfirmationRequest);
    return response.statusCode;
}