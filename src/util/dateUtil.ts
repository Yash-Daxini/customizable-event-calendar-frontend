import dayjs, { Dayjs } from "dayjs";
import * as isoWeek from 'dayjs/plugin/isoWeek';
import { DATE_BACKEND_FORMAT } from "../constants/DateFormatConstants";
import { DateType } from "../common/types";

dayjs.extend(isoWeek);

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

export const getWeekNumber = (date: DateType): number => (0 | (getWeekDay(date) / 7)) + 1;

export const getWeekOfMonth = (date: DateType): string => {
    const weekNumber = (0 | (getWeekDay(date) / 7)) + 1;
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

export const getDayNumberFromDate = (date: DateType): number => {
    let day = getWeekDay(date);

    if (day == 0) return 7;
    return day;
};

// DayJs Utility functions
export const formatDateDayJS = (date: string | DateType, format: string = DATE_BACKEND_FORMAT): string => {
    return dayjs(date).format(format);
};

export const parseDate = (dateStr: string, format: string = DATE_BACKEND_FORMAT): Dayjs => {
    return dayjs(dateStr, format);
};

export const getCurrentDate = (): Dayjs => {
    return dayjs(DATE_BACKEND_FORMAT);
};

export const convertToDayJS = (date: Date): DateType => {
    return dayjs(date);
}

export const getFourDigitYear = (date: DateType): number => {
    return parseInt(date.format("YYYY"));
}

export const getTwoDigitYear = (date: DateType): number => {
    return parseInt(date.format("YY"));
}

export const getDate = (date: DateType): number => {
    return parseInt(date.format("D"));
}

export const getMonth = (date: DateType): number => {
    return parseInt(date.format("M"));
}

export const getTwoDigitMonth = (date: DateType): string => {
    return date.format("MM");
}

export const getAbbreviatedMonthName = (date: DateType): string => {
    return date.format("MMM");
}

export const getFullMonthName = (date: DateType): string => {
    return date.format("MMMM");
}

export const getDayOfMonth = (date: DateType): number => {
    return parseInt(date.format("D"));
}

export const getWeekDay = (date: DateType): number => {
    return date.isoWeekday();
}

export const incrementMonth = (date: DateType): DateType => {
    let month = date.get("month");
    return date.set("month", month + 1);
}

export const decrementMonth = (date: DateType): DateType => {
    let month = date.get("month");
    return date.set("month", month - 1);
}

export const setDay = (date: DateType, day: number): DateType => {
    return date.set("date", day);
}

export const getDaysInMonth = (date: DateType): number => {
    return date.daysInMonth();
}

export const getFirstDayOfMonth = (date: DateType): number => {
    return date.startOf("month").day();
}

export const getWeekDayName = (date: DateType): string => {
    return date.format("dddd");
}

export const getShorterWeekDayName = (date: DateType): string => {
    return date.format("ddd");
}
