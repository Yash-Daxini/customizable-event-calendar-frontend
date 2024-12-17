import { useContext } from "react";
import { formatDate, getMonthName } from "../../util/DateUtil.js";
import CalendarDay from "../CalendarDay/index.js";
import styles from "./style.module.css";
import { CalendarContext, CalendarContextType } from "../../hooks/context.js";
import { Expand, Shrink } from 'lucide-react';
import { EventResponse } from "../../models/EventResponse.js";

interface CalendarProps {
  isFullSizeCalendar: boolean,
  setIsFullSizeCalendar: (input: boolean) => void
}

const Calendar: React.FC<CalendarProps> = ({ isFullSizeCalendar, setIsFullSizeCalendar }: CalendarProps) => {
  const calendarContext: CalendarContextType | null = useContext(CalendarContext);

  if (!calendarContext)
    return;

  const events: EventResponse[] = calendarContext.events;
  const date: Date = calendarContext.date;
  const setCurrentDate: (date: Date) => void = calendarContext.setCurrentDate;
  const setEvents: (event: EventResponse[]) => void = calendarContext.setEvents;

  const currentDate: Date = new Date(date);

  const updateEventStateOnDelete = (eventId: number): void => {
    setEvents(events.filter((eventObj: EventResponse) => eventObj.id !== eventId));
  };

  const renderCalendar = (): any => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();

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
    let newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = (): void => {
    let newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div
      className={`${styles.calendar} ${isFullSizeCalendar ? styles.width100Percent : styles.width80Percent}`}
    >
      <div className={`${styles.calendarHeader}`}>
        <div
          className={`${styles.todayBtn}`}
          onClick={() => {
            setCurrentDate(new Date());
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
        >{`${getMonthName(currentDate)} ${currentDate.getFullYear()}`}</div>
        <input
          type="date"
          id={`${styles.date}`}
          value={formatDate(currentDate)}
          required
          onChange={(e) => setCurrentDate(new Date(e.target.value))}
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
