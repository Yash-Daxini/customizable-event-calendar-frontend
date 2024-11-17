import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import PopoverComponent from "../PopoverComponent";
import EventPopOverBody from "../EventPopOverBody";
import { useContext } from "react";
import { formatDate } from "../../util/dateUtil";
import { CalendarContext } from "../../hooks/context";

interface CalendarDayProps {
  isEmptyDay: boolean,
  day: number,
  column: number,
  updateEventStateOnDelete: any
}

const CalendarDay: React.FC<CalendarDayProps> = ({ isEmptyDay, day, column, updateEventStateOnDelete }: CalendarDayProps) => {
  const navigate = useNavigate();

  const { date }: any = useContext(CalendarContext);
  const { setCurrentDate }: any = useContext(CalendarContext);
  const { events }: any = useContext(CalendarContext);

  const currentDate: any = new Date(date);

  if (day) currentDate.setDate(day);

  const eventsByDate = events.filter((e: any) =>
    e.occurrences.includes(formatDate(currentDate)),
  );

  const changeDay = (day: number) => {
    let newDate = new Date(currentDate);
    newDate.setDate(day);
    setCurrentDate(newDate);
    return false;
  };

  const handleDoubleClick = () => {
    navigate("/addEvent", { state: { date: date } });
  };

  const getEventsJSXForGivenDay = () => {
    let placement = column > 3 ? "left" : "right";

    let eventBars = eventsByDate.map((e: any, index: number) => {
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
                eventDate={new Date(currentDate)} key={undefined}              />
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

  const getClassList = () => {
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
