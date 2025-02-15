import React, { useEffect, useState } from 'react'
import { deserializeEventResponse, EventResponse } from '../../models/EventResponse'
import { useLocation, useParams } from 'react-router-dom';
import { GetEventById } from '../../services/EventService';
import styles from './style.module.css'
import { Captions, Clock3, ScrollText } from 'lucide-react';
import DateWrapper from '../../util/DateUtil';
import { convertTo12HourFormat } from '../../util/TimeUtil';

const EventDetail: React.FC = () => {
    const params = useParams();
    const location = useLocation();
    let eventId = params.id;
    let eventDate = location.state?.date;

    const [event, setEvent] = useState<EventResponse>();
    const [date, setDate] = useState<DateWrapper>();
    const [isShowAllInstances, setIsShowAllInstances] = useState<boolean>(false);

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

        if (eventDate) {
            setDate(new DateWrapper(eventDate));
        }
        else {
            setDate(event?.occurrences[0]);
        }
    }, [])

    const occurrencesDisplayDiv = event?.occurrences.map((occurrence: DateWrapper, index: number) => {
        return (
            <div key={index} className={`${styles.eventBar}`}>
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
                    <div className={`${styles.duration}`}>
                        {convertTo12HourFormat(event.duration.startHour)} - {convertTo12HourFormat(event.duration.endHour)}
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
                    <div className={`${styles.dateDiv}`}>
                        {date && <>
                            <div className={`${styles.weekDayDiv}`}>{date.getShorterWeekDayName()}</div>
                            <div>{date.getDisplayFormat()}</div>
                        </>
                        }
                        <div className={`${styles.duration}`}>{event && event.duration &&
                            <>
                                {convertTo12HourFormat(event.duration.startHour)} - {convertTo12HourFormat(event.duration.endHour)}
                            </>
                        }
                        </div>
                        <button className={`${styles.seeAllInstancesButton}`}
                            onClick={() => setIsShowAllInstances(!isShowAllInstances)}>
                            <ScrollText />
                            {!isShowAllInstances ? "Show all instances" : "Hide instances"}
                        </button>
                    </div>
                </div>
            </div>
            <div>
                {isShowAllInstances &&
                    <>{occurrencesDisplayDiv}</>
                }
            </div>
        </div>
    )
}

export default EventDetail