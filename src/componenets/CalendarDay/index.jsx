import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import PopoverComponent from "../PopoverComponent";
import EventPopOverBody from "../EventPopOverBody";
import { useContext } from "react";
import { formatDate } from "../../util/dateUtil";
import { CalendarContext } from "../../hooks/context";

const CalendarDay = ({ isEmptyDay, day, column, updateEventStateOnDelete }) => {
  const navigate = useNavigate();

  const { date } = useContext(CalendarContext);
  const { setCurrentDate } = useContext(CalendarContext);
  const { events } = useContext(CalendarContext);

  const currentDate = new Date(date);

  if (day) currentDate.setDate(day);

  const eventsByDate = events.filter((e) =>
    e.occurrences.includes(formatDate(currentDate)),
  );

  const changeDay = (day) => {
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

    let eventBars = eventsByDate.map((e, index) => {
      if (index > 2) return;

      if (index < 2 || (index == 2 && eventsByDate.length == 3))
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
                eventDate={new Date(currentDate)}
              />
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
