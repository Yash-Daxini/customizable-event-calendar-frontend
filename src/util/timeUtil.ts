export const convertTo12HourFormat = (hour: number): string => {
  if (hour == 0) return "12 am";
  else if (hour < 12) return hour + " am";
  else if (hour == 12) return "12 pm";
  return (hour % 12) + " pm";
};

export const isHourOverlaps = (startHour: number, endHour: number, hour: number): boolean =>
  hour >= startHour && hour < endHour;

export const isDurationOverlaps = (
  firstStartHour: number,
  firstEndHour: number,
  secondStartHour: number,
  secondEndHour: number,
): boolean =>
  (firstStartHour >= secondStartHour && firstStartHour < secondEndHour) ||
  (firstEndHour > secondStartHour && firstEndHour <= secondEndHour) ||
  (secondStartHour >= firstStartHour && secondStartHour < firstEndHour) ||
  (secondEndHour > firstStartHour && secondEndHour <= firstEndHour);
