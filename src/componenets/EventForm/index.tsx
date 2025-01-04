import { useState } from "react";
import styles from "./style.module.css";
import DateTimeInput from "../DateTimeInput";
import FrequencyDropdown from "../FrequencyDropdown";
import { useAuth } from "../../hooks/AuthProvider";
import { Captions, MapPin, NotebookTabs, Clock3 } from "lucide-react";
import TimelineView from "../TimelineView";
import RecurrencePatternInput from "../RecurrencePatternInput";
import { useLocation, useNavigate } from "react-router-dom";
import { showErrorToaster, showSuccessToaster } from "../../util/Toaster";
import { GET_EVENTS_URL } from "../../constants/RouteConstants";
import { AddEvent, AddRecurringEvent, UpdateEvent, UpdateRecurringEvent } from "../../services/EventService";
import IconedInput from "../IconedInput";
import IconedTextarea from "../IconedTextarea";
import { EventCollaboratorRole } from "../../enums/EventCollaboratorRole";
import { ConfirmationStatus } from "../../enums/ConfirmationStatus";
import { Frequency } from "../../enums/Frequency";
import InviteeDropdown from "../InviteeDropdown";
import { RecurringEventRequest } from "../../models/RecurringEventRequest";
import { NonRecurringEventRequest } from "../../models/NonRecurringEventRequest";
import { CreateEvent } from "../../util/Mapping";
import { DropdownInput } from "../../common/types";

const EventForm: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  let { event } = location.state || {};
  let { date } = location.state || {};

  const isUpdate = event !== undefined;

  date = date ? new Date(date) : new Date();

  let auth = useAuth();

  const [selectedDate, setSelectedDate] = useState<Date>(date);
  const [eventObj, setEventObj] = useState<any>(
    isUpdate
      ? CreateEvent({ ...event, eventDate: date.toISOString().split("T")[0] })
      : {
        title: "",
        location: "",
        description: "",
        duration: {
          startHour: 0,
          endHour: 0,
        },
        recurrencePattern: {
          frequency: Frequency.None,
          startDate: selectedDate.toISOString().split("T")[0],
        },
        eventDate: selectedDate.toISOString().split("T")[0],
        eventCollaborators: [
          {
            userId: auth!.user.id,
            eventCollaboratorRole: EventCollaboratorRole.Organizer,
            confirmationStatus: ConfirmationStatus.Accept,
          },
        ],
      },
  );

  const isRecurringEvent = () =>
    eventObj.recurrencePattern.frequency !== Frequency.None;

  const handleClick = () => {
    if (isRecurringEvent()) delete eventObj.eventDate;

    if (isUpdate)
      updateEvent(eventObj, isRecurringEvent());
    else
      insertEvent(eventObj, isRecurringEvent());
  };

  const insertEvent = (event: RecurringEventRequest | NonRecurringEventRequest, isRecurringEvent: boolean) => {
    if (isRecurringEvent) {
      AddRecurringEvent(event as RecurringEventRequest)
        .then(() => {
          navigate(GET_EVENTS_URL)
          showSuccessToaster("Event added successfully !");
        })
        .catch(() => showErrorToaster("Some error occurred !"));
    }
    else {
      AddEvent(event as NonRecurringEventRequest)
        .then(() => {
          navigate(GET_EVENTS_URL)
          showSuccessToaster("Event added successfully !");
        })
        .catch(() => showErrorToaster("Some error occurred !"));
    }
  }

  const updateEvent = (event: RecurringEventRequest | NonRecurringEventRequest, isRecurringEvent: boolean) => {
    if (isRecurringEvent) {
      UpdateRecurringEvent(event as RecurringEventRequest, event.id)
        .then(() => {
          navigate(GET_EVENTS_URL)
          showSuccessToaster("Event updated successfully !");
        })
        .catch(() => showErrorToaster("Some error occurred !"));
    }
    else {
      UpdateEvent(event as NonRecurringEventRequest, event.id)
        .then(() => {
          navigate(GET_EVENTS_URL)
          showSuccessToaster("Event updated successfully !");
        })
        .catch(() => showErrorToaster("Some error occurred !"));
    }
  }

  const modifyEventCollaborators = (dropdownInputList: DropdownInput[]) => {
    let eventCollaborators = [...eventObj.eventCollaborators.filter((eventCollaborator: any) => eventCollaborator.eventCollaboratorRole === EventCollaboratorRole.Organizer), ...dropdownInputList.map((user: DropdownInput) => {
      return {
        userId: user.value,
        eventCollaboratorRole: EventCollaboratorRole.Participant,
        confirmationStatus: ConfirmationStatus.Pending,
      };
    })];

    setEventObj({
      ...eventObj,
      eventCollaborators: eventCollaborators,
    });
  }

  return (
    <div className={`${styles.eventAddDiv}`}>
      <div className={`${styles.addDiv}`}>
        <IconedInput
          icon={<Captions />}
          placeholder={"Add a title"}
          inputValue={`${eventObj.title}`}
          onChange={(e) =>
            setEventObj({ ...eventObj, title: e.target.value })}
        />
        <IconedInput
          icon={<MapPin />}
          placeholder={"Add a location"}
          inputValue={`${eventObj.location}`}
          onChange={(e) =>
            setEventObj({ ...eventObj, location: e.target.value })}
        />
        <IconedTextarea
          icon={<NotebookTabs />}
          placeholder={"Add a description"}
          inputValue={eventObj.description}
          textAreaRows={4}
          onChange={(e) =>
            setEventObj({ ...eventObj, description: e.target.value })}
        />

        <InviteeDropdown
          eventCollaborators={eventObj.eventCollaborators}
          onChange={modifyEventCollaborators}
        />

        <div className={`${styles.inputDiv}`}>
          <Clock3 />
          <div className={`${styles.dateTimeInputDiv}`}>
            <div>
              {!isRecurringEvent() ? (
                <DateTimeInput
                  onDateChange={(e: any) => {
                    setEventObj({ ...eventObj, eventDate: e.target.value });
                    setSelectedDate(new Date(e.target.value));
                  }}
                  onHourChange={(e: any) =>
                    setEventObj({
                      ...eventObj,
                      duration: { ...eventObj.duration, startHour: e },
                    })
                  }
                  isDateDisable={false}
                  initialDateValue={
                    !eventObj.eventDate
                      ? selectedDate
                      : new Date(eventObj.eventDate)
                  }
                  initialHourValue={eventObj.duration.startHour}
                />
              ) : (
                <DateTimeInput
                  onDateChange={(e: any) => {
                    setEventObj({
                      ...eventObj,
                      recurrencePattern: {
                        ...eventObj.recurrencePattern,
                        startDate: e.target.value,
                      },
                    });
                    setSelectedDate(new Date(e.target.value));
                  }}
                  onHourChange={(e: any) =>
                    setEventObj({
                      ...eventObj,
                      duration: { ...eventObj.duration, startHour: e },
                    })
                  }
                  isDateDisable={false}
                  initialDateValue={
                    !eventObj.recurrencePattern.startDate
                      ? selectedDate
                      : new Date(eventObj.recurrencePattern.startDate)
                  }
                  initialHourValue={eventObj.duration.startHour}
                />
              )}
            </div>
            <div className={`${styles.dateTimeFrequencyDiv}`}>
              <DateTimeInput
                onDateChange={(e: any) => {
                  setEventObj({
                    ...eventObj,
                    recurrencePattern: {
                      ...eventObj.recurrencePattern,
                      endDate: e.target.value,
                    },
                  });
                }}
                onHourChange={(e: any) =>
                  setEventObj({
                    ...eventObj,
                    duration: { ...eventObj.duration, endHour: e },
                  })
                }
                isDateDisable={eventObj.recurrencePattern.frequency === Frequency.None}
                initialDateValue={
                  !eventObj.recurrencePattern.endDate
                    ? selectedDate
                    : new Date(eventObj.recurrencePattern.endDate)
                }
                initialHourValue={eventObj.duration.endHour}
              />
              <FrequencyDropdown
                initialValue={eventObj.recurrencePattern.frequency}
                onChange={(e: any) =>
                  setEventObj({
                    ...eventObj,
                    recurrencePattern: {
                      ...eventObj.recurrencePattern,
                      frequency: e,
                    },
                  })
                }
              />
            </div>

            <RecurrencePatternInput
              eventObj={eventObj}
              date={selectedDate}
              updateEvent={setEventObj}
            />
          </div>
        </div>

        <div className={`${styles.addBtnDiv}`}>
          <button
            className={`${styles.addEventBtn}`}
            onClick={() => handleClick()}
          >
            {isUpdate ? "Update" : "Add"}
          </button>
        </div>
      </div>
      <TimelineView date={selectedDate} currentDuration={eventObj.duration} />
    </div>
  );
};

export default EventForm;
