import React, { useEffect, useState } from 'react'
import { deserializeEventResponse, EventResponse } from '../../models/EventResponse'
import { useLocation, useParams } from 'react-router-dom';
import { GetEventById } from '../../services/EventService';
import styles from './style.module.css'
import { Captions, Clock3 } from 'lucide-react';
import DateWrapper from '../../util/DateUtil';
import { convertTo12HourFormat } from '../../util/TimeUtil';

const EventDetail: React.FC = () => {
    const params = useParams();
    const location = useLocation();
    let eventId = params.id;

    const [event, setEvent] = useState<EventResponse>();

    useEffect(() => {
        if (!event && eventId) {
            GetEventById(parseInt(eventId)).then((response) => {
                setEvent(response);
            }).catch((error) => {
                console.error(error);
            });
        }
        else {
            setEvent(deserializeEventResponse(location.state.event))
        }
    }, [])

    const occurrencesDisplayDiv = event?.occurrences.map((occurrence: DateWrapper) => {
        return (
            <div className={`${styles.eventBar}`}>
                <div className={styles.dateInfoTitleDiv}>
                    <div>{occurrence.getDate()}</div>
                    <div>{occurrence.getAbbreviatedMonthName()}
                    </div>
                </div>
                <div className={styles.dateInfoDiv}>
                    <div className={`${styles.dateDiv}`}>
                        <div className={`${styles.weekDayDiv}`}>{occurrence.getShorterWeekDayName()}</div>
                        <div>{occurrence.getDisplayFormat()}</div>
                    </div>
                    <div className={`${styles.duration}`}>{convertTo12HourFormat(event.duration.startHour)} - {convertTo12HourFormat(event.duration.endHour)}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className={styles.eventDetailDiv}>
            <div className={styles.iconedEventDetailDiv}>
                <Captions />
                <div className={styles.title}>{event?.title}</div>
            </div>
            <div className={styles.iconedEventDetailDiv}>
                <Clock3 />
                <div className={styles.subTitle}>
                    All instances
                </div>
            </div>
            <div>
                {occurrencesDisplayDiv}
            </div>
        </div>
    )
}

export default EventDetail