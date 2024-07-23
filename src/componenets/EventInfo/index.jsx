import React from 'react'
import styles from './style.module.css';
import { getMonthNameFromDate } from '../../util/dateUtil';

const EventInfo = ({ events, date }) => {

    let getEventsJSXForGivenDay = events.map((e) => {
        return <div key={e.id} className={`${styles.eventBar}`}>{e.title}</div>
    });

    return (
        <>
            <div className={`${styles.dateInfo}`} >
                <span>{date.toLocaleDateString('en-US', { weekday: 'long' })},
                    &nbsp;{getMonthNameFromDate(date)} {date.getDate()}</span>
            </div>
            <hr />
            <div className={`${styles.eventInfo}`}>
                {getEventsJSXForGivenDay}
            </div>
        </>
    )
}

export default EventInfo