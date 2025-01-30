import styles from "./style.module.css";
import DraggableDiv from "../DraggableDiv";
import { useEffect, useState } from "react";
import { convertTo12HourFormat } from "../../util/TimeUtil";
import { EventResponse } from "../../models/EventResponse";
import { SharedCalendar } from "../../models/SharedCalendar";
import { DashboardData } from "../../models/DashboardData";
import { GetDashboardData } from "../../services/DashboardService";

const Dashboard: React.FC = () => {

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    dailyEvents: [],
    weeklyEvents: [],
    monthlyEvents: [],
    organizedEvents: [],
    proposedEvents: [],
    sharedCalendars: []
  });

  useEffect(() => {
    GetDashboardData()
      .then((dashboardData) => setDashboardData(dashboardData));
  }, []);

  const dailyEventsJSX: any = dashboardData.dailyEvents.map((event: EventResponse, index: number) => {
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

  const weeklyEventsJSX: any = dashboardData.weeklyEvents.map((event: EventResponse, index: number) => {
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

  const monthlyEventsJSX: any = dashboardData.monthlyEvents.map((event: EventResponse, index: number) => {
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

  const sharedCalendarJSX: any = dashboardData.sharedCalendars.map((sharedCalendar: SharedCalendar, index: number) => {
    return (
      <div key={index} className={`${styles.notificationDivContent}`}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div>Sender: <strong>{sharedCalendar.sender.email}</strong><br /></div>
          <div>
            From {sharedCalendar.fromDate.toString()}&nbsp;
            to {sharedCalendar.toDate.toString()}
          </div>
        </div>
      </div>
    );
  });

  const organizedEventsJSX: any = dashboardData.organizedEvents.map((event: EventResponse, index: number) => {
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

  const proposedEventsJSX: any = dashboardData.proposedEvents.map((event: EventResponse, index: number) => {
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
