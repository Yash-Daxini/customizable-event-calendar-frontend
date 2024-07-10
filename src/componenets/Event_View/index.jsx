import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
const env = import.meta.env;

const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const EventView = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(env.VITE_GET_EVENT_API, {
            headers: {
                'Authorization': `Bearer ${env.VITE_Authentication_Token}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setEvents(data)
            })
            .catch((err) => console.warn(err));
    }, [])

    let eventsInHtml = events.map((event) => {
        return (
            <div key={event.id}>
                {event.title}
            </div>
        )
    })

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const renderCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(<div className={`${styles.day} ${styles.empty}`} key={`empty-${i}`}></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(<div className={`${styles.day}`} key={day}>{day}</div>);
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
            <div className={`${styles.calendar}`}>
                <div className={`${styles.month}`}>
                    <div className={`${styles.prev}`} onClick={prevMonth}>&#10094;</div>
                    <div className={`${styles.month - name}`}>{`${monthNames[currentMonth]} ${currentYear}`}</div>
                    <div className={`${styles.next}`} onClick={nextMonth}>&#10095;</div>
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
            </div>
            <div className={`${styles.eventInfoDiv}`}>
                
            </div>
        </div>
    )
}

export default EventView
