import React from 'react'
import styles from './style.module.css';
import { Captions, CalendarX, Pencil, Clock3, X, Check, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { convertTo12HourFormat } from '../../util/TimeUtil';
import { showSuccessToaster, showErrorToaster } from '../../util/Toaster'
import { formatDateDayJS, getDisplayFormatDate, getShorterWeekDayName } from '../../util/DateUtil';
import { ADD_EVENT_URL } from '../../constants/RouteConstants';
import { EventResponse } from '../../models/EventResponse';
import { DeleteEvent } from '../../services/EventService';
import { EventCollaboratorRole } from '../../enums/EventCollaboratorRole';
import { useAuth } from '../../hooks/AuthProvider';
import { DateType } from '../../common/types';

interface EventPopOverBodyProps {
  event: EventResponse,
  eventDate: DateType,
  onDelete: (id: number) => void
}


const EventPopOverBody: React.FC<EventPopOverBodyProps> = ({ event, eventDate, onDelete }: EventPopOverBodyProps) => {

  const auth = useAuth();

  const navigate = useNavigate();

  const navigateToUpdatePage = (): void => {
    navigate(ADD_EVENT_URL, { state: { event: event, date: formatDateDayJS(eventDate) } });
  }

  const deleteEvent = (): void => {
    onDelete(event.id);
    DeleteEvent(event.id)
      .then(() => showSuccessToaster("Successfully Deleted Event !"))
      .catch(() => showErrorToaster("Failed to delete event !"));
  }

  const hasActionsAccessible = (): boolean => {
    return auth?.user?.id === getEventOrganizerId();
  }

  const getEventOrganizerId = (): number | undefined => {
    return event.eventCollaborators.find(_ => _.eventCollaboratorRole === EventCollaboratorRole.Organizer)?.user.id;
  }

  const acceptEventIvitation = (): void => {
    console.warn("Invitation Accepted");
  }

  const rejectEventIvitation = (): void => {
    console.warn("Invitation Rejected");
  }

  const navigateToEventDetails = (): void => {
    console.warn("Navigate to event details");
  }

  return (
    <div key={event.id} className={styles.eventPopOverDiv}>
      <div className={styles.headerDiv}>
        <div className={styles.titleDiv}>
          <Captions />
          {event.title}
        </div>
        <div className={styles.expandBtnDiv}>
          <button className={`${styles.expandBtn}`} onClick={navigateToEventDetails}>
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
      <div className={styles.timeDisplayDiv}>
        <Clock3 />
        <span>{getShorterWeekDayName(eventDate)} {getDisplayFormatDate(eventDate)} {convertTo12HourFormat(event.duration.startHour)} - {convertTo12HourFormat(event.duration.endHour)}</span>
      </div>
      {
        hasActionsAccessible()
          ? <div className={styles.buttonDiv}>
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
          : <div className={styles.buttonDiv}>
            <button className={`${styles.actionBtn}`} onClick={acceptEventIvitation}>
              <span className={`${styles.icon} ${styles.acceptIcon}`}><Check size={15} /></span>
              Accept
            </button>
            <button className={`${styles.actionBtn}`}
              onClick={rejectEventIvitation}>
              <span className={`${styles.icon} ${styles.rejectIcon}`}><X size={20} strokeWidth={1} />
              </span>
              Reject
            </button>
          </div>
      }
    </div>
  )
}

export default EventPopOverBody
