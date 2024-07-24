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

    const auth = useAuth();

    useEffect(() => {
        fetchApi(`/api/users/${auth.user.id}/events/daily`, auth.user.token)
            .then(res => setDailyEvents(res.data));
        fetchApi(`/api/users/${auth.user.id}/events/weekly`, auth.user.token)
            .then(res => setWeeklyEvents(res.data));
        fetchApi(`/api/users/${auth.user.id}/events/monthly`, auth.user.token)
            .then(res => setMonthlyEvents(res.data));
    }, [])

    let dailyEventsJSX = dailyEvents.map((event) => {
        return (
            <div className={`${styles.notificationDivContent}`}>
                <div>
                    {event.title}
                </div>
                <div>
                    {convertTo12HourFormat(event.duration.startHour)}-{convertTo12HourFormat(event.duration.endHour)}
                </div>
            </div>
        )
    })

    let weeklyEventsJSX = weeklyEvents.map((event) => {
        return (
            <div className={`${styles.notificationDivContent}`}>
                <div>
                    {event.title}
                </div>
                <div>
                    {convertTo12HourFormat(event.duration.startHour)}-{convertTo12HourFormat(event.duration.endHour)}
                </div>
            </div>
        )
    })

    let monthlyEventsJSX = monthyEvents.map((event) => {
        return (
            <div className={`${styles.notificationDivContent}`}>
                <div>
                    {event.title}
                </div>
                <div>
                    {convertTo12HourFormat(event.duration.startHour)}-{convertTo12HourFormat(event.duration.endHour)}
                </div>
            </div>
        )
    })


    return (
        <div className={`${styles.dashboardDiv}`}>
            <DraggableDiv title={`Daily Events`} bodyOfDiv={dailyEventsJSX} />
            <DraggableDiv title={"Weekly Events"} bodyOfDiv={weeklyEventsJSX} />
            <DraggableDiv title={"Monthly Events"} bodyOfDiv={monthlyEventsJSX} />
            <DraggableDiv title={"Shared Calendars"} bodyOfDiv={<>No items availabel</>} />
        </div>
    )
}

export default Dashboard