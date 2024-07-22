import React from 'react'
import styles from './style.module.css';
import { Captions, CalendarX, Pencil, Clock3 } from 'lucide-react';

const EventPopOverBody = ({ key, title, eventDate, duration }) => {
    return (
        <div key={key} className={styles.eventPopOverDiv}>
            <div className={styles.titleDiv}><Captions />{title}</div>
            <div className={styles.timeDisplayDiv}>
                <Clock3 />
                <span>{eventDate.toString().split(" ")[0]} {eventDate.toLocaleDateString()} {duration.startHour} - {duration.endHour}</span>
            </div>
            <div className={styles.buttonDiv}>
                <button className={`${styles.actionBtn}`}><span className={`${styles.icon} ${styles.editIcon}`}><Pencil size={15} /></span>Edit</button>
                <button className={`${styles.actionBtn}`}><span className={`${styles.icon} ${styles.deleteIcon}`}><CalendarX size={20} strokeWidth={1} /></span>Delete</button>
            </div>
        </div>
    )
}

export default EventPopOverBody