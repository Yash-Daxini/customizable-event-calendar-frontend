import { Frequency } from "../enums/Frequency";

export interface RecurrencePattern {
    startDate: Date,
    endDate: Date,
    frequency: Frequency,
    interval: number,
    byWeekDay: number[],
    weekOrder?: number | null,
    byMonthDay?: number | null,
    byMonth?: number
}