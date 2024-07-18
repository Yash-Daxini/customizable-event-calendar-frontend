import React, { useEffect, useState } from 'react'
import styles from './style.module.css';
import { CalendarArrowUp, Divide } from 'lucide-react';
import { useAuth } from '../../hooks/AuthProvider';

const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const TimelineView = ({ date }) => {

    const [eventList, setEventList] = useState([]);

    let [currentDate, setCurrentDate] = useState(date.date);

    useEffect(() => {
        setCurrentDate(date.date);
    }, [date]);

    const auth = useAuth();

    useEffect(() => {
        fetch(`https://localhost:7149/api/users/${auth.user.id}/events/eventsBetweenDates?startDate=${currentDate.toLocaleDateString()}&endDate=${currentDate.toLocaleDateString()}`, {
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
    }, [currentDate,date])

    const hours = [];

    hours.push({ value: 0, label: `12:00 AM` });

    for (let i = 1; i < 12; i++) {
        const hour = i < 10 ? `0${i}:00 AM` : `${i}:00 AM`;
        hours.push({ value: i, label: hour });
    }

    hours.push({ value: 12, label: `12:00 PM` });

    for (let i = 1; i <= 11; i++) {
        const hour = i < 10 ? `0${i}:00 PM` : `${i}:00 PM`;
        hours.push({ value: parseInt(i + 12), label: hour });
    }

    let timelineDivContent = hours.map((hour) => {
        const event = eventList.find((event) => hour.value >= event.duration.startHour && hour.value < event.duration.endHour);

        return !event
            ?
            (
                <div key={hour.value} className={`${styles.hourDiv}`} >
                    <div className={`${styles.hourValue}`}>{hour.label}</div>
                    <div className={`${styles.colorDiv}`}></div>
                </div >
            )
            :
            (
                <div key={hour.value} className={`${styles.hourDiv}`} >
                    <div className={`${styles.hourValue}`}>{hour.label}</div>
                    <div className={`${styles.colorDiv} ${styles.filled}`}></div>
                </div >
            )

    });

    return (
        <div className={`${styles.timelineDiv}`}>
            <div className={`${styles.header}`}>
                <div className={`${styles.control}`}>
                    <div className={`${styles.prev}`} onClick={() => {
                        const newDate = new Date(currentDate);
                        newDate.setDate(newDate.getDate() - 1);
                        setCurrentDate(newDate);
                    }}
                    >&#10094;</div>
                    <div className={`${styles.todayBtn}`} onClick={() => {
                        setCurrentDate(new Date());
                    }}><CalendarArrowUp /></div>
                    <div className={`${styles.next}`} onClick={() => {
                        const newDate = new Date(currentDate);
                        newDate.setDate(newDate.getDate() - 1);
                        setCurrentDate(newDate);
                    }}>&#10095;</div>
                </div>
                <div className={`${styles.monthName}`}>{`${currentDate.toString().split(' ')[0]}, ${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}</div>
            </div>
            <div className={`${styles.timelineBody}`}>
                {timelineDivContent}
            </div>
        </div>
    )
}

export default TimelineView