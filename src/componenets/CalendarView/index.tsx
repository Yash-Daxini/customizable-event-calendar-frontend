import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useAuth } from "../../hooks/AuthProvider.js";
import EventInfo from "../EventInfo/index.js";
import { fetchApi } from "../../util/fetchApi.js";
import { formatDate } from "../../util/dateUtil.js";
import Calendar from "../Calendar/index.js";
import { CalendarContext } from "../../hooks/context.js";
import { ToastContainer } from 'react-toastify';

const CalendarView = () => {
  const [eventList, setEventList] = useState([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [isFullSizeCalendar, setIsFullSizeCalendar] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    fetchApi(`/api/users/${auth!.user.id}/events`, auth!.user.token)
      .then((res) => {
        setEventList(res.data);
      })
      .catch();
  }, []);

  const getEventForGivenDate = (date: Date) => {
    return eventList.filter((e: any) => e.occurrences.includes(formatDate(date.toString())));
  };

  const valueOfContext = {
    date: currentDate,
    setCurrentDate: setCurrentDate,
    events: eventList,
    setEvents: setEventList,
  };

  return (
    <div className={`${styles.calendarViewDiv}`}>
      <ToastContainer />
      <CalendarContext.Provider value={valueOfContext}>
        <Calendar
          isFullSizeCalendar={isFullSizeCalendar}
          setIsFullSizeCalendar={setIsFullSizeCalendar}
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
