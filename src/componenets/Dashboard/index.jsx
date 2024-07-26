import styles from './style.module.css'
import DraggableDiv from '../DraggableDiv';
import { useAuth } from '../../hooks/AuthProvider';
import { useEffect, useState } from 'react';
import { fetchApi } from '../../util/fetchApi'
import { convertTo12HourFormat } from '../../util/timeUtil';

const Dashboard = () => {

    const [dailyEvents, setDailyEvents] = useState([]);
    const [weeklyEvents, setWeeklyEvents] = useState([]);
    const [monthyEvents, setMonthlyEvents] = useState([]);
    const [sharedCalendars, setSharedCalendars] = useState([]);

    const auth = useAuth();

    useEffect(() => {
        fetchApi(`/api/users/${auth.user.id}/events/daily`, auth.user.token)
            .then(res => setDailyEvents(res.data));
        fetchApi(`/api/users/${auth.user.id}/events/weekly`, auth.user.token)
            .then(res => setWeeklyEvents(res.data));
        fetchApi(`/api/users/${auth.user.id}/events/monthly`, auth.user.token)
            .then(res => setMonthlyEvents(res.data));
        fetchApi(`/api/sharedCalendars`, auth.user.token)
            .then(res => setSharedCalendars(res.data));
    }, [])

    let dailyEventsJSX = dailyEvents.map((event, index) => {
        return (
            <div key={index} className={`${styles.notificationDivContent}`}>
                <div>
                    {event.title}
                </div>
                <div>
                    {convertTo12HourFormat(event.duration.startHour)}-{convertTo12HourFormat(event.duration.endHour)}
                </div>
            </div>
        )
    })

    let weeklyEventsJSX = weeklyEvents.map((event, index) => {
        return (
            <div key={index} className={`${styles.notificationDivContent}`}>
                <div>
                    {event.title}
                </div>
                <div>
                    {convertTo12HourFormat(event.duration.startHour)}-{convertTo12HourFormat(event.duration.endHour)}
                </div>
            </div>
        )
    })

    let monthlyEventsJSX = monthyEvents.map((event, index) => {
        return (
            <div key={index} className={`${styles.notificationDivContent}`}>
                <div>
                    {event.title}
                </div>
                <div>
                    {convertTo12HourFormat(event.duration.startHour)}-{convertTo12HourFormat(event.duration.endHour)}
                </div>
            </div>
        )
    })

    let sharedCalendarJSX = sharedCalendars.map((sharedCalendar, index) => {
        return (
            <div key={index} className={`${styles.notificationDivContent}`}>
                {sharedCalendar.user}
                <br />
                {sharedCalendar.fromDate} {sharedCalendar.toDate}
            </div>
        )
    })

    return (
        <div className={`${styles.dashboardDiv} container`}>
            <DraggableDiv key={1} title={`Daily Events`} bodyOfDiv={dailyEventsJSX} orderClass={"order-1"} />
            <DraggableDiv key={2} title={"Weekly Events"} bodyOfDiv={weeklyEventsJSX} orderClass={"order-2"} />
            <DraggableDiv key={3} title={"Monthly Events"} bodyOfDiv={monthlyEventsJSX} orderClass={"order-3"} />
            <DraggableDiv key={4} title={"Shared Calendars"} bodyOfDiv={sharedCalendarJSX} orderClass={"order-4"} />
        </div>
    )
}

export default Dashboard