import React, { useContext } from "react";
import { decrementMonth, formatDateDayJS, getCurrentDate, getDaysInMonth, getFirstDayOfMonth, getFourDigitYear, getFullMonthName, incrementMonth, parseDate } from "../../util/DateUtil.js";
import CalendarDay from "../CalendarDay/index.js";
import styles from "./style.module.css";
import { CalendarContext, CalendarContextType } from "../../hooks/context.js";
import { Expand, Shrink } from 'lucide-react';
import { EventResponse } from "../../models/EventResponse.js";
import { DateType } from "../../common/types.js";

interface CalendarProps {
  isFullSizeCalendar: boolean,
  setIsFullSizeCalendar: React.Dispatch<React.SetStateAction<boolean>>
}

const Calendar: React.FC<CalendarProps> = ({ isFullSizeCalendar, setIsFullSizeCalendar }: CalendarProps) => {
  const calendarContext: CalendarContextType | null = useContext(CalendarContext);

  if (!calendarContext)
    return;

  const events: EventResponse[] = calendarContext.events;
  const date: DateType = calendarContext.date;
  const setCurrentDate: (date: DateType) => void = calendarContext.setCurrentDate;
  const setEvents: (event: EventResponse[]) => void = calendarContext.setEvents;

  const currentDate: DateType = date;

  const updateEventStateOnDelete = (eventId: number): void => {
    setEvents(events.filter((eventObj: EventResponse) => eventObj.id !== eventId));
  };

  const renderCalendar = (): any => {
    const firstDay = getFirstDayOfMonth(currentDate);

    const daysInMonth = getDaysInMonth(currentDate);

    const days: any = [];

    let column: number = 0;

    for (let i = 0; i < firstDay; i++) {
      days.push(<CalendarDay key={`${i}empty`} isEmptyDay={true} day={0} column={0} updateEventStateOnDelete={updateEventStateOnDelete} />);
      column++;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <CalendarDay
          key={day}
          column={column}
          isEmptyDay={false}
          day={day}
          updateEventStateOnDelete={updateEventStateOnDelete}
        />,
      );
      column = (column + 1) % 7;
    }

    return days;
  };

  const prevMonth = (): void => {
    setCurrentDate(decrementMonth(currentDate));
  };

  const nextMonth = (): void => {
    setCurrentDate(incrementMonth(currentDate));
  };

  return (
    <div
      className={`${styles.calendar} ${isFullSizeCalendar ? styles.width100Percent : styles.width80Percent}`}
    >
      <div className={`${styles.calendarHeader}`}>
        <div
          className={`${styles.todayBtn}`}
          onClick={() => {
            setCurrentDate(getCurrentDate());
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
        >{`${getFullMonthName(currentDate)} ${getFourDigitYear(currentDate)}`}</div>
        <input
          type="date"
          id={`${styles.date}`}
          value={formatDateDayJS(currentDate)}
          required
          onChange={(e) => setCurrentDate(parseDate(e.target.value))}
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
