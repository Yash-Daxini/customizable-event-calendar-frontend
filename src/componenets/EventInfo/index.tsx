import React from 'react'
import styles from './style.module.css';
import DateWrapper from '../../util/DateUtil';
import { convertTo12HourFormat } from '../../util/TimeUtil';
import { EventResponse } from '../../models/EventResponse';

interface EventInfoProps {
    events: EventResponse[],
    date: string
}

const EventInfo: React.FC<EventInfoProps> = ({ events, date }: EventInfoProps) => {

    const dateWrapper = new DateWrapper(date);

    let eventsJSXForGivenDay: any = events.map((e: EventResponse) => {
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
                <span>{dateWrapper.getWeekDayName()},
                    &nbsp;{dateWrapper.getFullMonthName()} {dateWrapper.getDate()}</span>
            </div>
            <hr />
            <div className={`${styles.eventInfo}`}>
                {eventsJSXForGivenDay}
            </div>
        </>
    )
}

export default EventInfo