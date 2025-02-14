import React, { useContext } from "react";
import DateWrapper from "../../util/DateUtil.js";
import CalendarDay from "../CalendarDay/index.js";
import styles from "./style.module.css";
import { CalendarContext, CalendarContextType } from "../../hooks/context.js";
import { Expand, Shrink } from 'lucide-react';
interface CalendarProps {
  isFullSizeCalendar: boolean,
  setIsFullSizeCalendar: React.Dispatch<React.SetStateAction<boolean>>
}

const Calendar: React.FC<CalendarProps> = ({ isFullSizeCalendar, setIsFullSizeCalendar }: CalendarProps) => {
  const calendarContext: CalendarContextType | null = useContext(CalendarContext);

  if (!calendarContext)
    return;

  const date: DateWrapper = calendarContext.date;
  const setCurrentDate: (date: DateWrapper) => void = calendarContext.setCurrentDate;

  const renderCalendar = (): any => {
    const firstDay = date.getFirstDayOfMonth();

    const daysInMonth = date.getDaysInMonth();

    const days: any = [];

    let column: number = 0;

    for (let i = 0; i < firstDay; i++) {
      days.push(
      <CalendarDay 
        key={`${i}empty`} 
        isEmptyDay={true} 
        day={0} 
        column={0}  />);
      column++;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <CalendarDay
          key={day}
          column={column}
          isEmptyDay={false}
          day={day}
        />,
      );
      column = (column + 1) % 7;
    }

    return days;
  };

  const prevMonth = (): void => {
    setCurrentDate(date.decrementMonth());
  };

  const nextMonth = (): void => {
    setCurrentDate(date.incrementMonth());
  };

  return (
    <div
      className={`${styles.calendar} ${isFullSizeCalendar ? styles.width100Percent : styles.width80Percent}`}
    >
      <div className={`${styles.calendarHeader}`}>
        <div
          className={`${styles.todayBtn}`}
          onClick={() => {
            setCurrentDate(DateWrapper.now());
          }}
        >
          Today
        </div>
        <div className={`${styles.prev}`} onClick={prevMonth}>
          &#10094;
        </div>
        <div className={`${styles.next}`} onClick={nextMonth}>
          &#10095;
        </div>
        <div
        >{`${date.getFullMonthName()} ${date.getFourDigitYear()}`}</div>
        <input
          type="date"
          id={`${styles.date}`}
          value={date.formatDate()}
          required
          onChange={(e) => setCurrentDate(new DateWrapper(e.target.value))}
        />
      </div>
      <div className={`${styles.weekdays}`}>
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className={`${styles.days}`}>{renderCalendar()}</div>
      <div
        className={`${styles.calendarFooter}`}
        onClick={() => setIsFullSizeCalendar(!isFullSizeCalendar)}
      >
        {isFullSizeCalendar ?
          <Shrink />
          :
          <Expand />
        }
      </div>
    </div>
  );
};

export default Calendar;
