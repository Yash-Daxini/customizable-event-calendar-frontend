import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { useAuth } from '../../hooks/AuthProvider';
import EventInfo from '../EventInfo';
import { useNavigate } from 'react-router-dom';

const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CalendarView = () => {
    const [eventList, setEventList] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isFullSizeCalendar, setIsFullSizeCalendar] = useState(false);

    const auth = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://localhost:7149/api/users/${auth.user.id}/events`, {
            headers: {
                'Authorization': `Bearer ${auth.user.token}`,
            }
        })
            .then((res) => res.json()
            )
            .then((data) => {
                setEventList(data)
            })
            .catch((err) => console.warn(err));
    }, [])

    let formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    let getEventsJSXForGivenDay = (day) => {

        let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

        let eventForSpecificDate = getEventForGivenDate(date);

        let eventsForGivenDate = eventForSpecificDate.map((e, index) => {

            if (index < 2)
                return <div key={e.id} className={`${styles.eventBar}`}>{e.title}</div>
            else if (index == 2 && eventForSpecificDate.length == 3)
                return <div key={e.id} className={`${styles.eventBar}`}>{e.title}</div>
            else if (index == 2)
                return <div key={e.id} className={`${styles.eventCountBar}`}>+{eventForSpecificDate.length - 2}</div>
            else
                return;
        })

        return eventsForGivenDate;

    }

    const getEventForGivenDate = (date) => {
        return eventList.filter((e) => e.occurrences.includes(formatDate(date)));
    }

    const changeDay = (day) => {
        let newDate = new Date(currentDate);
        newDate.setDate(day);
        setCurrentDate(newDate);
        return false;
    }

    const handleDoubleClick = () => {
        navigate("/addEvent", { state: { date: currentDate } });
    }

    const renderCalendar = () => {
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(<div className={`${styles.day} ${styles.empty}`} key={`empty-${i}`}></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {

            let events = getEventsJSXForGivenDay(day);

            let todaysDate = new Date();

            if (day === todaysDate.getDate() && currentDate.getMonth() === todaysDate.getMonth() && currentDate.getFullYear() == todaysDate.getFullYear())
                days.push(<div className={`${styles.day} ${styles.today}`} key={day} onClick={() => changeDay(day)} onDoubleClick={handleDoubleClick}><span>{day}</span>{events}</div>);
            else if (day == currentDate.getDate())
                days.push(<div className={`${styles.day} ${styles.selected}`} key={day} onClick={() => changeDay(day)} onDoubleClick={handleDoubleClick}><span>{day}</span>{events}</div>);
            else
                days.push(<div className={`${styles.day}`} key={day} onClick={() => changeDay(day)} onDoubleClick={handleDoubleClick}><span>{day}</span >{events}</div >);
        }

        return days;
    };

    const prevMonth = () => {
        let newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const nextMonth = () => {
        let newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    return (
        <div className={`${styles.calendarViewDiv}`}>
            <div className={`${styles.calendar} ${isFullSizeCalendar ? styles.width100Percent : styles.width80Percent}`}>
                <div className={`${styles.month}`}>
                    <div className={`${styles.todayBtn}`} onClick={() => {
                        setCurrentDate(new Date())
                    }}>Today</div>
                    <div className={`${styles.prev}`} onClick={prevMonth}>&#10094;</div>
                    <div className={`${styles.next}`} onClick={nextMonth}>&#10095;</div>
                    <div className={`${styles.month - name}`}>{`${monthNames[currentDate.getMonth() + 1]} ${currentDate.getFullYear()}`}</div>
                    <input type="date" id={`${styles.date}`} value={currentDate.toISOString().split("T")[0]} required onChange={(e) => setCurrentDate(new Date(e.target.value))} />
                </div>
                <div className={`${styles.weekdays}`}>
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                <div className={`${styles.days}`}>
                    {renderCalendar()}
                </div>
                <div className={`${styles.calendarFooter}`} onClick={() => setIsFullSizeCalendar(!isFullSizeCalendar)}>
                    <ion-icon name="expand-outline"></ion-icon>
                </div>
            </div>
            <div className={`${styles.eventInfoDiv} ${isFullSizeCalendar ? styles.hideEventInfoDiv : styles.showEventInfoDiv}`}>
                <EventInfo events={getEventForGivenDate(currentDate)} date={currentDate} />
            </div>
        </div>
    )
}

export default CalendarView
