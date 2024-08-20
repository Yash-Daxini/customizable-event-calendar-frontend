export const convertTo12HourFormat = (hour) => {
  if (hour == 0) return "12 AM";
  else if (hour < 12) return hour + " AM";
  else if (hour == 12) return "12 PM";
  return (hour % 12) + " PM";
};

export const isHourOverlaps = (startHour, endHour, hour) =>
  hour >= startHour && hour < endHour;

export const isDurationOverlaps = (
  firstStartHour,
  firstEndHour,
  secondStartHour,
  secondEndHour,
) =>
  (firstStartHour >= secondStartHour && firstStartHour < secondEndHour) ||
  (firstEndHour > secondStartHour && firstEndHour <= secondEndHour) ||
  (secondStartHour >= firstStartHour && secondStartHour < firstEndHour) ||
  (secondEndHour > firstStartHour && secondEndHour <= firstEndHour);
