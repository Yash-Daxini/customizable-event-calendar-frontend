import React from "react";
import styles from "./style.module.css";
import HourDropdown from "../HourDropdown";
import DateInput from "../DateInput";
import { DateType } from "../../common/types";

interface DateTimeInputProps {
  onDateChange: React.Dispatch<React.SetStateAction<any>>,
  onHourChange: React.Dispatch<React.SetStateAction<any>>,
  isDateDisable: boolean,
  initialDateValue: DateType,
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
