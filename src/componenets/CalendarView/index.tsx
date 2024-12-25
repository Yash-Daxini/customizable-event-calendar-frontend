import { useEffect, useState } from "react";
import styles from "./style.module.css";
import EventInfo from "../EventInfo/index.js";
import Calendar from "../Calendar/index.js";
import { CalendarContext, CalendarContextType } from "../../hooks/context.js";
import { ToastContainer } from 'react-toastify';
import { EventResponse } from "../../models/EventResponse.js";
import { GetAllEvents } from "../../services/EventService.js";

const CalendarView = () => {
  const [eventList, setEventList] = useState<EventResponse[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [isFullSizeCalendar, setIsFullSizeCalendar] = useState<boolean>(false);

  useEffect(() => {
    GetAllEvents()
      .then((events) => setEventList(events))
      .catch();
  }, []);

  const getEventForGivenDate = (date: Date): EventResponse[] => {
    return eventList.filter((e: EventResponse) => e.occurrences.includes(date));
  };

  const valueOfContext: CalendarContextType = {
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
