import { useEffect, useMemo, useState } from "react";
import styles from "./style.module.css";
import EventInfo from "../EventInfo/index.js";
import Calendar from "../Calendar/index.js";
import { CalendarContext, CalendarContextType } from "../../hooks/context.js";
import { EventResponse } from "../../models/EventResponse.js";
import { GetAllEvents } from "../../services/EventService.js";
import { getCurrentDate, isEqualDates } from "../../util/DateUtil.js";
import { DateType } from "../../common/types.js";

const CalendarView = () => {
  const [eventList, setEventList] = useState<EventResponse[]>([]);
  const [currentDate, setCurrentDate] = useState<DateType>(getCurrentDate());

  const [isFullSizeCalendar, setIsFullSizeCalendar] = useState<boolean>(false);

  
  useEffect(() => {
    GetAllEvents()
      .then((events) => setEventList(events))
      .catch();
      console.warn(currentDate)
  }, []);

  const getEventForGivenDate = (date: DateType): EventResponse[] => {
    return eventList.filter((e: EventResponse) =>
      e.occurrences.some((eventDate: DateType) => isEqualDates(eventDate, date))
    );
  };
  
  const eventsByDate = useMemo(() => getEventForGivenDate(currentDate), [currentDate]);
  
  const valueOfContext: CalendarContextType = {
    date: currentDate,
    setCurrentDate: setCurrentDate,
    events: eventList,
    setEvents: setEventList,
  };

  return (
    <div className={`${styles.calendarViewDiv}`}>
      <CalendarContext.Provider value={valueOfContext}>
        <Calendar
          isFullSizeCalendar={isFullSizeCalendar}
          setIsFullSizeCalendar={setIsFullSizeCalendar}
        />
        <div
          className={`${styles.eventInfoDiv} ${isFullSizeCalendar ? styles.hideEventInfoDiv : styles.showEventInfoDiv}`}
        >
          <EventInfo
            events={eventsByDate}
            date={currentDate}
          />
        </div>
      </CalendarContext.Provider>
    </div>
  );
};

export default CalendarView;
