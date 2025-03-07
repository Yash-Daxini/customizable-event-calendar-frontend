import React, { useContext } from 'react'
import styles from './style.module.css';
import { Captions, CalendarX, Pencil, Clock3, X, Check, Maximize2, CircleHelp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { convertTo12HourFormat } from '../../util/TimeUtil';
import { showSuccessToaster, showErrorToaster } from '../../util/Toaster'
import { ADD_EVENT_URL } from '../../constants/RouteConstants';
import { EventResponse, serializeEventResponse } from '../../models/EventResponse';
import { DeleteEvent, GetEventById } from '../../services/EventService';
import { EventCollaboratorRole } from '../../enums/EventCollaboratorRole';
import { useAuth } from '../../hooks/AuthProvider';
import DateWrapper from '../../util/DateUtil';
import { GiveEventCollaboratorResponse } from '../../services/EventCollaboratorService';
import { ConfirmationStatus } from '../../enums/ConfirmationStatus';
import { Duration } from '../../models/Duration';
import { EventCollaboratorResponse } from '../../models/EventCollaboratorResponse';
import ProposedDurationModal from '../ProposedDurationModal';
import { useModal } from '../../hooks/ModalProvider';
import { CalendarContext, CalendarContextType } from '../../hooks/context';

interface EventPopOverBodyProps {
  event: EventResponse,
  eventDate: string
}

const EventPopOverBody: React.FC<EventPopOverBodyProps> = ({ event, eventDate }: EventPopOverBodyProps) => {

  const auth = useAuth();

  const modal = useModal();

  const calendarContext: CalendarContextType | null = useContext(CalendarContext);

  if (!calendarContext)
    return;

  const events: EventResponse[] = calendarContext.events;
  const setEvents: React.Dispatch<React.SetStateAction<EventResponse[]>> = calendarContext.setEvents;

  const updateEventAfterInvitationResponse = () => {
    GetEventById(event.id)
      .then((res) => setEvents(events.map((_) => _.id === event.id ? res : _)));
  }

  const navigate = useNavigate();
  const date = new DateWrapper(eventDate);

  const navigateToUpdatePage = (): void => {
    const state: any = { event: serializeEventResponse(event), date: eventDate }
    navigate(ADD_EVENT_URL, { state: state });
  }

  const deleteEvent = (): void => {
    DeleteEvent(event.id)
      .then(() => {
        setEvents(events.filter((_: EventResponse) => _.id !== event.id));
        showSuccessToaster("Successfully Deleted Event !")
      })
      .catch(() => showErrorToaster("Failed to delete event !"));
  }

  const hasActionsAccessible = (): boolean => {
    return auth?.user?.id === getEventOrganizerId();
  }

  const getEventOrganizerId = (): number | undefined => {
    return event.eventCollaborators.find(_ => _.eventCollaboratorRole === EventCollaboratorRole.Organizer)?.user.id;
  }

  const getEventCollaboratorId = (): number | undefined => {
    return event.eventCollaborators.find(_ => _.user.id === auth?.user.id)?.id;
  }

  const getEventCollaborator = (): EventCollaboratorResponse | undefined =>
    event.eventCollaborators.find(_ => _.user.id === auth?.user.id);

  const isPendingResponse = (): boolean =>
    getEventCollaborator()?.confirmationStatus === ConfirmationStatus.Pending;


  const sentResponse = (confirmationStatus: ConfirmationStatus, proposedDuration: Duration | null = null): void => {
    const eventCollaboratorId: number | undefined = getEventCollaboratorId();

    if (!eventCollaboratorId)
      return;

    GiveEventCollaboratorResponse({
      id: eventCollaboratorId,
      eventId: event.id,
      confirmationStatus: confirmationStatus,
      proposedDuration: proposedDuration
    })
      .then(res => {
        if (res === 200) {
          showSuccessToaster("Successfully sent response.");
          updateEventAfterInvitationResponse();
        }
      })
      .catch(() => showErrorToaster("Some error occurred !"));
  }

  const acceptEventIvitation = (): void => {
    sentResponse(ConfirmationStatus.Accept);
  }

  const rejectEventIvitation = (): void => {
    sentResponse(ConfirmationStatus.Reject)
  }

  const sentMayBeResponse = (proposedDuration: Duration | null): void => {
    if (proposedDuration)
      sentResponse(ConfirmationStatus.Proposed, proposedDuration);
    else
      sentResponse(ConfirmationStatus.Maybe);
  }

  const navigateToEventDetails = (): void => {
    const state: any = { event: serializeEventResponse(event), date: eventDate }
    navigate(`/eventDetail/${event.id}`, { state: state });
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
        <span>{date.getShorterWeekDayName()} {date.getDisplayFormat()} {convertTo12HourFormat(event.duration.startHour)} - {convertTo12HourFormat(event.duration.endHour)}</span>
      </div>
      <div className={styles.buttonDiv}>
        {
          hasActionsAccessible()
            ?
            <>
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
            </>
            : isPendingResponse() &&
            <>
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
              <button className={`${styles.actionBtn}`} onClick={() => {
                modal?.showModal("Propose time",
                  <ProposedDurationModal
                    sentMayBeResponse={sentMayBeResponse}
                  />)
              }}>
                <span className={`${styles.icon} ${styles.tentativeIcon}`}>
                  <CircleHelp size={20} strokeWidth={1} />
                </span>
                Tentative
              </button>
            </>
        }
      </div>
    </div>
  )
}

export default EventPopOverBody
