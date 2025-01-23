import React, { useEffect, useState } from 'react'
import { EventResponse } from '../../models/EventResponse'
import { useLocation, useParams } from 'react-router-dom';
import { GetEventById } from '../../services/EventService';
import styles from './style.module.css'
import { Captions } from 'lucide-react';

const EventDetail: React.FC = () => {
    const params = useParams();
    const location = useLocation();
    let eventId = params.id;

    const [event, setEvent] = useState<EventResponse>(location?.state?.event);

    useEffect(() => {
        if (!event && eventId) {
            GetEventById(parseInt(eventId)).then((response) => {
                setEvent(response);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [])

    return (
        <div className={styles.eventDetailDiv}>
            <div className={styles.iconedEventDetailDiv}>
                <Captions />
                <div className={styles.title}>{event?.title}</div>
            </div>
        </div>
    )
}

export default EventDetail