import dayjs, { Dayjs } from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
import { DATE_BACKEND_FORMAT, DATE_DISPLAY_FORMAT } from "../constants/DateFormatConstants";
import { DateType } from "../common/types";

dayjs.extend(isoWeek);

export const isEqualDates = (date1: DateType, date2: DateType): boolean => {
    if (!date1 || !date2) return false;
    return formatDateDayJS(date1) === formatDateDayJS(date2);
}

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

export const getDisplayFormatDate = (date: DateType): string => {
    return formatDateDayJS(date, DATE_DISPLAY_FORMAT);
}

export const parseDate = (dateStr: string | DateType, format: string = DATE_BACKEND_FORMAT): Dayjs => {
    return dayjs(dateStr, format);
};

export const getCurrentDate = (): Dayjs => {
    return dayjs();
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
