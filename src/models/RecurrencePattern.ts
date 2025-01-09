import { DateType } from "../common/types";
import { Frequency } from "../enums/Frequency";

export interface RecurrencePattern {
    startDate: DateType,
    endDate: DateType,
    frequency: Frequency,
    interval: number,
    byWeekDay: number[],
    weekOrder?: number | null,
    byMonthDay?: number | null,
    byMonth?: number
}