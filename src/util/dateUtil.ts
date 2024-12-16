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

export const getMonthName = (date: Date): string => {
    return date.toLocaleString('default', { month: 'long' })
}

export const getShorterDayName = (date: Date): string => {
    return date.toString().split(" ")[0];
}

export const isEqualDates = (date1: Date, date2: Date): boolean =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();