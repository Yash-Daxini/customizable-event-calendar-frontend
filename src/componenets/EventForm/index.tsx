import { useEffect, useState } from "react";
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
import { getEventModel, getNonRecurringEventModel, getRecurringEventModel } from "../../util/Mapping";
import { DateType, DropdownInput } from "../../common/types";
import { EventRequestModel } from "../../models/EventRequestModel";
import { getTodayDate } from "../../util/DateUtil";

const EventForm: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  let eventToUpdate = location?.state?.event || null;
  let date = location?.state?.date || null;

  const isUpdate = eventToUpdate !== null;

  let auth = useAuth();

  const [selectedDate, setSelectedDate] = useState<DateType>(getTodayDate());

  const [event, setEvent] = useState<EventRequestModel>({
    title: "",
    location: "",
    description: "",
    duration: {
      startHour: 0,
      endHour: 1,
    },
    recurrencePattern: {
      frequency: Frequency.None,
      startDate: getTodayDate(),
      endDate: getTodayDate(),
    },
    eventCollaborators: [{
      userId: auth!.user.id,
      eventCollaboratorRole: EventCollaboratorRole.Organizer,
      confirmationStatus: ConfirmationStatus.Accept,
    }]
  } as EventRequestModel);

  useEffect(() => {
    if (date)
      setSelectedDate(date);

    if (isUpdate) {
      setEvent(getEventModel(eventToUpdate));
    }
    else {
      setEvent({
        ...event, recurrencePattern: {
          ...event.recurrencePattern,
          frequency: Frequency.None,
        }
      });
    }
  }, []);

  const isRecurringEvent = () =>
    event?.recurrencePattern?.frequency !== Frequency.None;

  const handleClick = () => {
    if (isUpdate)
      updateEvent();
    else
      insertEvent();
  };

  const insertEvent = () => {
    if (isRecurringEvent()) {
      const recurringEvent = getRecurringEventModel(event);
      AddRecurringEvent(recurringEvent)
        .then(() => {
          navigate(GET_EVENTS_URL)
          showSuccessToaster("Event added successfully !");
        })
        .catch(() => showErrorToaster("Some error occurred !"));
    }
    else {
      const nonRecurringEvent = getNonRecurringEventModel(event);
      AddEvent(nonRecurringEvent)
        .then(() => {
          navigate(GET_EVENTS_URL)
          showSuccessToaster("Event added successfully !");
        })
        .catch(() => showErrorToaster("Some error occurred !"));
    }
  }

  const updateEvent = () => {
    if (isRecurringEvent()) {
      const recurringEvent = getRecurringEventModel(event);
      UpdateRecurringEvent(recurringEvent, event.id)
        .then(() => {
          navigate(GET_EVENTS_URL)
          showSuccessToaster("Event updated successfully !");
        })
        .catch(() => showErrorToaster("Some error occurred !"));
    }
    else {
      const nonRecurringEvent = getNonRecurringEventModel(event);
      UpdateEvent(nonRecurringEvent, event.id)
        .then(() => {
          navigate(GET_EVENTS_URL)
          showSuccessToaster("Event updated successfully !");
        })
        .catch(() => showErrorToaster("Some error occurred !"));
    }
  }

  const modifyEventCollaborators = (dropdownInputList: DropdownInput[]) => {
    let eventCollaborators = [...event.eventCollaborators.filter((eventCollaborator: any) => eventCollaborator.eventCollaboratorRole === EventCollaboratorRole.Organizer), ...dropdownInputList.map((user: DropdownInput) => {
      return {
        userId: user.value,
        eventCollaboratorRole: EventCollaboratorRole.Participant,
        confirmationStatus: ConfirmationStatus.Pending,
      };
    })];

    setEvent({
      ...event,
      eventCollaborators: eventCollaborators,
    });
  }

  return (
    <div className={`${styles.eventAddDiv}`}>
      <div className={`${styles.addDiv}`}>
        <IconedInput
          icon={<Captions />}
          placeholder={"Add a title"}
          inputValue={`${event.title}`}
          onChange={(e) =>
            setEvent({ ...event, title: e.target.value })}
        />
        <IconedInput
          icon={<MapPin />}
          placeholder={"Add a location"}
          inputValue={`${event.location}`}
          onChange={(e) =>
            setEvent({ ...event, location: e.target.value })}
        />
        <IconedTextarea
          icon={<NotebookTabs />}
          placeholder={"Add a description"}
          inputValue={event.description}
          textAreaRows={4}
          onChange={(e) =>
            setEvent({ ...event, description: e.target.value })}
        />

        <InviteeDropdown
          eventCollaborators={event.eventCollaborators}
          onChange={modifyEventCollaborators}
        />

        <div className={`${styles.inputDiv}`}>
          <Clock3 />
          <div className={`${styles.dateTimeInputDiv}`}>
            <div>
              <DateTimeInput
                onDateChange={(e: any) => {
                  setEvent({
                    ...event,
                    recurrencePattern: {
                      ...event.recurrencePattern,
                      startDate: e.target.value,
                    },
                  });
                  setSelectedDate(e.target.value);
                }}
                onHourChange={(e: any) =>
                  setEvent({
                    ...event,
                    duration: { ...event.duration, startHour: e },
                  })
                }
                isDateDisable={false}
                initialDateValue={event.recurrencePattern.startDate}
                initialHourValue={event.duration.startHour}
              />
            </div>
            <div className={`${styles.dateTimeFrequencyDiv}`}>
              <DateTimeInput
                onDateChange={(e: any) => {
                  setEvent({
                    ...event,
                    recurrencePattern: {
                      ...event.recurrencePattern,
                      endDate: e.target.value,
                    },
                  });
                }}
                onHourChange={(e: any) =>
                  setEvent({
                    ...event,
                    duration: { ...event.duration, endHour: e },
                  })
                }
                isDateDisable={event.recurrencePattern.frequency === Frequency.None}
                initialDateValue={event.recurrencePattern.endDate}
                initialHourValue={event.duration.endHour}
              />
              <FrequencyDropdown
                initialValue={event.recurrencePattern.frequency}
                onChange={(e: any) =>
                  setEvent({
                    ...event,
                    recurrencePattern: {
                      ...event.recurrencePattern,
                      frequency: e,
                    },
                  })
                }
              />
            </div>

            <RecurrencePatternInput
              event={event}
              date={selectedDate}
              updateEvent={setEvent}
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
      <TimelineView date={selectedDate} currentDuration={event.duration} />
    </div>
  );
};

export default EventForm;
