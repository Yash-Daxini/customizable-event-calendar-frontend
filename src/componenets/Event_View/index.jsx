import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
const env = import.meta.env;

const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const EventView = () => {
    const [eventList, setEventList] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentDay, setCurrentDay] = useState(new Date().getDate());
    const [isFullSizeCalendar, setIsFullSizeCalendar] = useState(false);

    useEffect(() => {
        fetch(env.VITE_GET_EVENT_API, {
            headers: {
                'Authorization': `Bearer ${env.VITE_Authentication_Token}`,
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

    let getEventsForGivenDay = (day) => {

        let date = new Date(currentYear, currentMonth, day);

        let eventForSpecificDate = eventList.filter((e) => e.occurrences.includes(formatDate(date)));

        let eventsForGivenDate = eventForSpecificDate.map((e) => {
            return (
                <div key={e.id} className={`${styles.eventBar}`}>{e.title}</div>
            )
        })

        return eventsForGivenDate;
    }

    const renderCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(<div className={`${styles.day} ${styles.empty}`} key={`empty-${i}`}></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {

            let events = getEventsForGivenDay(day);

            let todaysDate = new Date();

            if (day === todaysDate.getDate() && currentMonth === todaysDate.getMonth() + 1 && currentYear == todaysDate.getFullYear())
                days.push(<div className={`${styles.day} ${styles.today}`} key={day} onClick={() => setCurrentDay(day)}><span>{day}</span>{events}</div>);
            else if(day == currentDay)
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
                <div className={`${styles.dateInfo}`} >
                    <span>{new Date(currentYear, currentMonth, currentDay).toLocaleDateString('en-US', { weekday: 'long' })},
                        &nbsp;{monthNames[currentMonth]} {currentDay}</span>
                </div>
                <hr />
                <div className={`${styles.eventInfo}`}>
                    {getEventsForGivenDay(currentDay)}
                </div>
            </div>
        </div>
    )
}

export default EventView
