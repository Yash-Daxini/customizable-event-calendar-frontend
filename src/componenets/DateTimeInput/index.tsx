import React from "react";
import styles from "./style.module.css";
import HourDropdown from "../HourDropdown";
import DateInput from "../DateInput";

interface DateTimeInputProps {
  onDateChange: any,
  onHourChange: any,
  isDateDisable: any,
  initialDateValue: any,
  initialHourValue: any
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
        onChange={onDateChange}
        isDateDisable={isDateDisable}
        initialValue={initialDateValue}
      />
      <HourDropdown onChange={onHourChange} initialValue={initialHourValue} />
    </div>
  );
};

export default DateTimeInput;
