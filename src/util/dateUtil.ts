import dayjs, { Dayjs } from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
import { DATE_BACKEND_FORMAT, DATE_DISPLAY_FORMAT } from "../constants/DateFormatConstants";

dayjs.extend(isoWeek);

class DateWrapper {
    private date: Dayjs;

    constructor(date?: string | Date | Dayjs) {
        this.date = dayjs(date);
    }

    getDateWrapper(): Dayjs {
        return this.date;
    }

    formatDate = (format: string = DATE_BACKEND_FORMAT): string => {
        return this.date.format(format);
    };

    getDisplayFormat = (): string => {
        return this.date.format(DATE_DISPLAY_FORMAT);
    }

    getFourDigitYear = (): number => {
        return parseInt(this.date.format("YYYY"));
    }

    getTwoDigitYear = (): number => {
        return parseInt(this.date.format("YY"));
    }

    getDate = (): number => {
        return parseInt(this.date.format("D"));
    }

    getMonth = (): number => {
        return parseInt(this.date.format("M"));
    }

    getTwoDigitMonth = (): string => {
        return this.date.format("MM");
    }

    getAbbreviatedMonthName = (): string => {
        return this.date.format("MMM");
    }

    getFullMonthName = (): string => {
        return this.date.format("MMMM");
    }

    getDayOfMonth = (): number => {
        return parseInt(this.date.format("D"));
    }

    getWeekDay = (): number => {
        return this.date.isoWeekday();
    }

    incrementMonth = (): DateWrapper => {
        return new DateWrapper(this.date.add(1, "month",));
    }

    decrementMonth = (): DateWrapper => {
        return new DateWrapper(this.date.subtract(1, "month",));
    }

    setDay = (day: number): DateWrapper => {
        return new DateWrapper(this.date.set("date", day));
    }

    getDaysInMonth = (): number => {
        return this.date.daysInMonth();
    }

    getFirstDayOfMonth = (): number => {
        return this.date.startOf("month").day();
    }

    getWeekDayName = (): string => {
        return this.date.format("dddd");
    }

    getShorterWeekDayName = (): string => {
        return this.date.format("ddd");
    }

    isEqualDates = (date: DateWrapper): boolean => {
        return this.date.format(DATE_BACKEND_FORMAT) === date.formatDate();
    }

    getWeekNumber = (): number => (0 | (this.date.isoWeekday() / 7)) + 1;

    getWeekOfMonth = (): string => {
        const weekNumber = (0 | (this.date.isoWeek() / 7)) + 1;
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

    getDayNumberFromDate = (): number => {
        let day = this.date.isoWeekday();

        if (day == 0) return 7;
        return day;
    };

    static now(): DateWrapper {
        return new DateWrapper(dayjs());
    }
}

export default DateWrapper;