import DateWrapper from "../util/DateUtil"
import { UserResponse } from "./UserResponse"

export interface SharedCalendar {
    id: number,
    senderUserId: number,
    receiverUserId: number,
    sender: UserResponse,
    receiver: UserResponse,
    fromDate: DateWrapper,
    toDate: DateWrapper
}