import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { useAuth } from '../../hooks/AuthProvider';
import EventInfo from '../EventInfo';

const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CalendarView = () => {
    const [eventList, setEventList] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentDay, setCurrentDay] = useState(new Date().getDate());
    const [isFullSizeCalendar, setIsFullSizeCalendar] = useState(false);

    const auth = useAuth();


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
            month = '' + (d.getMonth()),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    let getEventsJSXForGivenDay = (day) => {

        let date = new Date(currentYear, currentMonth, day);

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

    const renderCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(<div className={`${styles.day} ${styles.empty}`} key={`empty-${i}`}></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {

            let events = getEventsJSXForGivenDay(day);

            let todaysDate = new Date();

            if (day === todaysDate.getDate() && currentMonth === todaysDate.getMonth() + 1 && currentYear == todaysDate.getFullYear())
                days.push(<div className={`${styles.day} ${styles.today}`} key={day} onClick={() => setCurrentDay(day)}><span>{day}</span>{events}</div>);
            else if (day == currentDay)
                days.push(<div className={`${styles.day} ${styles.selected}`} key={day} onClick={() => setCurrentDay(day)}><span>{day}</span>{events}</div>);
            else
                days.push(<div className={`${styles.day}`} key={day} onClick={() => setCurrentDay(day)}><span>{day}</span >{events}</div >);
        }

        return days;
    };

    const prevMonth = () => {
        setCurrentMonth(prev => prev === 1 ? 12 : prev - 1);
        if (currentMonth === 0) {
            setCurrentYear(prev => prev - 1);
        }
    };

    const nextMonth = () => {
        setCurrentMonth(prev => prev === 12 ? 1 : prev + 1);
        if (currentMonth === 11) {
            setCurrentYear(prev => prev + 1);
        }
    };

    return (
        <div className={`${styles.calendarViewDiv}`}>
            <div className={`${styles.calendar} ${isFullSizeCalendar ? styles.width100Percent : styles.width80Percent}`}>
                <div className={`${styles.month}`}>
                    <div className={`${styles.todayBtn}`} onClick={() => {
                        setCurrentMonth(new Date().getMonth() + 1);
                        setCurrentYear(new Date().getFullYear());
                        setCurrentDay(new Date().getDate());
                    }}>Today</div>
                    <div className={`${styles.prev}`} onClick={prevMonth}>&#10094;</div>
                    <div className={`${styles.next}`} onClick={nextMonth}>&#10095;</div>
                    <div className={`${styles.month - name}`}>{`${monthNames[currentMonth]} ${currentYear}`}</div>
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
                <EventInfo events={getEventForGivenDate(new Date(currentYear, currentMonth, currentDay))} date={new Date(currentYear, currentMonth, currentDay)} />
            </div>
        </div>
    )
}

export default CalendarView
