import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useAuth } from "../../hooks/AuthProvider.js";
import EventInfo from "../EventInfo/index.js";
import { formatDate } from "../../util/dateUtil.js";
import Calendar from "../Calendar/index.js";
import { CalendarContext, CalendarContextType } from "../../hooks/context.js";
import { ToastContainer } from 'react-toastify';
import { EventResponse } from "../../models/EventResponse.js";
import { APIService } from "../../services/APIService.js";

const CalendarView = () => {
  const [eventList, setEventList] = useState<EventResponse[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [isFullSizeCalendar, setIsFullSizeCalendar] = useState<boolean>(false);

  const auth = useAuth();

  useEffect(() => {
    APIService.get<EventResponse[]>(`/users/${auth!.user.id}/events`)
      .then((res) => {
        setEventList(res.data);
      })
      .catch();
  }, []);

  const getEventForGivenDate = (date: Date): EventResponse[] => {
    return eventList.filter((e: any) => e.occurrences.includes(formatDate(date.toString())));
  };

  const valueOfContext:CalendarContextType = {
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
