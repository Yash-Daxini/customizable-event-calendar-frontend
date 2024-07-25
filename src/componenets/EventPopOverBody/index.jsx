import React from 'react'
import styles from './style.module.css';
import { Captions, CalendarX, Pencil, Clock3 } from 'lucide-react';
import { useAuth } from '../../hooks/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { convertTo12HourFormat } from '../../util/timeUtil';
import { fetchApi } from '../../util/fetchApi'
import { showSuccessToaster, showErrorToaster } from '../../util/toaster'
import { getShorterDayName } from '../../util/dateUtil';

const EventPopOverBody = ({ key, event, eventDate, onDelete }) => {

    const navigate = useNavigate();

    const auth = useAuth()

    const navigateToUpdatePage = () => {
        navigate("/addEvent", { state: { event: event, date: eventDate } });
    }

    const deleteEvent = () => {

        onDelete(event.id);

        fetchApi(`/api/users/${auth.user.id}/events/${event.id}`, auth.user.token, 'DELETE')
            .then(res => {
                if (res.status === 400) {
                    showErrorToaster("Some error occured !")
                }
                else if (res.status === 200) {
                    showSuccessToaster("Successfully Deleted Event !");
                }
                return res.json()
            })
            .catch(toast.success('Ooops! some error occurred !'));
    }


    return (
        <div key={key} className={styles.eventPopOverDiv}>
            <div className={styles.titleDiv}><Captions />{event.title}</div>
            <div className={styles.timeDisplayDiv}>
                <Clock3 />
                <span>{getShorterDayName(eventDate)} {eventDate.toLocaleDateString()} {convertTo12HourFormat(event.duration.startHour)} - {convertTo12HourFormat(event.duration.endHour)}</span>
            </div>
            <div className={styles.buttonDiv}>
                <button className={`${styles.actionBtn}`} onClick={navigateToUpdatePage}>
                    <span className={`${styles.icon} ${styles.editIcon}`}><Pencil size={15} /></span>
                    Edit
                </button>
                <button className={`${styles.actionBtn}`}
                    onClick={deleteEvent}>
                    <span className={`${styles.icon} ${styles.deleteIcon}`}><CalendarX size={20} strokeWidth={1} />
                    </span>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default EventPopOverBody