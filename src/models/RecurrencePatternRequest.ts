import { Frequency } from "../enums/Frequency";

export interface RecurrencePatternRequest {
    startDate: string,
    endDate: string,
    frequency: Frequency,
    interval: number,
    byWeekDay: number[],
    weekOrder?: number | null,
    byMonthDay?: number | null,
    byMonth?: number
}