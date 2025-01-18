import { Frequency } from "../enums/Frequency";
import DateWrapper from "../util/DateUtil";

export interface RecurrencePatternResponse {
    startDate: DateWrapper,
    endDate: DateWrapper,
    frequency: Frequency,
    interval: number,
    byWeekDay: number[],
    weekOrder?: number | null,
    byMonthDay?: number | null,
    byMonth?: number
}