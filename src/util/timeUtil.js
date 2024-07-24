export const convertTo12HourFormat = (hour) => {
    if (hour == 0)
        return "12 AM";
    else if (hour < 12)
        return hour + " AM";
    else if (hour == 12)
        return "12 PM";
    return hour % 12 + " PM";
}