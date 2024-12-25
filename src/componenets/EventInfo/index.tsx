import React from 'react'
import styles from './style.module.css';
import { getLongerDayName, getMonthName } from '../../util/DateUtil';
import { convertTo12HourFormat } from '../../util/TimeUtil';
import { EventResponse } from '../../models/EventResponse';

interface EventInfoProps {
    events: EventResponse[],
    date: Date
}

const EventInfo: React.FC<EventInfoProps> = ({ events, date }: EventInfoProps) => {
    let getEventsJSXForGivenDay = events.map((e: EventResponse) => {
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
                <span>{getLongerDayName(date)},
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