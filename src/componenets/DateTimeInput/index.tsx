import React, { ChangeEvent } from "react";
import styles from "./style.module.css";
import HourDropdown from "../HourDropdown";
import DateInput from "../DateInput";
interface DateTimeInputProps {
  onDateChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onHourChange: React.Dispatch<React.SetStateAction<any>>,
  isDateDisable: boolean,
  initialDateValue: string,
  initialHourValue: number
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  onDateChange,
  onHourChange,
  isDateDisable,
  initialDateValue,
  initialHourValue,
}: DateTimeInputProps) => {
  return (
    <div className={`${styles.dateTimeSelectionDiv}`}>
      <DateInput
        onDateChange={onDateChange}
        isDateDisable={isDateDisable}
        initialValue={initialDateValue}
      />
      <HourDropdown
        onHourChange={onHourChange}
        initialValue={initialHourValue}
      />
    </div>
  );
};

export default DateTimeInput;
