import styles from "./style.module.css";
import DraggableDiv from "../DraggableDiv";
import { useAuth } from "../../hooks/AuthProvider";
import { useEffect, useState } from "react";
import { fetchApi } from "../../util/fetchApi";
import { convertTo12HourFormat } from "../../util/timeUtil";

const Dashboard = () => {
  const [dailyEvents, setDailyEvents] = useState([]);
  const [weeklyEvents, setWeeklyEvents] = useState([]);
  const [monthyEvents, setMonthlyEvents] = useState([]);
  const [sharedCalendars, setSharedCalendars] = useState([]);
  const [organizedEvents, setOrganizedEvents] = useState([]);
  const [proposedEvents, setProposedEvents] = useState([]);

  const auth = useAuth();

  useEffect(() => {
    fetchApi(`/api/users/${auth.user.id}/events/daily`, auth.user.token).then(
      (res) => setDailyEvents(res.data),
    );
    fetchApi(`/api/users/${auth.user.id}/events/weekly`, auth.user.token).then(
      (res) => setWeeklyEvents(res.data),
    );
    fetchApi(`/api/users/${auth.user.id}/events/monthly`, auth.user.token).then(
      (res) => setMonthlyEvents(res.data),
    );
    fetchApi(`/api/sharedCalendars`, auth.user.token).then((res) =>
      setSharedCalendars(res.data),
    );
    fetchApi(
      `/api/users/${auth.user.id}/events/organizer-events`,
      auth.user.token,
    ).then((res) => setOrganizedEvents(res.data));
    fetchApi(
      `/api/users/${auth.user.id}/events/proposed`,
      auth.user.token,
    ).then((res) => setProposedEvents(res.data));
  }, []);

  let dailyEventsJSX = dailyEvents.map((event, index) => {
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

  let weeklyEventsJSX = weeklyEvents.map((event, index) => {
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

  let monthlyEventsJSX = monthyEvents.map((event, index) => {
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

  let sharedCalendarJSX = sharedCalendars.map((sharedCalendar, index) => {
    return (
      <div key={index} className={`${styles.notificationDivContent}`}>
        {sharedCalendar.user}
        <br />
        {sharedCalendar.fromDate} {sharedCalendar.toDate}
      </div>
    );
  });

  let organizedEventsJSX = organizedEvents.map((event, index) => {
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

  let proposedEventsJSX = proposedEvents.map((event, index) => {
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
        key={4}
        title={"Organizers Events"}
        bodyOfDiv={organizedEventsJSX}
        orderClass={"order-5"}
      />
      <DraggableDiv
        key={4}
        title={"Proposed Events"}
        bodyOfDiv={proposedEventsJSX}
        orderClass={"order-6"}
      />
    </div>
  );
};

export default Dashboard;
