import React from 'react'
import styles from './style.module.css';
import { getMonthName } from '../../util/DateUtil';
import { convertTo12HourFormat } from '../../util/TimeUtil';

interface EventInfoProps {
    events: any[],
    date: Date
}

const EventInfo: React.FC<EventInfoProps> = ({ events, date }: EventInfoProps) => {

    let getEventsJSXForGivenDay = events.map((e) => {
        return <div key={e.id} className={`${styles.eventBar}`}>
            <div>
                <div className={`${styles.title}`}>{e.title}</div>
                <div className={`${styles.duration}`}>{convertTo12HourFormat(e.duration.startHour)} - {convertTo12HourFormat(e.duration.endHour)}</div>
            </div>
        </div>
    });

    return (
        <>
            <div className={`${styles.dateInfo}`} >
                <span>{date.toLocaleDateString('en-US', { weekday: 'long' })},
                    &nbsp;{getMonthName(date)} {date.getDate()}</span>
            </div>
            <hr />
            <div className={`${styles.eventInfo}`}>
                {getEventsJSXForGivenDay}
            </div>
        </>
    )
}

export default EventInfo