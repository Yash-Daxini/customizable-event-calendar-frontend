import React from 'react'
import styles from './style.module.css';
import { Captions, CalendarX, Pencil, Clock3 } from 'lucide-react';
import { useAuth } from '../../hooks/AuthProvider';
import { toast } from 'react-toastify';
const env = import.meta.env;

const EventPopOverBody = ({ key, event, eventDate, onDelete }) => {

    const auth = useAuth()

    const deleteEvent = () => {

        onDelete(event.id);

        fetch(`${env.VITE_Domain}/api/users/${auth.user.id}/events/${event.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${auth.user.token}`,
            }
        })
            .then(res => {
                if (res.status === 400) {
                    toast.error(`Some error occurred !`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                else if (res.status === 200) {
                    toast.success('Successfully Deleted Event !', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }
                return res.json()
            })
            .then(res => {
                toast.success('Delete successfully !')
            })
            .catch(toast.success('Ooops! some error occurred !'));

    }


    return (
        <div key={key} className={styles.eventPopOverDiv}>
            <div className={styles.titleDiv}><Captions />{event.title}</div>
            <div className={styles.timeDisplayDiv}>
                <Clock3 />
                <span>{eventDate.toString().split(" ")[0]} {eventDate.toLocaleDateString()} {event.duration.startHour} - {event.duration.endHour}</span>
            </div>
            <div className={styles.buttonDiv}>
                <button className={`${styles.actionBtn}`}>
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