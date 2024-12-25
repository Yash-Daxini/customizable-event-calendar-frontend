import React from 'react'
import styles from './style.module.css';
import { Captions, CalendarX, Pencil, Clock3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { convertTo12HourFormat } from '../../util/TimeUtil';
import { showSuccessToaster, showErrorToaster } from '../../util/toaster'
import { getShorterDayName } from '../../util/DateUtil';
import { ADD_EVENT_URL } from '../../constants/RouteConstants';
import { EventResponse } from '../../models/EventResponse';
import { DeleteEvent } from '../../services/EventService';

interface EventPopOverBodyProps {
  key: any,
  event: EventResponse,
  eventDate: Date,
  onDelete: (id: number) => void
}

const EventPopOverBody: React.FC<EventPopOverBodyProps> = ({ key, event, eventDate, onDelete }: EventPopOverBodyProps) => {

  const navigate = useNavigate();

  const navigateToUpdatePage = (): void => {
    navigate(ADD_EVENT_URL, { state: { event: event, date: eventDate } });
  }

  const deleteEvent = () => {
    onDelete(event.id);
    DeleteEvent(event.id)
      .then(() => showSuccessToaster("Successfully Deleted Event !"))
      .catch(() => showErrorToaster("Failed to delete event !"));
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
