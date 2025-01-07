export interface RecurrencePatternRequest {
    startDate: string,
    endDate: string,
    frequency: string,
    interval: number,
    byWeekDay: number[],
    weekOrder?: number | null,
    byMonthDay?: number | null,
    byMonth?: number
}