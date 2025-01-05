import React from "react";
import styles from "./style.module.css";
import HourDropdown from "../HourDropdown";
import DateInput from "../DateInput";

interface DateTimeInputProps {
  onDateChange: React.Dispatch<React.SetStateAction<any>>,
  onHourChange: React.Dispatch<React.SetStateAction<any>>,
  isDateDisable: boolean,
  initialDateValue: Date,
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
      <HourDropdown onHourChange={onHourChange} initialValue={initialHourValue} />
    </div>
  );
};

export default DateTimeInput;
