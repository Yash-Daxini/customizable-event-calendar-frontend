import dayjs, { Dayjs } from "dayjs";

export const formatDate = (date: Date): string => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export const getBackendAcceptedFormat = (date: Date): string => {
    return new Date(date).toISOString().split('T')[0];
}

export const getMonthName = (date: Date): string => {
    return date.toLocaleString('default', { month: 'long' })
}

export const getLongerDayName = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
}

export const getShorterDayName = (date: Date): string => {
    return date.toString().split(" ")[0];
}

export const isEqualDates = (date1: Date, date2: Date): boolean =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

export const getWeekNumber = (date: Date): number => (0 | (date.getDate() / 7)) + 1;

export const getWeekOfMonth = (date: Date): string => {
    const weekNumber = (0 | (date.getDate() / 7)) + 1;
    switch (weekNumber) {
        case 1:
            return "first";
        case 2:
            return "second";
        case 3:
            return "third";
        case 4:
            return "fourth";
        default:
            return "last";
    }
};

export const getDayNumberFromDate = (date: Date): number => {
    let day = date.getDay();

    if (day == 0) return 7;
    return day;
};


// Common format strings
const DATE_FORMAT = "YYYY-MM-DD";
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

// Utility functions
export const formatDateDayJS = (date: string | Dayjs, format: string = DATE_FORMAT): string => {
    return dayjs(date).format(format);
};

export const formatDateTime = (date: string | Dayjs): string => {
    return dayjs(date).format(DATE_TIME_FORMAT);
};

export const parseDate = (dateStr: string, format: string = DATE_FORMAT): Dayjs => {
    return dayjs(dateStr, format);
};

export const getCurrentDate = (): string => {
    return dayjs().format(DATE_FORMAT);
};

export const getCurrentDateDayJS = (date: string): Dayjs => {
    return dayjs(date);
}

export const getCurrentDateTime = (): string => {
    return dayjs().format(DATE_TIME_FORMAT);
};