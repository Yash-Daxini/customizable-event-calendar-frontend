export const convertTo12HourFormat = (hour: number): string => {
  if (hour == 0) return "12 AM";
  else if (hour < 12) return hour + " AM";
  else if (hour == 12) return "12 PM";
  return (hour % 12) + " PM";
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
