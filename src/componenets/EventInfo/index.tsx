import React from 'react'
import styles from './style.module.css';
import { getDate, getFullMonthName, getWeekDayName } from '../../util/DateUtil';
import { convertTo12HourFormat } from '../../util/TimeUtil';
import { EventResponse } from '../../models/EventResponse';
import { DateType } from '../../common/types';

interface EventInfoProps {
    events: EventResponse[],
    date: DateType
}

const EventInfo: React.FC<EventInfoProps> = ({ events, date }: EventInfoProps) => {
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
                <span>{getWeekDayName(date)},
                    &nbsp;{getFullMonthName(date)} {getDate(date)}</span>
            </div>
            <hr />
            <div className={`${styles.eventInfo}`}>
                {eventsJSXForGivenDay}
            </div>
        </>
    )
}

export default EventInfo