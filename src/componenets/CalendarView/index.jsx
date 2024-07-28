import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useAuth } from "../../hooks/AuthProvider";
import EventInfo from "../EventInfo";
import { fetchApi } from "../../util/fetchApi.js";
import { formatDate } from "../../util/dateUtil.js";
import Calendar from "../Calendar/index.jsx";
import { CalendarContext } from "../../hooks/context.jsx";

const CalendarView = () => {
  const [eventList, setEventList] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [isFullSizeCalendar, setIsFullSizeCalendar] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    fetchApi(`/api/users/${auth.user.id}/events`, auth.user.token)
      .then((res) => {
        setEventList(res.data);
      })
      .catch();
  }, []);

  const getEventForGivenDate = (date) => {
    return eventList.filter((e) => e.occurrences.includes(formatDate(date)));
  };

  const valueOfContext = {
    date: currentDate,
    setCurrentDate: setCurrentDate,
    events: eventList,
    setEvents: setEventList,
  };

  return (
    <div className={`${styles.calendarViewDiv}`}>
      <CalendarContext.Provider value={valueOfContext}>
        <Calendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          isFullSizeCalendar={isFullSizeCalendar}
          setIsFullSizeCalendar={setIsFullSizeCalendar}
          events={eventList}
        />
        <div
          className={`${styles.eventInfoDiv} ${isFullSizeCalendar ? styles.hideEventInfoDiv : styles.showEventInfoDiv}`}
        >
          <EventInfo
            events={getEventForGivenDate(currentDate)}
            date={currentDate}
          />
        </div>
      </CalendarContext.Provider>
    </div>
  );
};

export default CalendarView;
