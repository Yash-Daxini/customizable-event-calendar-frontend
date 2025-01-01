import styles from "./style.module.css";
import DraggableDiv from "../DraggableDiv";
import { useEffect, useState } from "react";
import { convertTo12HourFormat } from "../../util/TimeUtil";
import { showErrorToaster } from "../../util/Toaster";
import { EventResponse } from "../../models/EventResponse";
import { SharedCalendar } from "../../models/SharedCalendar";
import { GetDailyEvents, GetMonthlyEvents, GetOrganizerEvents, GetProposedEvents, GetWeeklyEvents } from "../../services/EventService";
import { GetSharedCalendars } from "../../services/SharedCalendarService";

const Dashboard: React.FC = () => {
  const [dailyEvents, setDailyEvents] = useState<EventResponse[]>([]);
  const [weeklyEvents, setWeeklyEvents] = useState<EventResponse[]>([]);
  const [monthyEvents, setMonthlyEvents] = useState<EventResponse[]>([]);
  const [sharedCalendars, setSharedCalendars] = useState<SharedCalendar[]>([]);
  const [organizedEvents, setOrganizedEvents] = useState<EventResponse[]>([]);
  const [proposedEvents, setProposedEvents] = useState<EventResponse[]>([]);

  const handleServerError = () => showErrorToaster("Can't connect to server!");

  useEffect(() => {
    GetDailyEvents()
      .then((events) => setDailyEvents(events))
      .catch(() => handleServerError());
    GetWeeklyEvents()
      .then((events) => setWeeklyEvents(events))
      .catch(() => handleServerError());
    GetMonthlyEvents()
      .then((events) => setMonthlyEvents(events))
      .catch(() => handleServerError());
    GetSharedCalendars()
      .then((events) => setSharedCalendars(events))
      .catch(() => handleServerError());
    GetOrganizerEvents()
      .then((events) => setOrganizedEvents(events))
      .catch(() => handleServerError());
    GetProposedEvents()
      .then((events) => setProposedEvents(events))
      .catch(() => handleServerError());
  }, []);

  let dailyEventsJSX = dailyEvents.map((event: EventResponse, index: number) => {
    return (
      <div key={index} className={`${styles.notificationDivContent}`}>
        <div className={styles.eventNameDiv}>{event.title}</div>
        <div>{event.occurrences[0].toString()}</div>
        <div className={styles.durationDiv}>
          {convertTo12HourFormat(event.duration.startHour)}-
          {convertTo12HourFormat(event.duration.endHour)}
        </div>
      </div>
    );
  });

  let weeklyEventsJSX = weeklyEvents.map((event: EventResponse, index: number) => {
    return (
      <div key={index} className={`${styles.notificationDivContent}`}>
        <div className={styles.eventNameDiv}>{event.title}</div>
        <div>{event.occurrences[0].toString()}</div>
        <div className={styles.durationDiv}>
          {convertTo12HourFormat(event.duration.startHour)}-
          {convertTo12HourFormat(event.duration.endHour)}
        </div>
      </div>
    );
  });

  let monthlyEventsJSX = monthyEvents.map((event: EventResponse, index: number) => {
    return (
      <div key={index} className={`${styles.notificationDivContent}`}>
        <div className={styles.eventNameDiv}>{event.title}</div>
        <div>{event.occurrences[0].toString()}</div>
        <div className={styles.durationDiv}>
          {convertTo12HourFormat(event.duration.startHour)}-
          {convertTo12HourFormat(event.duration.endHour)}
        </div>
      </div>
    );
  });

  let sharedCalendarJSX = sharedCalendars.map((sharedCalendar: SharedCalendar, index: number) => {
    return (
      <div key={index} className={`${styles.notificationDivContent}`}>
        <br />
        Sent By: {sharedCalendar.sender.email} <br />
        From {sharedCalendar.fromDate.toString()} 
        To {sharedCalendar.toDate.toString()}
      </div>
    );
  });

  let organizedEventsJSX = organizedEvents.map((event: EventResponse, index: number) => {
    return (
      <div key={index} className={`${styles.notificationDivContent}`}>
        <div className={styles.eventNameDiv}>{event.title}</div>
        <div>{event.occurrences[0].toString()}</div>
        <div className={styles.durationDiv}>
          {convertTo12HourFormat(event.duration.startHour)}-
          {convertTo12HourFormat(event.duration.endHour)}
        </div>
      </div>
    );
  });

  let proposedEventsJSX = proposedEvents.map((event: EventResponse, index: number) => {
    return (
      <div key={index} className={`${styles.notificationDivContent}`}>
        <div className={styles.eventNameDiv}>{event.title}</div>
        <div className={styles.durationDiv}>
          {convertTo12HourFormat(event.duration.startHour)}-
          {convertTo12HourFormat(event.duration.endHour)}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className={`${styles.dashboardDiv} container`}>
        <DraggableDiv
          key={1}
          title={`Daily Events`}
          bodyOfDiv={dailyEventsJSX}
          orderClass={"order-1"}
        />
        <DraggableDiv
          key={2}
          title={"Weekly Events"}
          bodyOfDiv={weeklyEventsJSX}
          orderClass={"order-2"}
        />
        <DraggableDiv
          key={3}
          title={"Monthly Events"}
          bodyOfDiv={monthlyEventsJSX}
          orderClass={"order-3"}
        />
        <DraggableDiv
          key={4}
          title={"Shared Calendars"}
          bodyOfDiv={sharedCalendarJSX}
          orderClass={"order-4"}
        />
        <DraggableDiv
          key={5}
          title={"Organizers Events"}
          bodyOfDiv={organizedEventsJSX}
          orderClass={"order-5"}
        />
        <DraggableDiv
          key={6}
          title={"Proposed Events"}
          bodyOfDiv={proposedEventsJSX}
          orderClass={"order-6"}
        />
      </div>
    </>
  );
};

export default Dashboard;
