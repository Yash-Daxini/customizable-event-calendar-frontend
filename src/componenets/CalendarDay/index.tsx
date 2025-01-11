import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import PopoverComponent from "../PopoverComponent";
import EventPopOverBody from "../EventPopOverBody";
import { useContext, useEffect, useState } from "react";
import { CalendarContext, CalendarContextType } from "../../hooks/context";
import { ADD_EVENT_URL } from "../../constants/RouteConstants";
import { EventResponse } from "../../models/EventResponse";
import { getCurrentDate, getDate, getMonth, isEqualDates, setDay } from "../../util/DateUtil";
import { DateType } from "../../common/types";

interface CalendarDayProps {
  isEmptyDay: boolean,
  day: number,
  column: number,
  updateEventStateOnDelete: (eventId: number) => void
}

const CalendarDay: React.FC<CalendarDayProps> = ({ isEmptyDay, day, column, updateEventStateOnDelete }: CalendarDayProps) => {
  const navigate = useNavigate();

  useEffect(() => {

    console.warn(getDate(getCurrentDate()));
    console.warn(day);

  }, [])


  const calendarContext: CalendarContextType | null = useContext(CalendarContext);

  if (!calendarContext)
    return;

  const events: EventResponse[] = calendarContext.events;
  const contextDate: DateType = calendarContext.date;
  const setCurrentDate: (date: DateType) => void = calendarContext.setCurrentDate;

  const [date, setDate] = useState<DateType>(setDay(contextDate, day));

  const eventsByDate: EventResponse[] = events.filter((e: EventResponse) =>
    e.occurrences.some((eventDate: DateType) => isEqualDates(eventDate, contextDate))
  );

  const changeDay = (): void => {
    setCurrentDate(date);
  };

  const handleDoubleClick = (): void => {
    navigate(ADD_EVENT_URL, { state: { date: date } });
  };

  const getEventsJSXForGivenDay = (): any => {
    let placement: string = column > 3 ? "left" : "right";

    const eventBars: any[] = eventsByDate.map((e: EventResponse, index: number) => {
      if (index > 2 && window.innerWidth > 1000) return;

      if (
        window.innerWidth <= 1000 ||
        index < 2 ||
        (index == 2 && eventsByDate.length == 3)
      )
        return (
          <PopoverComponent
            placement={placement}
            key={e.id}
            displayValue={e.title}
            className={`${styles.eventBar}`}
            body={
              <EventPopOverBody
                onDelete={updateEventStateOnDelete}
                event={e}
                eventDate={date} />
            }
          />
        );
      else
        return (
          <div key={e.id} className={`${styles.eventCountBar}`}>
            +{eventsByDate.length - 2}
          </div>
        );
    });

    return eventBars;
  };

  const isSelectedDay = (): boolean => {
    return day === getDate(getCurrentDate()) &&
      getMonth(date) === getMonth(getCurrentDate()) &&
      day === getDate(date);
  }

  const isNonSelectedDay = (day: number, currentDate: DateType): boolean => {
    return day === getDate(getCurrentDate()) &&
      getMonth(currentDate) === getMonth(getCurrentDate());
  }

  const getClassList = (): string => {
    if (isSelectedDay())
      return `${styles.day} ${styles.today} ${styles.selected}`;
    else if (isNonSelectedDay(day, date))
      return `${styles.day} ${styles.today}`;
    else if (day == getDate(contextDate))
      return `${styles.day} ${styles.selected}`;
    else
      return `${styles.day}`;
  };

  return isEmptyDay ? (
    <div className={`${styles.day} ${styles.empty}`} key={`empty-${day}`}></div>
  ) : (
    <div
      className={getClassList()}
      key={day}
      onClick={() => changeDay()}
      onDoubleClick={handleDoubleClick}
    >
      <span>{day}</span>
      {getEventsJSXForGivenDay()}
    </div>
  );
};

export default CalendarDay;

