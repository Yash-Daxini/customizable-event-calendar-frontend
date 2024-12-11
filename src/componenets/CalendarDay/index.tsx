import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import PopoverComponent from "../PopoverComponent";
import EventPopOverBody from "../EventPopOverBody";
import { useContext } from "react";
import { CalendarContext, CalendarContextType } from "../../hooks/context";
import { ADD_EVENT_URL } from "../../constants/RouteConstants";
import { EventResponse } from "../../models/EventResponse";

interface CalendarDayProps {
  isEmptyDay: boolean,
  day: number,
  column: number,
  updateEventStateOnDelete: any
}

const CalendarDay: React.FC<CalendarDayProps> = ({ isEmptyDay, day, column, updateEventStateOnDelete }: CalendarDayProps) => {
  const navigate = useNavigate();

  const calendarContext: CalendarContextType | null = useContext(CalendarContext);

  if (!calendarContext)
    return;

  const events: EventResponse[] = calendarContext.events;
  const date: Date = calendarContext.date;
  const setCurrentDate: (date: Date) => void = calendarContext.setCurrentDate;

  const currentDate: Date = date;

  if (day) currentDate.setDate(day);

  const eventsByDate = events.filter((e: EventResponse) =>
    e.occurrences.includes(currentDate));

  const changeDay = (day: number): void => {
    let newDate = new Date(currentDate);
    newDate.setDate(day);
    setCurrentDate(newDate);
  };

  const handleDoubleClick = (): void => {
    navigate(ADD_EVENT_URL, { state: { date: date } });
  };

  const getEventsJSXForGivenDay = (): any => {
    let placement: string = column > 3 ? "left" : "right";

    const eventBars: any = eventsByDate.map((e: any, index: number) => {
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
                eventDate={new Date(currentDate)} key={undefined} />
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

  const getClassList = (): string => {
    if (
      day == new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      day == currentDate.getDate()
    )
      return `${styles.day} ${styles.today} ${styles.selected}`;
    else if (
      day == new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth()
    )
      return `${styles.day} ${styles.today}`;
    else if (day == date.getDate()) return `${styles.day} ${styles.selected}`;
    else return `${styles.day}`;
  };

  return isEmptyDay ? (
    <div className={`${styles.day} ${styles.empty}`} key={`empty-${day}`}></div>
  ) : (
    <div
      className={getClassList()}
      key={day}
      onClick={() => changeDay(day)}
      onDoubleClick={handleDoubleClick}
    >
      <span>{day}</span>
      {getEventsJSXForGivenDay()}
    </div>
  );
};

export default CalendarDay;
