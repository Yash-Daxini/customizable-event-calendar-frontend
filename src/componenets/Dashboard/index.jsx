import styles from "./style.module.css";
import DraggableDiv from "../DraggableDiv";
import { useAuth } from "../../hooks/AuthProvider";
import { useEffect, useState } from "react";
import { fetchApi } from "../../util/fetchApi";
import { convertTo12HourFormat } from "../../util/timeUtil";
import { ToastContainer } from "react-toastify";
import { showErrorToaster } from "../../util/toaster";

const Dashboard = () => {
  const [dailyEvents, setDailyEvents] = useState([]);
  const [weeklyEvents, setWeeklyEvents] = useState([]);
  const [monthyEvents, setMonthlyEvents] = useState([]);
  const [sharedCalendars, setSharedCalendars] = useState([]);
  const [organizedEvents, setOrganizedEvents] = useState([]);
  const [proposedEvents, setProposedEvents] = useState([]);

  const auth = useAuth();

  const handleTokenExpiration = () => auth.logOut();

  const handleServerError = () => showErrorToaster("Can't connect to server!");

  useEffect(() => {
    fetchApi(`/api/users/${auth.user.id}/events/daily`, auth.user.token)
      .then((res) => {
        if (res.status === 401) handleTokenExpiration();
        setDailyEvents(res.data);
      })
      .catch(() => handleServerError());
    fetchApi(`/api/users/${auth.user.id}/events/weekly`, auth.user.token)
      .then((res) => {
        if (res.status === 401) handleTokenExpiration();
        setWeeklyEvents(res.data);
      })
      .catch(() => handleServerError());
    fetchApi(`/api/users/${auth.user.id}/events/monthly`, auth.user.token)
      .then((res) => {
        if (res.status === 401) handleTokenExpiration();
        setMonthlyEvents(res.data);
      })
      .catch(() => handleServerError());
    fetchApi(`/api/sharedCalendars`, auth.user.token)
      .then((res) => {
        if (res.status === 401) handleTokenExpiration();
        setSharedCalendars(res.data);
      })
      .catch(() => handleServerError());
    fetchApi(
      `/api/users/${auth.user.id}/events/organizer-events`,
      auth.user.token,
    )
      .then((res) => {
        if (res.status === 401) handleTokenExpiration();
        setOrganizedEvents(res.data);
      })
      .catch(() => handleServerError());
    fetchApi(`/api/users/${auth.user.id}/events/proposed`, auth.user.token)
      .then((res) => {
        if (res.status === 401) handleTokenExpiration();
        setProposedEvents(res.data);
      })
      .catch(() => handleServerError());
  }, [auth.user]);

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
    <>
      <ToastContainer />
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
