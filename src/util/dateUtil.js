export const formatDate = (date) => {
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

export const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long' })
}

export const getShorterDayName = (date) => {
    return date.toString().split(" ")[0];
}

export const isEqualDates = (date1, date2) => date1.getTime() === date2.getTime();